import { notFound } from "next/navigation";
import SiteShell from "@/components/real-estate/site-shell";
import AgentDetailClient from "./agent-detail-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  try {
    const res = await fetch(`http://localhost:5000/api/agents/${resolved.slug}`);
    if (!res.ok) return { title: "Advisor Not Found | Imperial Estates" };
    const data = await res.json();
    if (!data.success || !data.agent) return { title: "Advisor Not Found | Imperial Estates" };
    const agent = data.agent;
    return {
      title: `${agent.name} — ${agent.role} | Imperial Estates`,
      description: agent.bio.slice(0, 160),
    };
  } catch {
    return { title: "Advisor Profile | Imperial Estates" };
  }
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const res = await fetch(`http://localhost:5000/api/agents/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) notFound();
    const data = await res.json();
    if (!data.success || !data.agent) notFound();
    const agent = data.agent;

    // Fetch properties listed by this agent
    const propsRes = await fetch("http://localhost:5000/api/properties");
    let agentProperties = [];
    if (propsRes.ok) {
      const propsData = await propsRes.json();
      if (propsData.success) {
        agentProperties = propsData.properties.filter((p: any) => p.agentId === agent.id);
      }
    }

    return (
      <SiteShell>
        <AgentDetailClient agent={agent} agentProperties={agentProperties} />
      </SiteShell>
    );
  } catch (error) {
    console.error("Failed to fetch agent profile dynamically:", error);
    notFound();
  }
}
