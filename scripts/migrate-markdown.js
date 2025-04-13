const fs = require('fs').promises;
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const matter = require('gray-matter');
const { marked } = require('marked');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function migrateMarkdown() {
  try {
    // Read all markdown files from the content directory
    const contentDir = path.join(process.cwd(), 'src/content/pages');
    const files = await fs.readdir(contentDir);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(contentDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Parse frontmatter and content
      const { data: frontmatter, content: markdown } = matter(content);
      
      // Convert markdown to HTML
      const html = marked(markdown);
      
      // Insert into database
      const { error } = await supabase
        .from('pages')
        .insert({
          slug: path.parse(file).name,
          title: frontmatter.title,
          content: html,
          created_by: '00000000-0000-0000-0000-000000000000', // System user
          updated_by: '00000000-0000-0000-0000-000000000000'  // System user
        });
      
      if (error) {
        console.error(`Error migrating ${file}:`, error);
      } else {
        console.log(`Successfully migrated ${file}`);
      }
    }
    
    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateMarkdown(); 