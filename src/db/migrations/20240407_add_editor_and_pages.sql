-- Add editor column to members table
ALTER TABLE members ADD COLUMN editor boolean DEFAULT false;

-- Create pages table
CREATE TABLE pages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    slug varchar NOT NULL UNIQUE,
    title varchar NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid REFERENCES auth.users(id) NOT NULL,
    updated_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Create indexes
CREATE INDEX pages_slug_idx ON pages(slug);
CREATE INDEX pages_created_by_idx ON pages(created_by);
CREATE INDEX pages_updated_by_idx ON pages(updated_by);

-- Set up RLS policies
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to pages
CREATE POLICY "Public pages are viewable by everyone" ON pages
    FOR SELECT USING (true);

-- Allow authenticated users to create pages
CREATE POLICY "Authenticated users can create pages" ON pages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow editors to update pages
CREATE POLICY "Editors can update pages" ON pages
    FOR UPDATE USING (
        auth.uid() = updated_by AND
        EXISTS (
            SELECT 1 FROM members
            WHERE user_id = auth.uid() AND editor = true
        )
    );

-- Allow editors to delete pages
CREATE POLICY "Editors can delete pages" ON pages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM members
            WHERE user_id = auth.uid() AND editor = true
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 