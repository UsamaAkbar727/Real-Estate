"use client";

import SafeLink from "@/components/ui/safe-link";


import { motion } from "framer-motion";
import { Phone, Mail, Award, Briefcase, Facebook, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { agents } from "@/lib/real-estate-data";

export default function Agents() {
  return (
    <section id="agents" className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[var(--gold)]/8 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--royal)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--royal)]">
                The Experts
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Meet Our <span className="text-gradient-royal">Elite Advisors</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--ink)]/65 text-lg"
          >
            Behind every successful transaction is a specialist who knows Lahore block-by-block. Our advisors bring decades of combined experience and billions in closed deals.
          </motion.p>
        </div>

        {/* Agents grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[1.75rem] overflow-hidden bg-white shadow-luxe hover:shadow-luxe-lg transition-all"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/10 to-transparent" />

                {/* Sales badge */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full glass text-[11px] font-bold text-[var(--ink)] flex items-center gap-1.5">
                  <Award className="h-3 w-3 text-[var(--gold)]" />
                  {agent.sales}
                </div>

                {/* Social - reveal on hover */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  {[Facebook, Linkedin, Instagram].map((SocialIcon, j) => (
                    <button
                      key={j}
                      className="h-9 w-9 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors"
                    >
                      <SocialIcon className="h-4 w-4" />
                    </button>
                  ))}
                  <SafeLink
                    href={`/agents/${agent.slug}`}
                    className="ml-auto h-9 w-9 rounded-full bg-[var(--gold)] flex items-center justify-center text-[var(--ink)] hover:scale-110 transition-transform"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </SafeLink>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-[var(--ink)] group-hover:text-[var(--royal)] transition-colors">
                  <SafeLink href={`/agents/${agent.slug}`}>{agent.name}</SafeLink>
                </h3>
                <div className="text-sm text-[var(--royal)] font-semibold">{agent.role}</div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-sm">
                  <div className="flex items-center gap-1.5 text-[var(--ink)]/70">
                    <Briefcase className="h-4 w-4 text-[var(--emerald-brand)]" />
                    <span className="font-bold text-[var(--ink)]">{agent.deals}</span> deals
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  <SafeLink href={`tel:${agent.phone}`} className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">
                    <Phone className="h-3.5 w-3.5" /> {agent.phone}
                  </SafeLink>
                  <SafeLink href={`mailto:${agent.email}`} className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">
                    <Mail className="h-3.5 w-3.5" /> {agent.email}
                  </SafeLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
