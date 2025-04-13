import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Cave Texas',
    default: 'Cave Texas',
  },
  description: 'Your source for cave exploration in Texas',
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 