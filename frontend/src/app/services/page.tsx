"use client";

import SafeLink from "@/components/ui/safe-link";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  Key,
  Tag,
  TrendingUp,
  Shield,
  Scale,
  Sofa,
  ArrowRight,
  CheckCircle2,
  Crown,
  Users,
  Handshake,
  Sparkles,
  HelpCircle,
  Home as HomeIcon,
} from "lucide-react";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import Reveal from "@/components/real-estate/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services, buyProcess, sellProcess, faqs } from "@/lib/real-estate-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  key: Key,
  tag: Tag,
  trending: TrendingUp,
  shield: Shield,
  scale: Scale,
  sofa: Sofa,
};

const serviceIncludes: Record<string, string[]> = {
  "Property Buying": [
    "Complimentary discovery consultation",
    "Curated, verified shortlist",
    "Private & virtual viewings",
    "Price negotiation",
    "Full legal due diligence",
    "Registry & handover support",
  ],
  "Property Selling": [
    "Data-backed market valuation",
    "Cinematic drone & 3D marketing",
    "Targeted digital campaigns",
    "Buyer pre-qualification",
    "Offer negotiation",
    "End-to-end transfer handling",
  ],
  "Investment Advisory": [
    "Portfolio strategy session",
    "Opportunity sourcing & vetting",
    "ROI & risk modelling",
    "Pre-launch access",
    "Quarterly performance review",
    "Exit planning",
  ],
  "Property Management": [
    "Tenant sourcing & vetting",
    "Rent collection & remittance",
    "Routine maintenance",
    "Annual inspections",
    "Utility & staff oversight",
    "Detailed monthly reporting",
  ],
  "Legal & Documentation": [
    "Title & ownership verification",
    "Agreement-to-sell drafting",
    "Stamp duty & registry filing",
    "Society transfer letters",
    "Power of attorney support",
    "Litigation avoidance review",
  ],
  "Interior & Renovation": [
    "Concept & space planning",
    "Material sourcing & procurement",
    "Contractor management",
    "Smart-home integration",
    "Styling & furnishing",
    "Turnkey handover",
  ],
};

const accentMap: Record<string, "royal" | "emerald" | "gold"> = {
  "Property Buying": "royal",
  "Property Selling": "gold",
  "Investment Advisory": "emerald",
  "Property Management": "royal",
  "Legal & Documentation": "emerald",
  "Interior & Renovation": "gold",
};

const advantages = [
  { icon: Crown, title: "Award-Winning Team", desc: "Recognized as Lahore's #1 luxury agency by the Pakistan Property Council." },
  { icon: Users, title: "Dedicated Senior Advisor", desc: "One point of contact who knows your file inside out, end-to-end." },
  { icon: Handshake, title: "In-House Legal Experts", desc: "Every transaction is vetted by qualified property lawyers." },
  { icon: Sparkles, title: "Cinematic Marketing", desc: "Drone films, 3D tours, and editorial photography included." },
];

