"use client";

import SafeLink from "@/components/ui/safe-link";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  TrendingUp,
  MapPin,
  Building2,
  ShieldCheck,
  Banknote,
  Globe2,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  ChevronRight,
  Target,
} from "lucide-react";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import Reveal from "@/components/real-estate/reveal";
import { investments, blogs } from "@/lib/real-estate-data";

const whyInvest = [
  {
    icon: TrendingUp,
    title: "Consistent 20%+ Annual Appreciation",
    desc: "Lahore's prime neighbourhoods have delivered double-digit appreciation for over a decade, outpacing inflation and the stock market.",
    accent: "royal",
  },
  {
    icon: Building2,
    title: "Booming Infrastructure",
    desc: "Ring Road extensions, the Orange Line, and new interchanges are unlocking value in Phase 9 Prism, Bahria, and Lake City.",
    accent: "emerald",
  },
  {
    icon: Globe2,
    title: "NRP-Friendly Environment",
    desc: "Overseas Pakistanis can now transact digitally with Roshan Accounts, making cross-border investment seamless and secure.",
    accent: "gold",
  },
  {
    icon: ShieldCheck,
    title: "Tangible, Protected Assets",
    desc: "Real estate in LDA-approved societies offers hard-asset security with transparent, registry-backed ownership.",
    accent: "royal",
  },
  {
    icon: Banknote,
    title: "Stable Rental Yields",
    desc: "Premium apartments and commercial plazas generate 5–8% annual rental income, double the regional average.",
    accent: "emerald",
  },
  {
    icon: Briefcase,
    title: "Diversified Asset Classes",
    desc: "From pre-launch files to commercial boulevards, Lahore offers entry points for every budget and risk profile.",
    accent: "gold",
  },
];

// Parse "PKR 1.5 Cr" / "PKR 80 Lakh" / "PKR 3 Cr" -> number
function parseAmount(str: string): number {
  const cleaned = str.toLowerCase().replace(/pkr\s*/, "").trim();
  const crMatch = cleaned.match(/([\d.]+)\s*cr/);
  const lakhMatch = cleaned.match(/([\d.]+)\s*lakh/);
  if (crMatch) return parseFloat(crMatch[1]) * 10_000_000;
  if (lakhMatch) return parseFloat(lakhMatch[1]) * 100_000;
  return 1_000_000;
}

// Format a PKR number back to "PKR X.X Cr" or "PKR X Lakh"
function formatPKR(amount: number): string {
  if (amount >= 10_000_000) {
    return `PKR ${(amount / 10_000_000).toFixed(2)} Cr`;
  }
  if (amount >= 100_000) {
    return `PKR ${Math.round(amount / 100_000)} Lakh`;
  }
  return `PKR ${Math.round(amount).toLocaleString()}`;
}

