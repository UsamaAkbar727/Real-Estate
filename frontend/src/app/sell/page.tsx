"use client";

import SafeLink from "@/components/ui/safe-link";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  Video,
  Box,
  Megaphone,
  Camera,
  Share2,
  Sparkles,
  ArrowRight,
  Send,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  MessageSquare,
  Loader2,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import Reveal from "@/components/real-estate/reveal";
import { sellProcess, stats } from "@/lib/real-estate-data";

const marketing = [
  {
    icon: Video,
    title: "Cinematic Drone Video",
    desc: "4K aerial films capturing your property's full grandeur — used across web, social, and listing portals.",
    accent: "royal",
    points: ["Licensed drone pilots", "Hollywood-grade color grading", "Vertical + horizontal cuts"],
  },
  {
    icon: Box,
    title: "3D Virtual Tours",
    desc: "Matterport-grade 3D walkthroughs let qualified buyers explore every room from anywhere in the world.",
    accent: "emerald",
    points: ["24/7 remote viewing", "Dollhouse & floor-plan views", "Embedded on top portals"],
  },
  {
    icon: Megaphone,
    title: "Targeted Digital Campaigns",
    desc: "Meta & Google ad campaigns reaching high-intent buyers in Lahore, Karachi, Islamabad, and NRP hubs.",
    accent: "gold",
    points: ["Custom audience building", "Retargeting of warm leads", "Weekly performance reports"],
  },
  {
    icon: Camera,
    title: "Editorial Photography",
    desc: "Magazine-quality photography by award-winning architectural photographers, shot at golden hour.",
    accent: "royal",
    points: ["Pro staging consultation", "Wide-angle + detail shots", "Twilight exterior set"],
  },
  {
    icon: Share2,
    title: "Premium Portal Listings",
    desc: "Featured placement on Zameen, Lamudi, Olx, and our own 50K+ monthly visitor site.",
    accent: "emerald",
    points: ["Top-of-search placement", "Multi-platform syndication", "Verified badge status"],
  },
  {
    icon: Sparkles,
    title: "Private Buyer Network",
    desc: "We tap our private database of 4,200+ active buyers — many sales close before ever going public.",
    accent: "gold",
    points: ["Pre-qualified cash buyers", "NRP & overseas network", "Off-market matching"],
  },
];

const propertyTypes = [
  "Residential Villa",
  "Luxury Apartment",
  "Penthouse",
  "Commercial Plaza",
  "Farmhouse",
  "Plot / File",
  "Other",
];

