import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "src/content");

export async function getPageContent(contentType: string, slug: string) {
  const fullPath = path.join(contentDirectory, contentType, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Parse frontmatter
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(content);

  const contentHtml = processedContent.toString();

  return {
    frontmatter: data,
    content: contentHtml,
  };
}

export async function getAllContent(contentType: string) {
  const dir = path.join(contentDirectory, contentType);
  const files = fs.readdirSync(dir);

  const content = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(dir, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
    };
  });

  return content;
}
