// client
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface CTAButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function CTAButton({ 
  href, 
  variant = 'primary', 
  children, 
  className = '',
  onClick 
}: CTAButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 focus-neon group";
  
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    outline: "btn-outline"
  };

  const buttonContent = (
    <span className="relative z-10 flex items-center space-x-2">
      {children}
      <svg 
        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </span>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        aria-label={`${children} button`}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={`Navigate to ${children}`}
    >
      {buttonContent}
    </Link>
  );
}
