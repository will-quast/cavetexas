export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface Member {
  id: string;
  user_id: string;
  editor: boolean;
  created_at: string;
  updated_at: string;
} 