export default function InvestPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = investments[selectedIdx];
  const roiPct = useMemo(() => parseFloat(selected.roi.replace("%", "")) || 0, [selected]);
  const horizonMonths = useMemo(() => {
    const m = selected.horizon.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 24;
  }, [selected]);

  const minAmount = useMemo(() => parseAmount(selected.minInvest), [selected]);
  const [amount, setAmount] = useState<number>(minAmount);

  // Sync amount to selected opportunity's minimum when opportunity changes
  const currentMin = minAmount;
  const effectiveAmount = Math.max(amount, currentMin);
  const projectedProfit = (effectiveAmount * roiPct) / 100;
  const projectedTotal = effectiveAmount + projectedProfit;
  const monthlyProfit = projectedProfit / horizonMonths;

  return (
    <SiteShell>
      <PageHero
        eyebrow="Smart Investments"
        title="Grow Your Wealth with"
        titleAccent="Lahore Real Estate"
        subtitle="Data-driven investment advisory across Lahore's highest-appreciating corridors — from DHA Phase 9 Prism to Gulberg Greens commercial boulevards."
        crumbs={[{ label: "Invest" }]}
        background="/images/interior_living.png"
      />

      {/* Investment Opportunities */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--emerald-brand)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Hand-Picked Opportunities
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Active{" "}
              <span className="text-gradient-royal">Investment Plays</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Three live opportunities our advisory team is recommending right now — each with full due-diligence attached.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {investments.map((inv, i) => (
              <Reveal key={inv.slug} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg overflow-hidden border border-border/60 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={inv.image}
                      alt={inv.title}
                      className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/85 via-[var(--ink)]/30 to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[var(--emerald-brand)] text-white text-xs font-bold shadow-luxe">
                      ROI {inv.roi}
                    </div>
                    <div className="absolute bottom-4 left-5 right-5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)] mb-1">
                        {inv.type}
                      </div>
                      <h3 className="font-display text-xl font-bold text-white leading-tight">
                        {inv.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-[var(--ink)]/65 leading-relaxed mb-5">
                      {inv.desc}
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-5 pt-5 border-t border-border">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">Min Invest</div>
                        <div className="text-sm font-bold text-[var(--ink)] mt-1">{inv.minInvest}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">Horizon</div>
                        <div className="text-sm font-bold text-[var(--ink)] mt-1">{inv.horizon}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">Appreciation</div>
                        <div className="text-sm font-bold text-[var(--emerald-brand)] mt-1">{inv.appreciation}</div>
                      </div>
                    </div>
                    <SafeLink
                      href="/contact"
                      className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--ink)] text-white text-xs font-bold hover:bg-[var(--royal)] transition-colors"
                    >
                      Request Prospectus <ArrowUpRight className="h-3.5 w-3.5" />
                    </SafeLink>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest in Lahore */}
      <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[var(--royal)]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                The Lahore Story
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Why Smart Capital Is{" "}
              <span className="text-gradient-royal">Flowing to Lahore</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Six structural forces making Lahore Pakistan's most attractive real estate market for the next decade.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyInvest.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-3xl bg-white shadow-luxe hover:shadow-luxe-lg p-7"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 ${
                      w.accent === "royal"
                        ? "bg-[var(--royal)]/10 text-[var(--royal)]"
                        : w.accent === "emerald"
                        ? "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]"
                        : "bg-[var(--gold)]/15 text-[var(--gold-deep)]"
                    }`}
                  >
                    <w.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                    {w.title}
                  </h3>
                  <p className="text-sm text-[var(--ink)]/65 leading-relaxed">
                    {w.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--gold)]/8 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Calculator className="h-4 w-4 text-[var(--gold-deep)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Live Projection Tool
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Project Your{" "}
              <span className="text-gradient-gold">Returns</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Adjust your capital and pick an opportunity to see projected profit over the holding horizon.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-white shadow-luxe-lg overflow-hidden border border-border/60">
              <div className="grid lg:grid-cols-[1fr_1.1fr]">
                {/* Inputs */}
                <div className="p-7 lg:p-10 bg-luxe-soft">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3 block">
                    Choose an Opportunity
                  </label>
                  <div className="space-y-2 mb-7">
                    {investments.map((inv, idx) => (
                      <button
                        key={inv.slug}
                        onClick={() => {
                          setSelectedIdx(idx);
                          setAmount(parseAmount(inv.minInvest));
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          selectedIdx === idx
                            ? "border-[var(--royal)] bg-white shadow-luxe"
                            : "border-border bg-white/60 hover:bg-white"
                        }`}
                      >
                        <div>
                          <div className="font-display text-sm font-bold text-[var(--ink)]">{inv.title}</div>
                          <div className="text-xs text-[var(--muted-foreground)]">{inv.type} • {inv.horizon}</div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          selectedIdx === idx
                            ? "bg-[var(--emerald-brand)] text-white"
                            : "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]"
                        }`}>
                          {inv.roi}
                        </span>
                      </button>
                    ))}
                  </div>

                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3 block">
                    Investment Amount (PKR)
                  </label>
                  <div className="relative mb-3">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--muted-foreground)]">PKR</span>
                    <input
                      type="number"
                      value={amount}
                      min={currentMin}
                      step={100000}
                      onChange={(e) => setAmount(Math.max(currentMin, Number(e.target.value)))}
                      className="w-full pl-14 pr-4 py-3.5 rounded-xl border border-border bg-white text-sm font-bold text-[var(--ink)] focus:outline-none focus:border-[var(--royal)] transition-colors"
                    />
                  </div>
                  <input
                    type="range"
                    min={currentMin}
                    max={currentMin * 10}
                    step={100000}
                    value={Math.min(amount, currentMin * 10)}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[var(--royal)]"
                  />
                  <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mt-2">
                    <span>Min: {formatPKR(currentMin)}</span>
                    <span>Max: {formatPKR(currentMin * 10)}</span>
                  </div>
                  <div className="mt-3 text-xs text-[var(--muted-foreground)]">
                    Selected opportunity minimum: <span className="font-semibold text-[var(--ink)]">{selected.minInvest}</span>
                  </div>
                </div>

                {/* Results */}
                <div className="p-7 lg:p-10 bg-[var(--ink)] text-white relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[var(--gold)]/15 blur-3xl" />
                  <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[var(--royal)]/30 blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-[var(--gold)]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                        Projected Outcome
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-1">{selected.title}</h3>
                    <p className="text-white/60 text-sm mb-8">
                      Over a {horizonMonths}-month horizon at {roiPct}% projected ROI
                    </p>

                    <div className="space-y-5">
                      <div className="glass-dark rounded-2xl p-5">
                        <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Your Investment</div>
                        <div className="font-display text-2xl font-bold">{formatPKR(effectiveAmount)}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass-dark rounded-2xl p-5">
                          <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Projected Profit</div>
                          <div className="font-display text-xl font-bold text-[var(--gold-light)]">
                            +{formatPKR(projectedProfit)}
                          </div>
                        </div>
                        <div className="glass-dark rounded-2xl p-5">
                          <div className="text-xs uppercase tracking-wider text-white/60 mb-1">Monthly Avg.</div>
                          <div className="font-display text-xl font-bold text-white">
                            {formatPKR(monthlyProfit)}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl p-5 bg-gradient-to-r from-[var(--royal)] to-[var(--emerald-brand)]">
                        <div className="text-xs uppercase tracking-wider text-white/80 mb-1">Total Value at Exit</div>
                        <div className="font-display text-3xl font-bold text-white">
                          {formatPKR(projectedTotal)}
                        </div>
                      </div>
                    </div>

                    <SafeLink
                      href="/contact"
                      className="mt-7 w-full btn-gold py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                    >
                      Talk to an Advisor <ArrowRight className="h-4 w-4" />
                    </SafeLink>
                    <p className="text-[10px] text-white/50 text-center mt-3">
                      Projections are illustrative based on historical trends. Real estate carries inherent risk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Market Insights Teaser */}
      <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-10 bg-[var(--gold)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                  Market Intelligence
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
                Insights From Our{" "}
                <span className="text-gradient-royal">Advisory Desk</span>
              </h2>
            </div>
            <SafeLink
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--ink)] text-white text-sm font-semibold hover:bg-[var(--royal)] transition-colors w-fit"
            >
              Read All Insights <ArrowRight className="h-4 w-4" />
            </SafeLink>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.1}>
                <SafeLink
                  href={`/blog/${b.slug}`}
                  className="group block rounded-3xl overflow-hidden bg-white shadow-luxe hover:shadow-luxe-lg lift"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-semibold text-[var(--ink)]">
                      {b.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-3">
                      <span>{b.date}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--muted-foreground)]" />
                      <span>{b.read}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[var(--ink)] leading-tight group-hover:text-[var(--royal)] transition-colors mb-3">
                      {b.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--royal)] group-hover:gap-2 transition-all">
                      Read Article <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </SafeLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0 bg-grid-luxe opacity-20" />
        <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-[var(--emerald-brand)]/25 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-[var(--gold)]/20 blur-3xl animate-float-slower" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <MapPin className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                Your Portfolio Starts Here
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Build a Real Estate Portfolio{" "}
              <span className="text-gradient-gold">That Outperforms</span>
            </h2>
            <p className="mt-5 text-white/70 text-lg max-w-2xl mx-auto">
              Book a free advisory session with our investment team and get a customised opportunity map for your capital.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SafeLink
                href="/contact"
                className="btn-gold px-8 py-4 rounded-full text-sm font-bold inline-flex items-center gap-2"
              >
                Book Advisory Session <ArrowRight className="h-4 w-4" />
              </SafeLink>
              <SafeLink
                href="/properties"
                className="px-8 py-4 rounded-full text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                Browse Investment Listings
              </SafeLink>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
