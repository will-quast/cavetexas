import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "src/content");

export class ContentNotFoundError extends Error {
  constructor(contentType: string, slug: string) {
    super(`Content not found: ${contentType}/${slug}`);
    this.name = "ContentNotFoundError";
  }
}

export async function getPageContent(contentType: string, slug: string) {
  try {
    const fullPath = path.join(contentDirectory, contentType, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      throw new ContentNotFoundError(contentType, slug);
    }

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
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      throw error;
    }
    // For other errors, wrap them in a more specific error
    throw new Error(
      `Failed to load content: ${contentType}/${slug}. ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getAllContent(contentType: string) {
  try {
    const dir = path.join(contentDirectory, contentType);

    // Check if directory exists
    if (!fs.existsSync(dir)) {
      return [];
    }

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
  } catch (error) {
    console.error(`Failed to load content list for ${contentType}:`, error);
    return [];
  }
}
