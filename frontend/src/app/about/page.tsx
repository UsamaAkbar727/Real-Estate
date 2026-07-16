"use client";

import SafeLink from "@/components/ui/safe-link";

import { motion } from "framer-motion";

import {
  Target,
  Eye,
  Gem,
  ShieldCheck,
  Users,
  Award,
  Heart,
  ArrowRight,
  Crown,
  Building2,
  Handshake,
  Sparkles,
} from "lucide-react";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import Reveal from "@/components/real-estate/reveal";
import { COMPANY, agents, stats, whyChooseUs } from "@/lib/real-estate-data";

const mvv = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To redefine real estate in Lahore through radical transparency, white-glove service, and an unwavering commitment to client outcomes — not commissions.",
    accent: "royal",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be Pakistan's most trusted luxury real estate brand — the first name that comes to mind when a family dreams of a home or an investor envisions a portfolio.",
    accent: "emerald",
  },
  {
    icon: Gem,
    title: "Our Values",
    desc: "Integrity above all. Excellence in every detail. Empathy for every client. And a relentless pursuit of mastery in the markets we serve.",
    accent: "gold",
  },
];

const values = [
  { icon: ShieldCheck, label: "Integrity", desc: "We tell you what you need to hear, not what makes the sale." },
  { icon: Crown, label: "Excellence", desc: "Every detail matters — from the first call to the final handover." },
  { icon: Heart, label: "Empathy", desc: "We treat every family's home as if it were our own." },
  { icon: Award, label: "Mastery", desc: "15 years of deep market intelligence in every recommendation." },
];

