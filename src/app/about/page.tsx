import { getPageContent } from "@/lib/markdown";

export const metadata = {
  title: "About TSA | Texas Speleological Association",
  description:
    "Learn about the Texas Speleological Association, its mission, and history.",
};

export default async function AboutPage() {
  const { frontmatter, content } = await getPageContent("pages", "about");

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{frontmatter.title}</h1>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  );
}