export default function ServicesPage() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const steps = mode === "buy" ? buyProcess : sellProcess;

  return (
    <SiteShell>
      <PageHero
        eyebrow="What We Do"
        title="Full-Service"
        titleAccent="Real Estate Excellence"
        subtitle="From first viewing to final handover, our six integrated services cover every need across the property lifecycle — all under one trusted roof."
        crumbs={[{ label: "Services" }]}
        background="/images/interior_kitchen.png"
      />

      {/* Services Grid */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[var(--gold)]/8 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Six Disciplines, One Standard
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Everything You Need,{" "}
              <span className="text-gradient-royal">Under One Roof</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] ?? Key;
              const accent = accentMap[s.title] ?? "royal";
              const includes = serviceIncludes[s.title] ?? [];
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group h-full rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg p-7 border border-border/60 relative overflow-hidden"
                  >
                    {/* Glow blob */}
                    <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      accent === "royal" ? "bg-[var(--royal)]/15" :
                      accent === "emerald" ? "bg-[var(--emerald-brand)]/15" :
                      "bg-[var(--gold)]/20"
                    }`} />

                    <div className="relative">
                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 ${
                        accent === "royal" ? "bg-[var(--royal)]/10 text-[var(--royal)]" :
                        accent === "emerald" ? "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]" :
                        "bg-[var(--gold)]/15 text-[var(--gold-deep)]"
                      }`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-[var(--ink)]/65 leading-relaxed mb-5">
                        {s.desc}
                      </p>

                      <div className="pt-4 border-t border-border">
                        <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)] mb-3">
                          What's Included
                        </div>
                        <ul className="space-y-2">
                          {includes.map((inc) => (
                            <li key={inc} className="flex items-start gap-2 text-xs text-[var(--ink)]/75">
                              <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                                accent === "royal" ? "text-[var(--royal)]" :
                                accent === "emerald" ? "text-[var(--emerald-brand)]" :
                                "text-[var(--gold-deep)]"
                              }`} />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <SafeLink
                        href="/contact"
                        className={`mt-6 inline-flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2 ${
                          accent === "royal" ? "text-[var(--royal)]" :
                          accent === "emerald" ? "text-[var(--emerald-brand)]" :
                          "text-[var(--gold-deep)]"
                        }`}
                      >
                        Enquire <ArrowRight className="h-3.5 w-3.5" />
                      </SafeLink>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--emerald-brand)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                How We Work
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              A Proven{" "}
              <span className="text-gradient-royal">Four-Step Process</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Toggle between buying and selling to see exactly how we guide each journey.
            </p>
          </Reveal>

          {/* Toggle */}
          <Reveal delay={0.1}>
            <div className="flex justify-center mb-12">
              <div className="relative inline-flex p-1.5 rounded-full bg-white shadow-luxe">
                {(["buy", "sell"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-bold transition-colors ${
                      mode === m ? "text-white" : "text-[var(--ink)]/70 hover:text-[var(--ink)]"
                    }`}
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="services-toggle"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--royal)] to-[var(--emerald-brand)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{m === "buy" ? "Buying Process" : "Selling Process"}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <Reveal key={`${mode}-${step.step}`} delay={i * 0.08}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg p-7 text-center h-full"
                >
                  <div className="relative inline-flex mb-5">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--royal)] to-[var(--emerald-brand)] text-white flex items-center justify-center font-display text-2xl font-bold shadow-luxe">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--ink)]/65 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
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
              The Service{" "}
              <span className="text-gradient-gold">Advantage</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl bg-luxe-soft p-7 text-center"
                >
                  <div className="h-14 w-14 rounded-2xl bg-white shadow-luxe text-[var(--royal)] flex items-center justify-center mb-5 mx-auto">
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

      {/* FAQ Teaser */}
      <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="h-4 w-4 text-[var(--gold-deep)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Questions Answered
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Frequently Asked{" "}
              <span className="text-gradient-royal">Questions</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white shadow-luxe-lg p-7 lg:p-10">
              <Accordion type="single" collapsible className="w-full">
                {faqs.slice(0, 4).map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-display text-base font-bold text-[var(--ink)] hover:text-[var(--royal)] hover:no-underline py-5">
                      <span className="flex items-start gap-3">
                        <span className="font-display text-sm font-bold text-[var(--gold-deep)] mt-0.5">
                          0{i + 1}
                        </span>
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[var(--ink)]/70 leading-relaxed pl-8">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="text-center mt-8">
              <p className="text-sm text-[var(--ink)]/65 mb-4">Still have questions? Our team is one message away.</p>
              <SafeLink
                href="/contact"
                className="btn-royal px-7 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2"
              >
                Ask an Advisor <ArrowRight className="h-4 w-4" />
              </SafeLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0 bg-grid-luxe opacity-20" />
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[var(--emerald-brand)]/25 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[var(--gold)]/20 blur-3xl animate-float-slower" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <HomeIcon className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                Ready to Begin?
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Whatever Your Property Need,{" "}
              <span className="text-gradient-gold">We've Got You</span>
            </h2>
            <p className="mt-5 text-white/70 text-lg max-w-2xl mx-auto">
              Book a complimentary consultation and let our senior advisors craft a tailored plan for your goals.
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
                Browse Listings
              </SafeLink>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
