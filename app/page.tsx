// server
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to /home for the main landing page
  redirect('/home');
}