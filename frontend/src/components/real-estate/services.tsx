"use client";

import { motion } from "framer-motion";
import {
  Key,
  Tag,
  TrendingUp,
  Shield,
  Scale,
  Sofa,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { services } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  key: Key,
  tag: Tag,
  trending: TrendingUp,
  shield: Shield,
  scale: Scale,
  sofa: Sofa,
};

const bgImages: Record<string, string> = {
  key: "/images/villa_exterior_1.png",
  tag: "/images/villa_exterior_2.png",
  trending: "/images/skyline.png",
  shield: "/images/interior_living.png",
  scale: "/images/villa_exterior_3.png",
};

const accents = [
  { bg: "from-[var(--royal)] to-[var(--royal-light)]", glow: "bg-[var(--royal)]/10", text: "text-[var(--royal)]" },
  { bg: "from-[var(--emerald-brand)] to-[#10b981]", glow: "bg-[var(--emerald-brand)]/10", text: "text-[var(--emerald-brand)]" },
  { bg: "from-[var(--gold-deep)] to-[var(--gold-light)]", glow: "bg-[var(--gold)]/12", text: "text-[var(--gold-deep)]" },
  { bg: "from-[var(--royal-deep)] to-[var(--royal)]", glow: "bg-[var(--royal)]/10", text: "text-[var(--royal)]" },
  { bg: "from-[var(--emerald-deep)] to-[var(--emerald-brand)]", glow: "bg-[var(--emerald-brand)]/10", text: "text-[var(--emerald-brand)]" },
];

export default function Services() {
  return (
    <section className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--royal)]/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Full-Service Excellence
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight max-w-2xl">
              Everything You Need Under{" "}
              <span className="text-gradient-royal">One Roof</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--ink)]/65 text-lg max-w-md"
          >
            From your first viewing to lifetime asset management, our specialists handle every detail with white-glove precision.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Key;
            const a = accents[i % accents.length];
            const isLarge = i === 0;
            const bgImage = bgImages[s.icon] || "/images/villa_exterior_1.png";
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative rounded-3xl p-7 bg-white border border-slate-100 hover:border-[var(--royal)]/15 shadow-luxe hover:shadow-luxe-lg transition-all overflow-hidden cursor-pointer min-h-[300px]",
                  isLarge && "lg:col-span-2 lg:row-span-2 min-h-[420px]"
                )}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={bgImage}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-[0.06] group-hover:opacity-[0.10]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/30" />
                </div>

                <div className="relative flex flex-col h-full z-10 justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className={cn("h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500", a.bg)}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={cn("font-display text-5xl font-bold opacity-10", a.text)}>
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className={cn("font-display font-bold text-[var(--ink)] mt-5 group-hover:text-[var(--royal)] transition-colors", isLarge ? "text-2xl" : "text-lg")}>
                      {s.title}
                    </h3>
                    <p className={cn("text-[var(--ink)]/65 mt-2 leading-relaxed", isLarge ? "text-base" : "text-sm")}>
                      {s.desc}
                    </p>
                  </div>

                  <div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--royal)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      Learn More <ArrowUpRight className="h-4 w-4" />
                    </div>

                    {isLarge && (
                      <div className="mt-6 pt-6 border-t border-border/60 grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-gradient-royal">98%</div>
                          <div className="text-xs text-[var(--muted-foreground)]">Success Rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gradient-gold">15+</div>
                          <div className="text-xs text-[var(--muted-foreground)]">Years</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-[var(--emerald-brand)]">4.2k</div>
                          <div className="text-xs text-[var(--muted-foreground)]">Deals Closed</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
