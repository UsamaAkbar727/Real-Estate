import { notFound } from "next/navigation";
import SiteShell from "@/components/real-estate/site-shell";
import PropertyDetailClient from "./property-detail-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/properties/${resolved.slug}`);
    if (!res.ok) return { title: "Property Not Found | Imperial Estates" };
    const data = await res.json();
    if (!data.success || !data.property) return { title: "Property Not Found | Imperial Estates" };
    const property = data.property;
    return {
      title: `${property.title} — ${property.location} | Imperial Estates`,
      description: property.description.slice(0, 160),
    };
  } catch {
    return { title: "Property Detail | Imperial Estates" };
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/properties/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) notFound();
    const data = await res.json();
    if (!data.success || !data.property) notFound();
    
    const property = data.property;
    const agent = property.agent || { id: 1, name: "Advisor", role: "Specialist", image: "/images/agent_1.png" };
    
    // Fetch similar properties for related
    const relatedRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/properties`);
    let related = [];
    if (relatedRes.ok) {
      const relatedData = await relatedRes.json();
      if (relatedData.success) {
        related = relatedData.properties
          .filter((p: any) => p.id !== property.id && p.category === property.category)
          .slice(0, 3);
      }
    }

    return (
      <SiteShell>
        <PropertyDetailClient property={property} agent={agent} related={related} />
      </SiteShell>
    );
  } catch (error) {
    console.error("Failed to fetch property details dynamically:", error);
    notFound();
  }
}
