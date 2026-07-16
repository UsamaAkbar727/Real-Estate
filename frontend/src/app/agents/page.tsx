"use client";

import SafeLink from "@/components/ui/safe-link";


import { motion } from "framer-motion";
import { Phone, Mail, Award, Briefcase, Facebook, Linkedin, Instagram, ArrowUpRight, Users } from "lucide-react";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import Reveal from "@/components/real-estate/reveal";
import { agents, stats } from "@/lib/real-estate-data";

export default function AgentsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Meet the Experts"
        title="Our Elite Team of"
        titleAccent="Real Estate Advisors"
        subtitle="Decades of combined experience, billions in closed deals, and an unwavering commitment to your success. Meet the people who make Imperial Estates Lahore's #1 luxury real estate firm."
        crumbs={[{ label: "Agents" }]}
        background="/images/agent_1.png"
      />

      {/* Stats band */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: "18+", label: "Years Combined Experience" },
              { value: "1,715+", label: "Deals Closed" },
              { value: "PKR 25.7B", label: "Total Sales Value" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-2xl bg-luxe-soft p-6 text-center">
                  <div className="font-display text-3xl font-bold text-gradient-royal">{s.value}</div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-1">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agents grid */}
      <section className="py-16 lg:py-20 bg-luxe-soft">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-[var(--royal)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--royal)]">The Specialists</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--ink)]">Dedicated Advisors, Exceptional Results</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {agents.map((agent, i) => (
              <Reveal key={agent.id} delay={(i % 2) * 0.1}>
                <SafeLink
                  href={`/agents/${agent.slug}`}
                  className="group relative rounded-[2rem] overflow-hidden bg-white shadow-luxe hover:shadow-luxe-lg lift block"
                >
                  <div className="grid sm:grid-cols-[200px_1fr]">
                    {/* Image */}
                    <div className="relative h-64 sm:h-full overflow-hidden">
                      <img src={agent.image} alt={agent.name} className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:bg-gradient-to-r" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass text-[10px] font-bold text-[var(--ink)] flex items-center gap-1">
                        <Award className="h-3 w-3 text-[var(--gold)]" /> {agent.experience}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-[var(--ink)] group-hover:text-[var(--royal)] transition-colors">{agent.name}</h3>
                      <div className="text-sm text-[var(--royal)] font-semibold">{agent.role}</div>
                      <p className="text-sm text-[var(--ink)]/60 mt-3 line-clamp-3 leading-relaxed">{agent.bio}</p>

                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-1.5 text-[var(--ink)]/70">
                          <Briefcase className="h-4 w-4 text-[var(--emerald-brand)]" />
                          <span className="font-bold text-[var(--ink)]">{agent.deals}</span> deals
                        </div>
                        <div className="text-[var(--gold-deep)] font-semibold">{agent.sales}</div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {agent.specialties.slice(0, 3).map((sp) => (
                          <span key={sp} className="px-2.5 py-1 rounded-md bg-[var(--royal)]/8 text-[var(--royal)] text-[11px] font-semibold">{sp}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                        <div className="flex gap-2">
                          {[Facebook, Linkedin, Instagram].map((Icon, j) => (
                            <span key={j} className="h-8 w-8 rounded-lg bg-luxe-soft flex items-center justify-center text-[var(--royal)]">
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-sm font-semibold text-[var(--royal)] group-hover:gap-2 transition-all">
                          View Profile <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </SafeLink>
              </Reveal>
            ))}
          </div>

          {/* Join the team CTA */}
          <Reveal delay={0.2}>
            <div className="mt-12 rounded-[2rem] bg-gradient-to-br from-[var(--royal)] to-[var(--royal-deep)] p-8 lg:p-12 text-white text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[var(--gold)]/20 blur-3xl" />
              <div className="relative">
                <h3 className="font-display text-3xl font-bold">Want to Join Our Team?</h3>
                <p className="text-white/75 mt-3 max-w-xl mx-auto">We're always looking for passionate, driven real estate professionals to join Lahore's leading luxury agency.</p>
                <SafeLink href="/contact" className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold mt-6">
                  Get in Touch <ArrowUpRight className="h-4 w-4" />
                </SafeLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
