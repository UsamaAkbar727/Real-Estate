"use client";

import SafeLink from "@/components/ui/safe-link";


import { motion } from "framer-motion";
import { ArrowUpRight, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { categories } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

const accentMap: Record<string, { ring: string; chip: string; text: string }> = {
  royal: { ring: "group-hover:border-[var(--royal)]/40", chip: "bg-[var(--royal)]/90", text: "text-[var(--royal)]" },
  emerald: { ring: "group-hover:border-[var(--emerald-brand)]/40", chip: "bg-[var(--emerald-brand)]/90", text: "text-[var(--emerald-brand)]" },
  gold: { ring: "group-hover:border-[var(--gold)]/50", chip: "bg-[var(--gold)]/95", text: "text-[var(--gold-deep)]" },
};

export default function Categories() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section className="relative py-24 lg:py-32 bg-emerald-tint overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--emerald-brand)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--emerald-deep)]">
                Browse by Category
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Explore Property <span className="text-gradient-royal">Categories</span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              className="h-12 w-12 rounded-full bg-white shadow-luxe flex items-center justify-center text-[var(--royal)] hover:bg-[var(--royal)] hover:text-white transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="h-12 w-12 rounded-full bg-white shadow-luxe flex items-center justify-center text-[var(--royal)] hover:bg-[var(--royal)] hover:text-white transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroller */}
        <div
          ref={scroller}
          className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory -mx-6 px-6"
        >
          {categories.map((c, i) => {
            const a = accentMap[c.accent] ?? accentMap.royal;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group snap-start shrink-0 w-[300px] sm:w-[340px] relative rounded-[1.75rem] overflow-hidden shadow-luxe hover:shadow-luxe-lg transition-all cursor-pointer border border-transparent"
              >
                <SafeLink href={`/properties?category=${encodeURIComponent(c.slug === "plot" ? "Plot" : c.name.replace("Residential ", "").replace("Luxury ", "").replace(" & Files", ""))}`} className="absolute inset-0 z-10" aria-label={c.name} />
                <div className="relative h-[420px] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-all group-hover:from-black/90" />

                  {/* Top chip */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className={cn("px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md", a.chip, "text-white")}>
                      {c.count} Listings
                    </span>
                    <div className="h-10 w-10 rounded-full glass flex items-center justify-center text-white group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)] transition-colors">
                      <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="h-9 w-9 rounded-lg glass flex items-center justify-center mb-3">
                      <Building2 className="h-4 w-4 text-[var(--gold-light)]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-tight">{c.name}</h3>
                    <p className="text-sm text-white/0 max-h-0 overflow-hidden group-hover:text-white/80 group-hover:max-h-20 transition-all duration-500 mt-0 group-hover:mt-2">
                      {c.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--gold-light)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse {c.name} <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* End CTA card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="snap-start shrink-0 w-[300px] sm:w-[340px] rounded-[1.75rem] bg-gradient-to-br from-[var(--royal)] to-[var(--royal-deep)] p-8 flex flex-col justify-center items-center text-center text-white shadow-luxe"
          >
            <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
              <Building2 className="h-7 w-7 text-[var(--gold-light)]" />
            </div>
            <h3 className="font-display text-2xl font-bold">Can&apos;t find it?</h3>
            <p className="text-white/75 text-sm mt-2 mb-5">
              Tell us your dream and we&apos;ll find it — even off-market.
            </p>
            <button className="btn-gold px-5 py-2.5 rounded-full text-sm font-semibold">
              Request a Property
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
