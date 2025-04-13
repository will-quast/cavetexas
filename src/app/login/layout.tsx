import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Cave Texas',
  description: 'Sign in to your Cave Texas account',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 