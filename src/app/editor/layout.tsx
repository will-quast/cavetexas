import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Editor | Cave Texas',
  description: 'Edit website content',
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 