"use client";

import SafeLink from "@/components/ui/safe-link";


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Navigation, Layers, Plus, Minus, Compass } from "lucide-react";
import { properties } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

export default function PropertyMap() {
  const [active, setActive] = useState(properties[0]);

  return (
    <section className="relative py-24 lg:py-32 bg-royal-tint overflow-hidden">
      <div className="absolute inset-0 bg-grid-luxe opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Navigation className="h-4 w-4 text-[var(--gold)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
              Explore Lahore Live
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
            Find Properties on the <span className="text-gradient-royal">Interactive Map</span>
          </h2>
          <p className="mt-4 text-[var(--ink)]/65 text-lg">
            Hover any pin to preview a listing. Every neighborhood, every opportunity — mapped in real time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] overflow-hidden shadow-luxe-lg h-[520px] bg-white"
          >
            {/* Stylized map background */}
            <div className="absolute inset-0 bg-mesh-royal" />
            <div className="absolute inset-0 bg-dots-luxe opacity-50" />

            {/* Fake roads */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,30 Q30,28 50,35 T100,32" stroke="rgba(30,58,138,0.12)" strokeWidth="0.8" fill="none" />
              <path d="M0,70 Q40,65 60,72 T100,68" stroke="rgba(30,58,138,0.12)" strokeWidth="0.8" fill="none" />
              <path d="M20,0 Q22,30 28,50 T34,100" stroke="rgba(30,58,138,0.10)" strokeWidth="0.6" fill="none" />
              <path d="M70,0 Q68,40 74,60 T80,100" stroke="rgba(30,58,138,0.10)" strokeWidth="0.6" fill="none" />
              <path d="M0,50 L100,48" stroke="rgba(4,120,87,0.10)" strokeWidth="1.2" fill="none" />
              <circle cx="50" cy="50" r="18" fill="rgba(4,120,87,0.05)" />
              <circle cx="28" cy="35" r="10" fill="rgba(201,162,75,0.06)" />
            </svg>

            {/* Area labels */}
            <span className="absolute top-[26%] left-[18%] text-[11px] font-bold uppercase tracking-wider text-[var(--royal)]/50">DHA</span>
            <span className="absolute top-[54%] left-[42%] text-[11px] font-bold uppercase tracking-wider text-[var(--emerald-brand)]/50">Gulberg</span>
            <span className="absolute top-[60%] left-[64%] text-[11px] font-bold uppercase tracking-wider text-[var(--gold-deep)]/50">Bahria</span>
            <span className="absolute top-[68%] left-[36%] text-[11px] font-bold uppercase tracking-wider text-[var(--royal)]/40">Lake City</span>

            {/* Pins */}
            {properties.map((p) => {
              const isActive = active.id === p.id;
              return (
                <button
                  key={p.id}
                  onMouseEnter={() => setActive(p)}
                  onClick={() => setActive(p)}
                  style={{ left: `${p.coordinates.x}%`, top: `${p.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-full z-20 group"
                >
                  <div className="relative flex flex-col items-center">
                    {isActive && (
                      <div className="mb-1 px-2.5 py-1 rounded-lg bg-[var(--ink)] text-white text-[10px] font-semibold whitespace-nowrap shadow-luxe">
                        {p.price}
                      </div>
                    )}
                    <span className="relative flex h-9 w-9 items-center justify-center">
                      {isActive && (
                        <span className="absolute inline-flex h-9 w-9 rounded-full bg-[var(--royal)]/40 animate-pulse-ring" />
                      )}
                      <span
                        className={cn(
                          "relative flex h-9 w-9 rounded-full items-center justify-center shadow-lg transition-all",
                          isActive
                            ? "bg-gradient-to-br from-[var(--royal)] to-[var(--royal-light)] scale-110"
                            : "bg-white border-2 border-[var(--royal)]/30 group-hover:border-[var(--royal)]"
                        )}
                      >
                        <MapPin className={cn("h-4 w-4", isActive ? "text-white" : "text-[var(--royal)]")} fill={isActive ? "currentColor" : "none"} />
                      </span>
                    </span>
                    <span className={cn("w-0.5 h-3", isActive ? "bg-[var(--royal)]" : "bg-[var(--royal)]/40")} />
                  </div>
                </button>
              );
            })}

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="h-9 w-9 rounded-lg glass shadow-luxe flex items-center justify-center text-[var(--royal)] hover:bg-white"><Plus className="h-4 w-4" /></button>
              <button className="h-9 w-9 rounded-lg glass shadow-luxe flex items-center justify-center text-[var(--royal)] hover:bg-white"><Minus className="h-4 w-4" /></button>
              <button className="h-9 w-9 rounded-lg glass shadow-luxe flex items-center justify-center text-[var(--royal)] hover:bg-white"><Compass className="h-4 w-4" /></button>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg glass shadow-luxe text-xs font-semibold text-[var(--ink)]">
              <Layers className="h-3.5 w-3.5 text-[var(--royal)]" />
              {properties.length} Premium Listings
            </div>
          </motion.div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-[2rem] bg-white shadow-luxe-lg overflow-hidden flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-white/90 text-xs mb-1">
                      <MapPin className="h-3.5 w-3.5 text-[var(--gold-light)]" /> {active.location}
                    </div>
                    <h3 className="text-white font-display text-xl font-bold">{active.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-sm text-[var(--ink)]/70 pb-4 border-b border-border">
                    <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-[var(--royal)]" /> {active.beds}</span>
                    <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-[var(--royal)]" /> {active.baths}</span>
                    <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-[var(--royal)]" /> {active.area}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Price</div>
                      <div className="text-2xl font-bold text-gradient-royal">{active.price}</div>
                    </div>
                    <SafeLink href={`/properties/${active.slug}`} className="btn-royal px-4 py-2.5 rounded-xl text-sm font-semibold">View Details</SafeLink>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mini list */}
            <div className="px-5 pb-5 flex-1 overflow-y-auto scroll-luxe max-h-[230px]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                Other Listings
              </div>
              <div className="space-y-1.5">
                {properties.filter((p) => p.id !== active.id).map((p) => (
                  <SafeLink
                    key={p.id}
                    href={`/properties/${p.slug}`}
                    onMouseEnter={() => setActive(p)}
                    onClick={() => setActive(p)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--royal)]/6 transition-colors text-left group"
                  >
                    <img src={p.image} alt={p.title} className="h-11 w-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[var(--ink)] truncate group-hover:text-[var(--royal)]">{p.title}</div>
                      <div className="text-xs text-[var(--muted-foreground)] truncate">{p.location}</div>
                    </div>
                    <div className="text-xs font-bold text-[var(--royal)]">{p.price}</div>
                  </SafeLink>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