const advantages = [
  {
    icon: Building2,
    title: "15+ Years in Lahore",
    desc: "Deep, hard-won expertise across DHA, Bahria, Lake City, and Gulberg.",
  },
  {
    icon: Users,
    title: "4,200+ Happy Families",
    desc: "A retention rate of 98% built on consistent, exceptional service.",
  },
  {
    icon: Handshake,
    title: "In-House Legal Team",
    desc: "Title verification, transfer, and registry handled by qualified lawyers.",
  },
  {
    icon: Sparkles,
    title: "Cinematic Marketing",
    desc: "Drone films, 3D tours, and editorial photography for every listing.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Story"
        title="Redefining Luxury Real Estate in"
        titleAccent="Lahore Since 2009"
        subtitle={`What began in a single Gulberg office has grown into Lahore's most respected luxury real estate firm — with PKR 42 billion in lifetime sales and a 98% client satisfaction rate.`}
        crumbs={[{ label: "About" }]}
        background="/images/skyline.png"
      />

      {/* Intro / Story */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-10 bg-[var(--gold)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                  The Imperial Story
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight mb-6">
                A Family Business,{" "}
                <span className="text-gradient-royal">Built on Trust</span>
              </h2>
              <div className="space-y-4 text-[var(--ink)]/70 text-base leading-relaxed">
                <p>
                  Imperial Estates was founded in {COMPANY.founded} by Ahmed Raza Khan, a young advisor who had grown tired of an industry where opacity, hidden fees, and sloppy paperwork were the norm. His vision was simple: bring the level of service expected in London or Dubai to the families of Lahore.
                </p>
                <p>
                  Fifteen years later, that vision has become a movement. We've closed over 4,200 transactions worth more than PKR 42 billion, won the Pakistan Property Council's "Best Agency" award, and built a private network of buyers and sellers that spans the country and the overseas Pakistani diaspora.
                </p>
                <p>
                  But the things that haven't changed matter more. We still answer every call personally. We still refuse to list a property we wouldn't buy ourselves. And we still measure success one family at a time.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-luxe-soft p-5">
                  <div className="font-display text-3xl font-bold text-gradient-royal">15+</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Years of Service</div>
                </div>
                <div className="rounded-2xl bg-luxe-soft p-5">
                  <div className="font-display text-3xl font-bold text-gradient-gold">42B</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">PKR in Sales</div>
                </div>
                <div className="rounded-2xl bg-luxe-soft p-5">
                  <div className="font-display text-3xl font-bold text-[var(--emerald-brand)]">98%</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Satisfaction</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-luxe-lg">
                  <img
                    src="/images/skyline.png"
                    alt="Imperial Estates Lahore office"
                    className="w-full h-[460px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white shadow-luxe-lg p-5 max-w-[220px]">
                  <Crown className="h-7 w-7 text-[var(--gold-deep)] mb-2" />
                  <div className="font-display text-sm font-bold text-[var(--ink)]">
                    Best Luxury Agency 2019
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">
                    Pakistan Property Council
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[var(--gold)]/8 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                What Drives Us
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Mission, Vision &{" "}
              <span className="text-gradient-gold">Values</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {mvv.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg p-7"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 ${
                      m.accent === "royal"
                        ? "bg-[var(--royal)]/10 text-[var(--royal)]"
                        : m.accent === "emerald"
                        ? "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]"
                        : "bg-[var(--gold)]/15 text-[var(--gold-deep)]"
                    }`}
                  >
                    <m.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-3">
                    {m.title}
                  </h3>
                  <p className="text-sm text-[var(--ink)]/65 leading-relaxed">
                    {m.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.label} delay={(i % 4) * 0.08}>
                <div className="rounded-2xl glass p-5">
                  <v.icon className="h-6 w-6 text-[var(--royal)] mb-3" />
                  <div className="font-display text-sm font-bold text-[var(--ink)] mb-1">{v.label}</div>
                  <div className="text-xs text-[var(--ink)]/65 leading-relaxed">{v.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--emerald-brand)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Milestones
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Fifteen Years of{" "}
              <span className="text-gradient-royal">Milestones</span>
            </h2>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--royal)]/40 via-[var(--gold)]/40 to-[var(--emerald-brand)]/40" />

            <div className="space-y-10">
              {whyChooseUs.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}>
                    {/* Node */}
                    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                      <div className="h-10 w-10 rounded-full bg-white shadow-luxe-lg border-2 border-[var(--gold)] flex items-center justify-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[var(--royal)] to-[var(--emerald-brand)]" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`pl-16 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="rounded-2xl bg-white shadow-luxe hover:shadow-luxe-lg p-6 border border-border/60"
                      >
                        <div className={`font-display text-3xl font-bold text-gradient-royal mb-2 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                          {m.year}
                        </div>
                        <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                          {m.title}
                        </h3>
                        <p className="text-sm text-[var(--ink)]/65 leading-relaxed">
                          {m.desc}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="relative py-20 lg:py-24 overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0 bg-grid-luxe opacity-20" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-96 rounded-full bg-[var(--royal)]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="glass-dark rounded-3xl p-7 text-center">
                  <div className="font-display text-4xl lg:text-5xl font-bold text-gradient-gold">
                    {s.prefix || ""}{s.value}{s.suffix}
                  </div>
                  <div className="mt-2 text-sm text-white/70 font-medium">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                The People Behind the Brand
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Meet the{" "}
              <span className="text-gradient-royal">Advisory Team</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              The senior advisors who'll personally guide your transaction from start to finish.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent, i) => (
              <Reveal key={agent.slug} delay={(i % 4) * 0.08}>
                <SafeLink
                  href={`/agents/${agent.slug}`}
                  className="group block rounded-3xl overflow-hidden bg-white shadow-luxe hover:shadow-luxe-lg lift"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)] mb-1">
                        {agent.experience}
                      </div>
                      <h3 className="font-display text-lg font-bold text-white">{agent.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-semibold text-[var(--royal)] uppercase tracking-wider mb-1">
                      {agent.role}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-[var(--ink)]/70">
                      <span>{agent.sales}</span>
                      <span className="font-bold text-[var(--ink)]">{agent.deals} deals</span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--royal)] group-hover:gap-2 transition-all">
                      View Profile <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </SafeLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Why Choose Imperial
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              The Imperial{" "}
              <span className="text-gradient-gold">Difference</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg p-7 text-center"
                >
                  <div className="h-14 w-14 rounded-2xl bg-[var(--royal)]/10 text-[var(--royal)] flex items-center justify-center mb-5 mx-auto">
                    <a.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[var(--ink)] mb-2">
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

      {/* CTA Band */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0 bg-grid-luxe opacity-20" />
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[var(--royal)]/30 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[var(--gold)]/20 blur-3xl animate-float-slower" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <Crown className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                Join the Imperial Family
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Let's Build Something{" "}
              <span className="text-gradient-gold">Lasting Together</span>
            </h2>
            <p className="mt-5 text-white/70 text-lg max-w-2xl mx-auto">
              Whether you're buying, selling, or building a portfolio — our team is ready to make your next move exceptional.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SafeLink
                href="/contact"
                className="btn-gold px-8 py-4 rounded-full text-sm font-bold inline-flex items-center gap-2"
              >
                Get in Touch <ArrowRight className="h-4 w-4" />
              </SafeLink>
              <SafeLink
                href="/services"
                className="px-8 py-4 rounded-full text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                Explore Our Services
              </SafeLink>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
