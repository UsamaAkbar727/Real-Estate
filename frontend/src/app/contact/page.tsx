"use client";

import SafeLink from "@/components/ui/safe-link";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Building2,
  MessageCircle,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import Reveal from "@/components/real-estate/reveal";
import { COMPANY } from "@/lib/real-estate-data";

const interests = [
  "Buying a Property",
  "Selling a Property",
  "Investment Advisory",
  "Property Management",
  "Legal & Documentation",
  "General Inquiry",
];

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Our Office",
    value: COMPANY.address,
    sub: "Gulberg III, Lahore",
    accent: "royal",
    href: "#map",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: COMPANY.phone,
    sub: `Alt: ${COMPANY.phoneAlt}`,
    accent: "emerald",
    href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: COMPANY.email,
    sub: "We reply within 4 hours",
    accent: "gold",
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: COMPANY.hours,
    sub: "Sunday: By appointment",
    accent: "royal",
    href: undefined,
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
      toast.success("Message sent! Our team will reach out within 24 hours.");
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
        eyebrow="Get in Touch"
        title="Begin Your"
        titleAccent="Property Journey"
        subtitle="Whether you're buying your first home, selling a family estate, or building a portfolio — our advisors are ready to help, 7 days a week."
        crumbs={[{ label: "Contact" }]}
      />

      {/* Contact Info Cards */}
      <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((c, i) => {
              const inner = (
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg p-7 border border-border/60 group"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                      c.accent === "royal"
                        ? "bg-[var(--royal)]/10 text-[var(--royal)]"
                        : c.accent === "emerald"
                        ? "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]"
                        : "bg-[var(--gold)]/15 text-[var(--gold-deep)]"
                    }`}
                  >
                    <c.icon className="h-7 w-7" />
                  </div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">
                    {c.label}
                  </div>
                  <div className="text-base font-bold text-[var(--ink)] mt-1.5 leading-snug">
                    {c.value}
                  </div>
                  <div className="text-xs text-[var(--ink)]/55 mt-1.5">{c.sub}</div>
                </motion.div>
              );
              return (
                <Reveal key={c.label} delay={(i % 4) * 0.08}>
                  {c.href ? (
                    <SafeLink href={c.href} className="block h-full">
                      {inner}
                    </SafeLink>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="relative py-20 lg:py-28 bg-luxe-soft overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[var(--emerald-brand)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            {/* Form Card */}
            <Reveal>
              <div className="rounded-[2rem] bg-white shadow-luxe-lg p-7 lg:p-10 relative overflow-hidden h-full">
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--royal)]/5 blur-3xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="h-px w-8 bg-[var(--gold)]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                      Send a Message
                    </span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--ink)] tracking-tight mb-2">
                    Let's Talk About{" "}
                    <span className="text-gradient-royal">Your Goals</span>
                  </h2>
                  <p className="text-sm text-[var(--ink)]/60 mb-7">
                    Fill in your details and a senior advisor will personally respond within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field icon={<User className="h-4 w-4" />} label="Full Name" name="name" placeholder="Ahmed Khan" required />
                      <Field icon={<Mail className="h-4 w-4" />} label="Email Address" name="email" type="email" placeholder="you@email.com" required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field icon={<Phone className="h-4 w-4" />} label="Phone Number" name="phone" placeholder="+92 300 1234567" required />
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
                          I'm interested in
                        </label>
                        <div className="relative">
                          <select
                            name="interest"
                            defaultValue="General Inquiry"
                            className="w-full appearance-none px-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors pr-10"
                          >
                            {interests.map((i) => (
                              <option key={i}>{i}</option>
                            ))}
                          </select>
                          <Building2 className="h-4 w-4 text-[var(--royal)] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
                        Your Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="h-4 w-4 text-[var(--royal)] absolute left-4 top-4" />
                        <textarea
                          name="message"
                          rows={5}
                          placeholder="Tell us about your dream property, budget, timeline, or anything we can help with..."
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors resize-none"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || done}
                      className="w-full btn-royal py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-90"
                    >
                      {loading ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                      ) : done ? (
                        <><CheckCircle2 className="h-4 w-4" /> Message Sent!</>
                      ) : (
                        <>Send Message <Send className="h-4 w-4" /></>
                      )}
                    </button>
                    <p className="text-xs text-center text-[var(--muted-foreground)]">
                      By submitting, you agree to our Privacy Policy. We never share your data.
                    </p>
                  </form>
                </div>
              </div>
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={0.1}>
              <div className="space-y-5">
                {/* Quick contact */}
                <div className="rounded-3xl bg-[var(--ink)] text-white p-7 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[var(--royal)]/30 blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[var(--gold)]/15 blur-3xl" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <Clock className="h-4 w-4 text-[var(--gold)]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                        Office Hours
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-4">When We're Open</h3>
                    <ul className="space-y-2.5 text-sm">
                      <li className="flex items-center justify-between py-2 border-b border-white/10">
                        <span className="text-white/70">Monday – Friday</span>
                        <span className="font-semibold">9 AM – 8 PM</span>
                      </li>
                      <li className="flex items-center justify-between py-2 border-b border-white/10">
                        <span className="text-white/70">Saturday</span>
                        <span className="font-semibold">10 AM – 6 PM</span>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <span className="text-white/70">Sunday</span>
                        <span className="font-semibold text-[var(--gold-light)]">By Appointment</span>
                      </li>
                    </ul>
                    <SafeLink
                      href={`https://wa.me/${COMPANY.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] text-white text-sm font-bold hover:brightness-110 transition-all"
                    >
                      <MessageCircle className="h-4 w-4" fill="currentColor" /> Chat on WhatsApp
                    </SafeLink>
                  </div>
                </div>

                {/* Direct line */}
                <div className="rounded-3xl bg-white shadow-luxe p-7">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Phone className="h-4 w-4 text-[var(--royal)]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                      Prefer to Call?
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-3">
                    Speak to an Advisor Now
                  </h3>
                  <SafeLink
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="block text-2xl font-display font-bold text-gradient-royal hover:opacity-80 transition-opacity"
                  >
                    {COMPANY.phone}
                  </SafeLink>
                  <SafeLink
                    href={`tel:${COMPANY.phoneAlt.replace(/\s/g, "")}`}
                    className="block text-sm text-[var(--ink)]/70 mt-1 hover:text-[var(--royal)] transition-colors"
                  >
                    Alt: {COMPANY.phoneAlt}
                  </SafeLink>
                  <SafeLink
                    href="/properties"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[var(--royal)] hover:gap-2 transition-all"
                  >
                    Or browse our listings <ArrowRight className="h-3.5 w-3.5" />
                  </SafeLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="relative py-20 lg:py-24 bg-white overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Navigation className="h-4 w-4 text-[var(--gold-deep)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Find Us in Gulberg
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Our Lahore{" "}
              <span className="text-gradient-royal">Headquarters</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              {COMPANY.address}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl overflow-hidden shadow-luxe-lg border-4 border-white">
              <iframe
                title="Imperial Estates Office Location"
                src={COMPANY.mapEmbed}
                className="w-full h-[420px]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SafeLink
                href="https://www.openstreetmap.org/?mlat=31.5204&mlon=74.3587#map=15/31.5204/74.3587"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-royal px-7 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" /> Open in Maps
              </SafeLink>
              <SafeLink
                href="/agents"
                className="px-7 py-3.5 rounded-full text-sm font-bold text-[var(--ink)] border border-border hover:bg-luxe-soft transition-colors inline-flex items-center gap-2"
              >
                Meet Our Advisors <ArrowRight className="h-4 w-4" />
              </SafeLink>
            </div>
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
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--royal)]">{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm text-[var(--ink)] placeholder:text-[var(--muted-foreground)]/60 focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors"
        />
      </div>
    </div>
  );
}
