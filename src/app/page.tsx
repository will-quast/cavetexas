'use client';

import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/utils/supabase/SupabaseContext';
import type { Page } from '@/types';

export default function HomePage() {
  const supabase = useSupabase();

  const { data: pages, isLoading } = useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const { data } = await supabase
        .from('pages')
        .select('*')
        .order('title');
      return data as Page[];
    },
  });

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Cave Texas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages?.map((page) => (
          <div
            key={page.id}
            className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-4">{page.title}</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
