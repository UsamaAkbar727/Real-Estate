"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Home, Award, Smile, Coins } from "lucide-react";
import { stats } from "@/lib/real-estate-data";

const icons = [Home, Award, Smile, Coins];
const accents = [
  { text: "text-gradient-royal", icon: "text-[var(--royal)]", bg: "bg-[var(--royal)]/8" },
  { text: "text-gradient-gold", icon: "text-[var(--gold-deep)]", bg: "bg-[var(--gold)]/12" },
  { text: "text-[var(--emerald-brand)]", icon: "text-[var(--emerald-brand)]", bg: "bg-[var(--emerald-brand)]/8" },
  { text: "text-gradient-royal", icon: "text-[var(--royal)]", bg: "bg-[var(--royal)]/8" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/skyline.png"
          alt="Lahore skyline"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/92 to-[var(--royal-deep)]/85" />
        <div className="absolute inset-0 bg-dots-luxe opacity-[0.05]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-10 bg-[var(--gold)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
              By the Numbers
            </span>
            <span className="h-px w-10 bg-[var(--gold)]" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
            A Track Record That <span className="text-gradient-gold">Speaks</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = icons[i];
            const a = accents[i];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-3xl glass-dark p-6 lg:p-8 text-center group hover:bg-white/10 transition-colors"
              >
                <div className={`h-14 w-14 rounded-2xl ${a.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-7 w-7 ${a.icon}`} />
                </div>
                <div className={`font-display text-4xl lg:text-5xl font-bold ${a.text}`}>
                  {inView && <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />}
                </div>
                <div className="text-sm text-white/70 mt-2 font-medium">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const formatted = Math.floor(latest).toLocaleString("en-US");
        setDisplay(formatted);
      },
    });
    return () => controls.stop();
  }, [value, count]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
