"use client";

import SafeLink from "@/components/ui/safe-link";


import { motion } from "framer-motion";
import {
  Phone, Mail, Award, Briefcase, Facebook, Linkedin, Instagram, ArrowRight,
  Star, MapPin, Languages, CheckCircle2, Send, ArrowLeft, Quote,
} from "lucide-react";
import type { Agent, Property } from "@/lib/real-estate-data";
import { COMPANY } from "@/lib/real-estate-data";
import { toast } from "sonner";
import PropertyCard from "@/components/real-estate/property-card";
import Reveal from "@/components/real-estate/reveal";

export default function AgentDetailClient({
  agent,
  agentProperties,
}: {
  agent: Agent;
  agentProperties: Property[];
}) {
  return (
    <>
      {/* Hero / breadcrumb */}
      <div className="bg-luxe-soft border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-2 text-sm">
          <SafeLink href="/" className="text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">Home</SafeLink>
          <span className="text-[var(--muted-foreground)]/50">/</span>
          <SafeLink href="/agents" className="text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">Advisors</SafeLink>
          <span className="text-[var(--muted-foreground)]/50">/</span>
          <span className="text-[var(--royal)] font-semibold">{agent.name}</span>
        </div>
      </div>

      {/* Profile header */}
      <section className="relative py-12 lg:py-16 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[340px_1fr] gap-10 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[var(--gold)]/20 blur-2xl rounded-[2rem]" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-luxe-lg">
                <img src={agent.image} alt={agent.name} className="w-full h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <SafeLink href={agent.social.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${agent.name} on Facebook`} className="h-10 w-10 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors">
                    <Facebook className="h-4 w-4" />
                  </SafeLink>
                  <SafeLink href={agent.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${agent.name} on LinkedIn`} className="h-10 w-10 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </SafeLink>
                  <SafeLink href={agent.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${agent.name} on Instagram`} className="h-10 w-10 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors">
                    <Instagram className="h-4 w-4" />
                  </SafeLink>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--gold)]/12 text-[var(--gold-deep)] text-xs font-bold uppercase tracking-wider mb-4">
                <Award className="h-3.5 w-3.5" /> {agent.experience} Experience
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] leading-tight">{agent.name}</h1>
              <div className="text-lg text-[var(--royal)] font-semibold mt-2">{agent.role}</div>

              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />)}
                <span className="text-sm text-[var(--muted-foreground)] ml-1">5.0 · 320+ reviews</span>
              </div>

              <p className="text-[var(--ink)]/70 leading-relaxed mt-5 max-w-2xl">{agent.bio}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="rounded-2xl bg-luxe-soft p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient-royal">{agent.deals}</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Deals Closed</div>
                </div>
                <div className="rounded-2xl bg-luxe-soft p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient-gold">{agent.sales.split(" ")[1]}</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Total Sales</div>
                </div>
                <div className="rounded-2xl bg-luxe-soft p-4 text-center">
                  <div className="font-display text-2xl font-bold text-[var(--emerald-brand)]">98%</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Satisfaction</div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">Specialties</div>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((sp) => (
                    <span key={sp} className="px-3 py-1.5 rounded-full bg-[var(--royal)]/8 text-[var(--royal)] text-sm font-semibold">{sp}</span>
                  ))}
                </div>
              </div>

              {/* Contact buttons */}
              <div className="flex flex-wrap gap-3 mt-7">
                <SafeLink href={`tel:${agent.phone.replace(/\s/g, "")}`} className="btn-royal px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {agent.phone}
                </SafeLink>
                <SafeLink href={`mailto:${agent.email}`} className="px-5 py-3 rounded-xl border-2 border-[var(--royal)]/20 text-[var(--royal)] font-semibold text-sm flex items-center gap-2 hover:bg-[var(--royal)]/8 transition-colors">
                  <Mail className="h-4 w-4" /> Email
                </SafeLink>
                <SafeLink href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                  WhatsApp
                </SafeLink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details + contact form */}
      <section className="py-12 lg:py-16 bg-luxe-soft">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            {/* Left: details */}
            <div className="space-y-6">
              <Reveal>
                <div className="rounded-3xl bg-white shadow-luxe p-7 lg:p-9">
                  <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-5">About {agent.name.split(" ")[0]}</h2>
                  <p className="text-[var(--ink)]/70 leading-relaxed">{agent.bio}</p>
                  <p className="text-[var(--ink)]/70 leading-relaxed mt-4">
                    {agent.name.split(" ")[0]} has built a reputation for integrity, market intelligence, and an unwavering commitment to client success. Whether you're buying your first home, selling a long-held investment, or building a multi-property portfolio, you'll receive the same white-glove service that has made Imperial Estates Lahore's most trusted name in luxury real estate.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-white shadow-luxe p-7 lg:p-9">
                  <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-5">Expertise & Specialties</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {agent.specialties.map((sp) => (
                      <div key={sp} className="flex items-center gap-3 p-3 rounded-xl bg-luxe-soft">
                        <CheckCircle2 className="h-5 w-5 text-[var(--emerald-brand)] shrink-0" />
                        <span className="text-sm font-medium text-[var(--ink)]">{sp}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-luxe-soft">
                      <Languages className="h-5 w-5 text-[var(--royal)] shrink-0" />
                      <span className="text-sm font-medium text-[var(--ink)]">Speaks: {agent.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-luxe-soft">
                      <Briefcase className="h-5 w-5 text-[var(--gold-deep)] shrink-0" />
                      <span className="text-sm font-medium text-[var(--ink)]">{agent.experience} in real estate</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Agent's listings */}
              {agentProperties.length > 0 && (
                <Reveal delay={0.15}>
                  <div className="rounded-3xl bg-white shadow-luxe p-7 lg:p-9">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-display text-2xl font-bold text-[var(--ink)]">Active Listings</h2>
                      <SafeLink href="/properties" className="text-sm font-semibold text-[var(--royal)] flex items-center gap-1 hover:gap-2 transition-all">
                        View All <ArrowRight className="h-4 w-4" />
                      </SafeLink>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {agentProperties.map((p) => <PropertyCard key={p.id} property={p} size="sm" />)}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Right: contact form */}
            <div>
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-white shadow-luxe p-7 sticky top-24">
                  <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-2">Contact {agent.name.split(" ")[0]}</h2>
                  <p className="text-sm text-[var(--muted-foreground)] mb-5">Send a message and {agent.name.split(" ")[0]} will respond within 24 hours.</p>
                  <AgentContactForm agentName={agent.name} agentEmail={agent.email} agentPhone={agent.phone} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AgentContactForm({ agentName, agentEmail, agentPhone }: { agentName: string; agentEmail: string; agentPhone: string }) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        try {
          await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, interest: `Contact advisor: ${agentName}`, email: agentEmail }),
          });
          toast.success(`Message sent to ${agentName.split(" ")[0]}! They'll respond within 24 hours.`);
          form.reset();
        } catch {
          toast.error("Something went wrong. Please call " + agentPhone);
        }
      }}
      className="space-y-3"
    >
      <input name="name" required placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors" />
      <input name="phone" required placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors" />
      <input name="userEmail" type="email" required placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors" />
      <textarea name="message" rows={4} required placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors resize-none" />
      <button type="submit" className="w-full btn-royal py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
        Send Message <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
