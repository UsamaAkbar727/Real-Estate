"use client";

import SafeLink from "@/components/ui/safe-link";

import { motion } from "framer-motion";

import {
  Search,
  ShieldCheck,
  Handshake,
  KeyRound,
  Sparkles,
  HeartHandshake,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import Reveal from "@/components/real-estate/reveal";
import PropertyCard from "@/components/real-estate/property-card";
import { buyProcess, properties } from "@/lib/real-estate-data";

const advantages = [
  {
    icon: Search,
    title: "Curated, Verified Listings",
    desc: "Every property is personally inspected and legally verified by our in-house team before it reaches you.",
    accent: "royal",
  },
  {
    icon: ShieldCheck,
    title: "Ironclad Legal Due Diligence",
    desc: "Title checks, ownership history, and society dues cleared by our lawyers — zero hidden surprises.",
    accent: "emerald",
  },
  {
    icon: Handshake,
    title: "Expert Negotiation",
    desc: "We negotiate the best price on your behalf using live market data and 15 years of transaction insight.",
    accent: "gold",
  },
  {
    icon: KeyRound,
    title: "Seamless Handover",
    desc: "From token money to registry to keys in your hand — we manage every single step end-to-end.",
    accent: "royal",
  },
  {
    icon: Sparkles,
    title: "Concierge Viewings",
    desc: "Private, chauffeured viewings at your convenience — including virtual tours for overseas clients.",
    accent: "emerald",
  },
  {
    icon: HeartHandshake,
    title: "Lifetime After-Sales",
    desc: "Our relationship doesn't end at handover. Renovation, rental, and resale support for life.",
    accent: "gold",
  },
];

export default function BuyPage() {
  const featured = properties.filter((p) => p.type === "Sale").slice(0, 6);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Buy with Confidence"
        title="Find Your"
        titleAccent="Dream Home"
        subtitle="From DHA villas to Bahria penthouses, our advisors hand-curate Lahore's finest properties and walk you through every step — from first viewing to keys in hand."
        crumbs={[{ label: "Buy" }]}
        background="/images/villa_exterior_3.png"
      />

      {/* Buy Process Timeline */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                The Buying Journey
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              A Four-Step Path to{" "}
              <span className="text-gradient-royal">Your New Address</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Transparent, deliberate, and completely stress-free. Here's how we turn your brief into a set of keys.
            </p>
          </Reveal>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--royal)]/30 to-transparent" />

            <div className="grid lg:grid-cols-4 gap-8">
              {buyProcess.map((step, i) => (
                <Reveal key={step.step} delay={i * 0.1}>
                  <div className="relative text-center lg:text-left">
                    <div className="relative inline-flex">
                      <div className="h-24 w-24 rounded-full bg-white shadow-luxe-lg flex items-center justify-center mb-6 mx-auto lg:mx-0 relative z-10">
                        <div className="absolute inset-2 rounded-full bg-luxe-soft" />
                        <span className="relative font-display text-3xl font-bold text-gradient-royal">
                          {step.step}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--ink)]/65 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Buy With Us */}
      <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[var(--emerald-brand)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                The Imperial Advantage
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Why Buy With{" "}
              <span className="text-gradient-gold">Imperial Estates</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Six commitments that have earned the trust of 4,200+ families across Lahore.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg p-7 transition-shadow"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 ${
                      a.accent === "royal"
                        ? "bg-[var(--royal)]/10 text-[var(--royal)]"
                        : a.accent === "emerald"
                        ? "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]"
                        : "bg-[var(--gold)]/15 text-[var(--gold-deep)]"
                    }`}
                  >
                    <a.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-[var(--ink)]/65 leading-relaxed">
                    {a.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties For Sale */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-10 bg-[var(--gold)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                  Now Available
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
                Featured Properties{" "}
                <span className="text-gradient-royal">For Sale</span>
              </h2>
            </div>
            <SafeLink
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--royal)] transition-colors w-fit"
            >
              View All Properties <ArrowRight className="h-4 w-4" />
            </SafeLink>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <PropertyCard property={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0 bg-grid-luxe opacity-20" />
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[var(--royal)]/30 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[var(--gold)]/20 blur-3xl animate-float-slower" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <Clock className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                Ready When You Are
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Let's Find the Home{" "}
              <span className="text-gradient-gold">You Deserve</span>
            </h2>
            <p className="mt-5 text-white/70 text-lg max-w-2xl mx-auto">
              Book a complimentary consultation with a senior advisor today. No fees, no pressure — just clarity.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SafeLink
                href="/contact"
                className="btn-gold px-8 py-4 rounded-full text-sm font-bold inline-flex items-center gap-2"
              >
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </SafeLink>
              <SafeLink
                href="/properties"
                className="px-8 py-4 rounded-full text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" /> Browse Listings
              </SafeLink>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
