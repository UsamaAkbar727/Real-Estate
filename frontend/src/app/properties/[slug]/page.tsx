import { notFound } from "next/navigation";
import Link from "next/link";
import { properties, agents, type Property } from "@/lib/real-estate-data";
import SiteShell from "@/components/real-estate/site-shell";
import PropertyDetailClient from "./property-detail-client";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // params is async in Next 16
  return params.then((resolved) => {
    const property = properties.find((p) => p.slug === resolved.slug);
    if (!property) return { title: "Property Not Found | Imperial Estates" };
    return {
      title: `${property.title} — ${property.location} | Imperial Estates`,
      description: property.description.slice(0, 160),
    };
  });
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();
  const agent = agents.find((a) => a.id === property.agentId) ?? agents[0];
  const related = properties.filter((p) => p.id !== property.id && p.category === property.category).slice(0, 3);

  return (
    <SiteShell>
      <PropertyDetailClient property={property} agent={agent} related={related} />
    </SiteShell>
  );
}
