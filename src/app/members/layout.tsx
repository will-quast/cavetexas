import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members Area | Cave Texas',
  description: 'Access your member benefits and tools',
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 