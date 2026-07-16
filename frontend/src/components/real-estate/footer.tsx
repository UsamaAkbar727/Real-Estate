"use client";

import SafeLink from "@/components/ui/safe-link";
import { motion } from "framer-motion";
import {
  Crown,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  Send,
  ShieldCheck,
  Award,
  Building2,
} from "lucide-react";
import { COMPANY } from "@/lib/real-estate-data";
import { useState } from "react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Agents", href: "/agents" },
      { label: "Services", href: "/services" },
      { label: "Blog & News", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Properties",
    links: [
      { label: "All Properties", href: "/properties" },
      { label: "Villas", href: "/properties?category=Villa" },
      { label: "Apartments", href: "/properties?category=Apartment" },
      { label: "Penthouses", href: "/properties?category=Penthouse" },
      { label: "Plots & Files", href: "/properties?category=Plot" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Buy a Property", href: "/buy" },
      { label: "Sell a Property", href: "/sell" },
      { label: "Investment Advisory", href: "/invest" },
      { label: "Property Management", href: "/services" },
      { label: "Legal Support", href: "/services" },
    ],
  },
  {
    title: "Areas We Serve",
    links: [
      { label: "DHA Lahore", href: "/properties?area=DHA" },
      { label: "Bahria Town", href: "/properties?area=Bahria" },
      { label: "Gulberg", href: "/properties?area=Gulberg" },
      { label: "Lake City", href: "/properties?area=Lake+City" },
      { label: "Wapda Town", href: "/properties?area=Wapda" },
    ],
  },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--ink)] text-white overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--royal)]/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[var(--gold)]/10 blur-3xl" />

      {/* Newsletter band */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Send className="h-4 w-4 text-[var(--gold-light)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                  Stay in the Know
                </span>
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold leading-tight">
                Get exclusive listings & market insights
              </h3>
              <p className="text-white/60 mt-2">
                Join 12,000+ subscribers. One curated email every Sunday. No spam, ever.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                (e.currentTarget.querySelector("input") as HTMLInputElement).value = "";
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Mail className="h-5 w-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-white/12 transition-colors"
                />
              </div>
              <button className="btn-gold px-6 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap">
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <SafeLink href="/" className="flex items-center gap-2.5 mb-5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-light)] flex items-center justify-center shadow-royal">
                <Crown className="h-6 w-6 text-[var(--gold-light)]" strokeWidth={2.2} />
              </div>
              <div className="leading-none">
                <div className="font-display text-2xl font-bold">
                  Imperial<span className="text-gradient-gold">Estates</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/50 mt-1">
                  Luxury Real Estate · Lahore
                </div>
              </div>
            </SafeLink>
            <p className="text-white/60 leading-relaxed text-sm max-w-sm">
              Lahore&apos;s most trusted luxury real estate firm. For over 15 years, we&apos;ve helped families find
              their dream homes and investors grow their wealth across Pakistan&apos;s premier neighborhoods.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Award className="h-4 w-4 text-[var(--gold)]" />
                <span className="text-xs font-semibold">Award-Winning</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <ShieldCheck className="h-4 w-4 text-[var(--emerald-brand)]" />
                <span className="text-xs font-semibold">Verified Listings</span>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-2.5 text-sm">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4 text-[var(--gold)] shrink-0" />
                {COMPANY.address}
              </div>
              <SafeLink href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-[var(--gold)] shrink-0" />
                {COMPANY.phone}
              </SafeLink>
              <SafeLink href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-[var(--gold)] shrink-0" />
                {COMPANY.email}
              </SafeLink>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display font-bold text-[var(--gold-light)] mb-4 text-sm uppercase tracking-wider">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <SafeLink
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                      >
                        <span className="h-px w-0 bg-[var(--gold)] group-hover:w-3 transition-all" />
                        {link.label}
                      </SafeLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Building2 className="h-4 w-4 text-[var(--gold)]" />
            © {new Date().getFullYear()} Imperial Estates Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <SafeLink
                key={s.label}
                href="/contact"
                aria-label={s.label}
                className="h-9 w-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[var(--gold)] hover:text-[var(--ink)] hover:border-[var(--gold)] transition-all"
              >
                <s.icon className="h-4 w-4" />
              </SafeLink>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-white/40">
            <SafeLink href="/about" className="hover:text-white/70 transition-colors">Privacy Policy</SafeLink>
            <span className="h-3 w-px bg-white/15" />
            <SafeLink href="/about" className="hover:text-white/70 transition-colors">Terms of Service</SafeLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
