import { notFound } from "next/navigation";
import Link from "next/link";
import { blogs } from "@/lib/real-estate-data";
import SiteShell from "@/components/real-estate/site-shell";
import BlogPostClient from "./blog-post-client";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((resolved) => {
    const post = blogs.find((b) => b.slug === resolved.slug);
    if (!post) return { title: "Article Not Found | Imperial Estates" };
    return {
      title: `${post.title} | Imperial Estates Blog`,
      description: post.excerpt,
    };
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();
  const related = blogs.filter((b) => b.slug !== post.slug).slice(0, 2);

  return (
    <SiteShell>
      <BlogPostClient post={post} related={related} />
    </SiteShell>
  );
}
