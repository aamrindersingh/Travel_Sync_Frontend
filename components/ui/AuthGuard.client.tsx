"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext.client";

const PUBLIC_PATHS = new Set<string>([
  "/",
  "/home",
  "/health",
  "/auth/login",
  "/auth/google/login",
  "/auth/google/callback",
  "/auth/success",
]);

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (typeof window === "undefined") return;
    const isPublic = !!pathname && PUBLIC_PATHS.has(pathname);
    if (!isPublic && !isAuthenticated) {
      loginWithGoogle();
    }
  }, [pathname, isAuthenticated, isLoading, loginWithGoogle]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
      if (PUBLIC_PATHS.has(href)) return;
      if (!isAuthenticated) {
        e.preventDefault();
        loginWithGoogle();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isAuthenticated, loginWithGoogle]);

  return <>{children}</>;
}



