import { notFound } from "next/navigation";
import { agents, properties } from "@/lib/real-estate-data";
import SiteShell from "@/components/real-estate/site-shell";
import AgentDetailClient from "./agent-detail-client";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((resolved) => {
    const agent = agents.find((a) => a.slug === resolved.slug);
    if (!agent) return { title: "Advisor Not Found | Imperial Estates" };
    return {
      title: `${agent.name} — ${agent.role} | Imperial Estates`,
      description: agent.bio.slice(0, 160),
    };
  });
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = agents.find((a) => a.slug === slug);
  if (!agent) notFound();
  const agentProperties = properties.filter((p) => p.agentId === agent.id);

  return (
    <SiteShell>
      <AgentDetailClient agent={agent} agentProperties={agentProperties} />
    </SiteShell>
  );
}
