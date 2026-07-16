"use client";

import SafeLink from "@/components/ui/safe-link";


import { motion } from "framer-motion";
import { TrendingUp, Calendar, Wallet, ArrowUpRight, PieChart, LineChart, ShieldCheck } from "lucide-react";
import { investments } from "@/lib/real-estate-data";

export default function Investment() {
  return (
    <section id="invest" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Decorative chart background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path d="M0,500 L100,420 L200,460 L300,340 L400,380 L500,260 L600,300 L700,180 L800,220 L900,120 L1000,160 L1100,80 L1200,100" stroke="#1e3a8a" strokeWidth="2" fill="none" />
          <path d="M0,500 L100,420 L200,460 L300,340 L400,380 L500,260 L600,300 L700,180 L800,220 L900,120 L1000,160 L1100,80 L1200,100 L1200,600 L0,600 Z" fill="url(#chartfill)" />
          <defs>
            <linearGradient id="chartfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

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
              <PieChart className="h-4 w-4 text-[var(--emerald-brand)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--emerald-deep)]">
                Smart Investments
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Grow Your Wealth with{" "}
              <span className="text-gradient-royal">Premium Real Estate</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-3"
          >
            <Badge icon={<LineChart className="h-4 w-4" />} label="Avg. ROI" value="22-34%" />
            <Badge icon={<ShieldCheck className="h-4 w-4" />} label="Risk Profile" value="Low-Medium" />
            <Badge icon={<Calendar className="h-4 w-4" />} label="Horizon" value="18-36 mo" />
          </motion.div>
        </div>

        {/* Investment cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {investments.map((inv, i) => (
            <motion.div
              key={inv.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-luxe hover:shadow-luxe-lg transition-all"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img src={inv.image} alt={inv.title} className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {/* ROI badge */}
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[var(--emerald-brand)]/30 blur-xl rounded-full" />
                    <div className="relative bg-white rounded-2xl px-4 py-2.5 text-center shadow-luxe">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Expected ROI</div>
                      <div className="font-display text-2xl font-bold text-gradient-royal flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-[var(--emerald-brand)]" />
                        {inv.roi}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="px-3 py-1 rounded-full glass text-[11px] font-bold uppercase tracking-wider text-white">
                    {inv.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-[var(--ink)] group-hover:text-[var(--royal)] transition-colors">
                  {inv.title}
                </h3>
                <p className="text-sm text-[var(--ink)]/65 mt-2 leading-relaxed min-h-[60px]">
                  {inv.desc}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-border">
                  <Stat icon={<Calendar className="h-4 w-4" />} label="Horizon" value={inv.horizon} />
                  <Stat icon={<Wallet className="h-4 w-4" />} label="Min. Invest" value={inv.minInvest} />
                  <Stat icon={<TrendingUp className="h-4 w-4" />} label="Growth" value={inv.appreciation} />
                </div>

                {/* CTA */}
                <SafeLink href="/invest" className="mt-5 w-full btn-royal py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                  Invest Now <ArrowUpRight className="h-4 w-4" />
                </SafeLink>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-[var(--muted-foreground)]"
        >
          <ShieldCheck className="h-4 w-4 text-[var(--emerald-brand)]" />
          All opportunities are vetted by our investment advisory team. Past performance does not guarantee future returns.
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-luxe-soft border border-border/60">
      <div className="h-9 w-9 rounded-xl bg-white shadow-luxe flex items-center justify-center text-[var(--royal)]">{icon}</div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">{label}</div>
        <div className="font-bold text-[var(--ink)] text-sm">{value}</div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center text-[var(--royal)] mb-1">{icon}</div>
      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">{label}</div>
      <div className="text-xs font-bold text-[var(--ink)]">{value}</div>
    </div>
  );
}
