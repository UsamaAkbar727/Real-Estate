"use client";

import SafeLink from "@/components/ui/safe-link";
import { useState, useEffect } from "react";


import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Heart,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { properties } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  Signature: "bg-[var(--royal)] text-white",
  New: "bg-[var(--emerald-brand)] text-white",
  "Hot Deal": "bg-[var(--gold)] text-[var(--ink)]",
  Exclusive: "bg-[var(--ink)] text-[var(--gold-light)]",
  Waterfront: "bg-[var(--royal-light)] text-white",
  Investment: "bg-[var(--emerald-deep)] text-white",
};

export default function FeaturedProperties() {
  const [dbProperties, setDbProperties] = useState<any[]>(properties);

  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.properties.length > 0) {
          setDbProperties(data.properties);
        }
      })
      .catch((err) => console.error("Error loading featured properties:", err));
  }, []);

  const [feature, ...rest] = dbProperties.length > 0 ? dbProperties : properties;
  return (
    <section id="properties" className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
      <div className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-[var(--gold)]/8 blur-3xl" />
      <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-[var(--royal)]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Handpicked Collection
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight max-w-2xl">
              Featured <span className="text-gradient-royal">Signature Properties</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg max-w-xl">
              A curated selection of Lahore&apos;s most extraordinary homes — each vetted by our experts for excellence in location, design, and value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SafeLink
              href="/properties"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--royal)]/20 text-[var(--royal)] font-semibold hover:bg-[var(--royal)] hover:text-white hover:border-[var(--royal)] transition-all w-fit"
            >
              View All Properties
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
            </SafeLink>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large feature card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 lg:row-span-2 group relative rounded-[2rem] overflow-hidden shadow-luxe-lg lift cursor-pointer min-h-[420px] lg:min-h-[600px]"
          >
            <SafeLink href={`/properties/${feature.slug}`} className="absolute inset-0 z-10" aria-label={feature.title} />
            <img
              src={feature.image}
              alt={feature.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-5 left-5 flex items-center gap-2">
              {feature.tag && (
                <span className={cn("px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider", tagStyles[feature.tag])}>
                  {feature.tag}
                </span>
              )}
              <span className="px-3 py-1.5 rounded-full glass text-xs font-semibold text-[var(--ink)]">For {feature.type}</span>
            </div>
            <button className="absolute top-5 right-5 h-10 w-10 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors">
              <Heart className="h-4 w-4" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <MapPin className="h-4 w-4 text-[var(--gold-light)]" />
                {feature.location}
              </div>
              <h3 className="font-display text-3xl font-bold leading-tight mb-3">{feature.title}</h3>
              <div className="flex items-center gap-5 text-sm text-white/90 mb-4">
                <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-[var(--gold-light)]" /> {feature.beds} Beds</span>
                <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-[var(--gold-light)]" /> {feature.baths} Baths</span>
                <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-[var(--gold-light)]" /> {feature.area}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">Starting from</div>
                  <div className="text-2xl font-bold text-[var(--gold-light)]">{feature.price}</div>
                </div>
                <button className="btn-gold px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2">
                  View Details <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Smaller cards */}
          {rest.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[1.75rem] overflow-hidden shadow-luxe lift bg-white cursor-pointer"
            >
              <SafeLink href={`/properties/${p.slug}`} className="absolute inset-0 z-10" aria-label={p.title} />
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {p.tag && (
                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", tagStyles[p.tag])}>
                      {p.tag}
                    </span>
                  )}
                </div>
                <button className="absolute top-4 right-4 h-9 w-9 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors">
                  <Heart className="h-3.5 w-3.5" />
                </button>
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[var(--royal)]" /> {p.location}
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--ink)] leading-tight group-hover:text-[var(--royal)] transition-colors">
                  {p.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[var(--ink)]/65 mt-3">
                  <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5 text-[var(--royal)]" /> {p.beds}</span>
                  <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-[var(--royal)]" /> {p.baths}</span>
                  <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-[var(--royal)]" /> {p.area}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="text-lg font-bold text-gradient-royal">{p.price}</div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[var(--royal)] group-hover:gap-2 transition-all">
                    Details <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
