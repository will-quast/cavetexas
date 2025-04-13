'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseClient } from '@/utils/supabase/client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/utils/supabase/SupabaseContext';

// Dynamically import the editor to avoid SSR issues
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

export default function EditorPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = useSupabase();
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [isEditor, setIsEditor] = useState<boolean>(false);

  // Check if user is an editor
  useEffect(() => {
    const checkEditorStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: member } = await supabase
        .from('members')
        .select('editor')
        .eq('user_id', user.id)
        .single();

      if (!member?.editor) {
        router.push('/members');
        return;
      }

      setIsEditor(true);
    };

    checkEditorStatus();
  }, [router, supabase]);

  // Fetch pages
  const { data: pages } = useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const { data } = await supabase
        .from('pages')
        .select('slug, title')
        .order('title');
      return data || [];
    },
  });

  // Fetch page content
  const { data: pageContent } = useQuery({
    queryKey: ['page', selectedPage],
    queryFn: async () => {
      if (!selectedPage) return null;
      const { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', selectedPage)
        .single();
      return data;
    },
    enabled: !!selectedPage,
  });

  // Update page content
  const updatePage = useMutation({
    mutationFn: async (content: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('pages')
        .update({
          content,
          updated_by: user.id,
        })
        .eq('slug', selectedPage);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page', selectedPage] });
    },
  });

  if (!isEditor) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Content Editor</h1>
      
      <div className="mb-8">
        <label htmlFor="page-select" className="block text-sm font-medium mb-2">
          Select Page
        </label>
        <select
          id="page-select"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a page...</option>
          {pages?.map((page) => (
            <option key={page.slug} value={page.slug}>
              {page.title}
            </option>
          ))}
        </select>
      </div>

      {selectedPage && pageContent && (
        <div className="border rounded p-4">
          <h2 className="text-2xl font-bold mb-4">{pageContent.title}</h2>
          <Editor
            content={pageContent.content}
            onSave={(content) => updatePage.mutate(content)}
          />
        </div>
      )}
    </main>
  );
} 