"use client";

import SafeLink from "@/components/ui/safe-link";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  ChevronDown,
  ArrowRight,
  Play,
  Star,
  ShieldCheck,
  Award,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["Buy", "Rent", "Invest", "New Projects"];
const areas = ["DHA Lahore", "Bahria Town", "Gulberg", "Lake City", "Park View"];
const types = ["Villa", "Apartment", "Penthouse", "Plot", "Farmhouse"];

export default function Hero() {
  const [tab, setTab] = useState("Buy");
  const [area, setArea] = useState("DHA Lahore");
  const [type, setType] = useState("Villa");
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 120]);
  const scaleBg = useTransform(scrollY, [0, 600], [1, 1.12]);
  const yContent = useTransform(scrollY, [0, 500], [0, 40]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-luxe-soft">
      {/* Background image with parallax */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/villa_exterior_1.png"
          alt="Luxury villa in Lahore"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
      </motion.div>

      {/* Decorative floating shapes */}
      <div className="absolute top-32 right-10 w-72 h-72 rounded-full bg-[var(--gold)]/10 blur-3xl animate-float-slow z-0" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[var(--royal)]/10 blur-3xl animate-float-slower z-0" />

      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 pt-12 lg:pt-16 pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
          {/* Left: copy + search */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-luxe mb-6"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--emerald-brand)] opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--emerald-brand)]" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink)]">
                #1 Trusted Luxury Real Estate in Lahore
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[2.6rem] sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-[var(--ink)] text-balance"
            >
              Find Your{" "}
              <span className="relative inline-block">
                <span className="text-gradient-royal">Dream Address</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 9C60 3 150 3 298 7"
                    stroke="url(#underline)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                  <defs>
                    <linearGradient id="underline" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="#c9a24b" />
                      <stop offset="1" stopColor="#047857" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              in Lahore&apos;s Finest Neighborhoods
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 text-lg text-[var(--ink)]/70 max-w-xl leading-relaxed"
            >
              From signature villas in DHA to sky-penthouses in Bahria Town —
              discover handpicked luxury homes backed by 15 years of award-winning
              expertise and a PKR 42 billion sales legacy.
            </motion.p>

            {/* Search filter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 rounded-3xl glass shadow-luxe-lg p-3 max-w-2xl"
            >
              {/* Tabs */}
              <div className="flex gap-1 p-1 mb-3">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-semibold rounded-xl transition-colors flex-1",
                      tab === t ? "text-white" : "text-[var(--ink)]/70 hover:text-[var(--royal)]"
                    )}
                  >
                    {tab === t && (
                      <motion.span
                        layoutId="heroTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--royal)] to-[var(--royal-light)] shadow-royal"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{t}</span>
                  </button>
                ))}
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_auto] gap-2">
                <FilterField icon={<MapPin className="h-4 w-4" />} label="Location" value={area} options={areas} onChange={setArea} />
                <FilterField icon={<Home className="h-4 w-4" />} label="Property Type" value={type} options={types} onChange={setType} />
                <SafeLink href={`/properties?area=${encodeURIComponent(area)}&category=${encodeURIComponent(type)}`} className="btn-gold rounded-xl px-6 py-3.5 font-semibold text-sm flex items-center justify-center gap-2 sm:self-stretch">
                  <Search className="h-4 w-4" />
                  <span className="lg:hidden xl:inline">Search</span>
                </SafeLink>
              </div>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <TrustItem icon={<Award className="h-5 w-5 text-[var(--gold)]" />} title="Award-Winning" sub="Best Agency 2023" />
              <TrustItem icon={<ShieldCheck className="h-5 w-5 text-[var(--emerald-brand)]" />} title="Verified Listings" sub="100% Legal Clear" />
              <TrustItem icon={<TrendingUp className="h-5 w-5 text-[var(--royal)]" />} title="PKR 42B" sub="Total Sales Value" />
            </motion.div>
          </div>

          {/* Right: floating image stack */}
          <div className="hidden lg:block lg:col-span-5 relative h-[560px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 w-[78%] h-[340px] rounded-[2rem] overflow-hidden shadow-luxe-lg zoom-img"
            >
              <img src="/images/villa_exterior_1.png" alt="Luxury home" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-6 left-0 w-[62%] h-[240px] rounded-[2rem] overflow-hidden shadow-luxe-lg zoom-img"
            >
              <img src="/images/interior_living.png" alt="Luxury interior" className="h-full w-full object-cover" />
            </motion.div>

            {/* Floating price card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute top-1/2 -left-4 glass shadow-luxe-lg rounded-2xl p-4 w-56 animate-float-slow"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[var(--ink)]">4.9</span>
              </div>
              <div className="text-sm font-bold text-[var(--ink)] leading-tight">Royal Garden Villa</div>
              <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" /> DHA Phase 6
              </div>
              <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
                <span className="text-lg font-bold text-gradient-royal">PKR 8.5 Cr</span>
                <ArrowRight className="h-4 w-4 text-[var(--royal)]" />
              </div>
            </motion.div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="absolute bottom-32 right-2 glass shadow-luxe-lg rounded-2xl px-5 py-3 animate-float-slower"
            >
              <div className="text-2xl font-bold font-display text-[var(--emerald-brand)]">4,200+</div>
              <div className="text-xs text-[var(--muted-foreground)]">Happy Families</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom marquee bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[var(--ink)] text-white py-4 overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {["DHA Lahore", "Bahria Town", "Gulberg", "Lake City", "Park View", "Wapda Town", "Bahria Orchard", "State Bank Housing"].map((a) => (
                <span key={a} className="flex items-center gap-3 text-sm font-medium tracking-wide">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  {a}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterField({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative bg-white/70 rounded-xl px-4 py-2.5 hover:bg-white transition-colors">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 w-full text-left"
      >
        <span className="text-[var(--royal)]">{icon}</span>
        <span className="flex-1">
          <span className="block text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
            {label}
          </span>
          <span className="block text-sm font-semibold text-[var(--ink)]">{value}</span>
        </span>
        <ChevronDown className={cn("h-4 w-4 text-[var(--muted-foreground)] transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-0 right-0 mb-2 z-20 bg-white rounded-xl shadow-luxe-lg border border-border py-2 overflow-hidden"
        >
          {options.map((o) => (
            <li key={o}>
              <button
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-[var(--royal)]/8 transition-colors",
                  o === value ? "text-[var(--royal)] font-semibold" : "text-[var(--ink)]/80"
                )}
              >
                {o}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

function TrustItem({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl glass flex items-center justify-center">{icon}</div>
      <div>
        <div className="text-sm font-bold text-[var(--ink)]">{title}</div>
        <div className="text-xs text-[var(--muted-foreground)]">{sub}</div>
      </div>
    </div>
  );
}