export default function SellPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interest: "Selling: Free Valuation",
      message: `Property Address: ${formData.get("address") || "—"}\nProperty Type: ${formData.get("propertyType") || "—"}\n\n${formData.get("message") || ""}`,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
      toast.success("Valuation request received! Our team will call you within 24 hours.");
      form.reset();
      setTimeout(() => setDone(false), 4000);
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Sell with Imperial"
        title="Get the Best"
        titleAccent="Price for Your Home"
        subtitle="Cinematic marketing, a private buyer network, and 15 years of negotiation mastery — engineered to sell your property for the highest price, in the shortest time."
        crumbs={[{ label: "Sell" }]}
        background="/images/interior_bathroom.png"
      />

      {/* Sell Process Timeline */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--gold)]/8 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                The Selling Journey
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              From Valuation to{" "}
              <span className="text-gradient-gold">Sold</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Four deliberate steps that turn your property into the most sought-after listing in Lahore.
            </p>
          </Reveal>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
            <div className="grid lg:grid-cols-4 gap-8">
              {sellProcess.map((step, i) => (
                <Reveal key={step.step} delay={i * 0.1}>
                  <div className="relative text-center lg:text-left">
                    <div className="h-24 w-24 rounded-full bg-white shadow-luxe-lg flex items-center justify-center mb-6 mx-auto lg:mx-0 relative z-10">
                      <div className="absolute inset-2 rounded-full bg-[var(--gold)]/10" />
                      <span className="relative font-display text-3xl font-bold text-gradient-gold">
                        {step.step}
                      </span>
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

      {/* Free Valuation Form */}
      <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[var(--emerald-brand)]/8 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-10 bg-[var(--gold)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                  Complimentary • 48 Hours
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
                Get Your Property's{" "}
                <span className="text-gradient-royal">True Market Value</span>
              </h2>
              <p className="mt-5 text-[var(--ink)]/65 text-lg leading-relaxed">
                Tell us about your property and our valuation team will deliver a data-backed assessment within 48 hours — completely free, no obligation.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Comparable sales analysis from the last 90 days",
                  "Current demand heatmap for your society",
                  "Recommended pricing strategy & timeline",
                  "No obligation, no fees, no pressure",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--ink)]/80">
                    <CheckCircle2 className="h-5 w-5 text-[var(--emerald-brand)] shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-[2rem] bg-white shadow-luxe-lg p-7 lg:p-10 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--gold)]/8 blur-3xl" />
                <form onSubmit={handleSubmit} className="relative space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field icon={<User className="h-4 w-4" />} label="Full Name" name="name" placeholder="Ahmed Khan" required />
                    <Field icon={<Phone className="h-4 w-4" />} label="Phone Number" name="phone" placeholder="+92 300 1234567" required />
                  </div>
                  <Field icon={<Mail className="h-4 w-4" />} label="Email Address" name="email" type="email" placeholder="you@email.com" required />
                  <Field icon={<MapPin className="h-4 w-4" />} label="Property Address" name="address" placeholder="House 12, Street 5, DHA Phase 6, Lahore" required />
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
                      Property Type
                    </label>
                    <div className="relative">
                      <select
                        name="propertyType"
                        defaultValue=""
                        className="w-full appearance-none px-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--gold-deep)] focus:bg-white transition-colors pr-10"
                        required
                      >
                        <option value="" disabled>Select property type</option>
                        {propertyTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <Building2 className="h-4 w-4 text-[var(--gold-deep)] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
                      Additional Details
                    </label>
                    <div className="relative">
                      <MessageSquare className="h-4 w-4 text-[var(--gold-deep)] absolute left-4 top-4" />
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about size, condition, expected price, urgency..."
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--gold-deep)] focus:bg-white transition-colors resize-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || done}
                    className="w-full btn-gold py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-90"
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                    ) : done ? (
                      <><CheckCircle2 className="h-4 w-4" /> Request Sent!</>
                    ) : (
                      <>Request Free Valuation <Send className="h-4 w-4" /></>
                    )}
                  </button>
                  <p className="text-xs text-center text-[var(--muted-foreground)]">
                    Your details are confidential and never shared with third parties.
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Marketing Showcase */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Marketing That Sells
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              A Showcase{" "}
              <span className="text-gradient-royal">Worthy of Your Home</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              We invest more in marketing each listing than most agencies spend in a year. Here's how.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketing.map((m, i) => (
              <Reveal key={m.title} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg p-7 border border-border/60 transition-shadow"
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
                  <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                    {m.title}
                  </h3>
                  <p className="text-sm text-[var(--ink)]/65 leading-relaxed mb-4">
                    {m.desc}
                  </p>
                  <ul className="space-y-1.5">
                    {m.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs text-[var(--ink)]/70">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          m.accent === "royal" ? "bg-[var(--royal)]" :
                          m.accent === "emerald" ? "bg-[var(--emerald-brand)]" :
                          "bg-[var(--gold)]"
                        }`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="relative py-20 lg:py-24 overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0 bg-grid-luxe opacity-20" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-96 rounded-full bg-[var(--royal)]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                Sellers Who Trusted Us
              </span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Numbers That{" "}
              <span className="text-gradient-gold">Speak for Themselves</span>
            </h2>
          </Reveal>
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
          <Reveal className="text-center mt-12">
            <SafeLink
              href="/contact"
              className="btn-gold px-8 py-4 rounded-full text-sm font-bold inline-flex items-center gap-2"
            >
              List Your Property Today <ArrowRight className="h-4 w-4" />
            </SafeLink>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gold-deep)]">{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm text-[var(--ink)] placeholder:text-[var(--muted-foreground)]/60 focus:outline-none focus:border-[var(--gold-deep)] focus:bg-white transition-colors"
        />
      </div>
    </div>
  );
}
