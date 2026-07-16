"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareHeart } from "lucide-react";
import { testimonials } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  const active = testimonials[index];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[var(--ink)]">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--royal)]/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[var(--gold)]/15 blur-3xl" />
      <div className="absolute inset-0 bg-dots-luxe opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <MessageSquareHeart className="h-4 w-4 text-[var(--gold-light)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-light)]">
                Client Stories
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Loved by Lahore&apos;s <span className="text-gradient-gold">Finest Families</span>
            </h2>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir * -60, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[2rem] glass-dark p-8 lg:p-12 text-center"
            >
              <Quote className="h-12 w-12 text-[var(--gold-light)]/40 mx-auto mb-6" fill="currentColor" />
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>
              <p className="font-display text-xl lg:text-2xl font-medium text-white/90 leading-relaxed text-balance">
                &ldquo;{active.quote}&rdquo;
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-[var(--gold)]/30 blur-lg rounded-full" />
                  <img
                    src={active.image}
                    alt={active.name}
                    className="relative h-14 w-14 rounded-full object-cover ring-2 ring-[var(--gold)]/50"
                  />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-white">{active.name}</div>
                  <div className="text-sm text-[var(--gold-light)]">{active.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="h-12 w-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/15 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-8 bg-[var(--gold)]" : "w-2 bg-white/25 hover:bg-white/40"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="h-12 w-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/15 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mini avatar row */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "h-10 w-10 rounded-full overflow-hidden ring-2 transition-all",
                i === index ? "ring-[var(--gold)] scale-110" : "ring-white/15 opacity-50 hover:opacity-100"
              )}
            >
              <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
