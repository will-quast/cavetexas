'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/utils/supabase/SupabaseContext';
import type { Member } from '@/types';

export default function MembersPage() {
  const router = useRouter();
  const supabase = useSupabase();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const { data } = await supabase
        .from('members')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setMember(data);
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Members Area</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {member?.editor && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Editor Tools</h2>
            <a
              href="/editor"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Content Editor
            </a>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Status</h3>
              <p className="text-gray-600">
                {member?.editor ? 'Editor' : 'Member'}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Member Since</h3>
              <p className="text-gray-600">
                {new Date(member?.created_at || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
