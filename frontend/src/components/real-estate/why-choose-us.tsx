"use client";

import { motion } from "framer-motion";
import { Award, Users, Trophy, TrendingUp, CheckCircle2, ShieldCheck, Gem, Clock } from "lucide-react";
import { whyChooseUs } from "@/lib/real-estate-data";

const advantages = [
  { icon: Gem, title: "Curated Luxury", desc: "Only top 5% of listings make our portfolio" },
  { icon: ShieldCheck, title: "Legal Peace of Mind", desc: "In-house experts verify every document" },
  { icon: Clock, title: "15 Years Local Mastery", desc: "Deep roots across every Lahore society" },
  { icon: Users, title: "Dedicated Advisor", desc: "One specialist from first call to handover" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[var(--gold)]/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: sticky visual + advantages */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-10 bg-[var(--emerald-brand)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--emerald-deep)]">
                  Why Imperial Estates
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
                A Legacy Built on{" "}
                <span className="relative">
                  <span className="text-gradient-gold">Trust</span>
                </span>{" "}
                &amp; Excellence
              </h2>
              <p className="mt-4 text-[var(--ink)]/65 text-lg">
                For over 15 years, Lahore&apos;s most discerning families have chosen us to guide their most important property decisions. Here&apos;s our journey.
              </p>
            </motion.div>

            {/* Advantages grid */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {advantages.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative rounded-2xl p-5 bg-luxe-soft border border-border/60 hover:border-[var(--royal)]/30 hover:shadow-luxe transition-all"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-light)] flex items-center justify-center text-white mb-3 shadow-royal group-hover:scale-110 transition-transform">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display font-bold text-[var(--ink)]">{a.title}</div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-1">{a.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--royal)] via-[var(--gold)] to-[var(--emerald-brand)] opacity-30" />

            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative pl-20 pb-12 last:pb-0"
              >
                {/* Node */}
                <div className="absolute left-0 top-0 h-14 w-14 rounded-2xl bg-white shadow-luxe border-2 border-[var(--royal)]/15 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-light)] flex items-center justify-center text-white font-display font-bold text-sm">
                    {i + 1}
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-border/60 p-6 shadow-luxe hover:shadow-luxe-lg transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-2xl font-bold text-gradient-gold">{item.year}</span>
                    {i === 2 && <Trophy className="h-5 w-5 text-[var(--gold)]" />}
                    {i === 3 && <TrendingUp className="h-5 w-5 text-[var(--emerald-brand)]" />}
                    {i === 0 && <Award className="h-5 w-5 text-[var(--royal)]" />}
                    {i === 1 && <Users className="h-5 w-5 text-[var(--royal)]" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--ink)] group-hover:text-[var(--royal)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[var(--ink)]/65 mt-2 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--emerald-brand)]">
                    <CheckCircle2 className="h-4 w-4" />
                    Milestone achieved
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
