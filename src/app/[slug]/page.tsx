import {
  getPageContent,
  getAllContent,
  ContentNotFoundError,
} from "@/lib/markdown";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const pages = await getAllContent("pages");
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;

  try {
    const { frontmatter } = await getPageContent("pages", resolvedParams.slug);
    return {
      title: `${frontmatter.title} | Texas Speleological Association`,
      description: frontmatter.description,
    };
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      return {
        title: "Page Not Found | Texas Speleological Association",
        description: "The requested page could not be found.",
      };
    }
    return {
      title: "Error | Texas Speleological Association",
      description: "An error occurred while loading this page.",
    };
  }
}

function LoadingContent() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </main>
  );
}

async function PageContent({ slug }: { slug: string }) {
  try {
    const { frontmatter, content } = await getPageContent("pages", slug);

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{frontmatter.title}</h1>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
    );
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      notFound();
    }
    throw error;
  }
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<LoadingContent />}>
      <PageContent slug={resolvedParams.slug} />
    </Suspense>
  );
}
