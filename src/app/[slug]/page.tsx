'use client';

import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/utils/supabase/SupabaseContext';
import type { Page } from '@/types';

export default function Page({ params }: { params: { slug: string } }) {
  const supabase = useSupabase();

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', params.slug],
    queryFn: async () => {
      const { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', params.slug)
        .single();
      return data as Page;
    },
  });

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  if (!page) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600">
            The page you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  );
}
