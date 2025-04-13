'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SupabaseProvider } from '@/utils/supabase/SupabaseContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        {children}
      </SupabaseProvider>
    </QueryClientProvider>
  );
} 