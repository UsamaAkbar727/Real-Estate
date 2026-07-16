"use client";

import SafeLink from "@/components/ui/safe-link";


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileCheck, KeyRound, Handshake, ClipboardCheck, Megaphone, UserCheck, FileSignature } from "lucide-react";
import { buyProcess, sellProcess } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

const buyIcons = [Search, FileCheck, KeyRound, Handshake];
const sellIcons = [ClipboardCheck, Megaphone, UserCheck, FileSignature];

export default function Process() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const steps = mode === "buy" ? buyProcess : sellProcess;
  const icons = mode === "buy" ? buyIcons : sellIcons;

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-luxe opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header + toggle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Simple & Transparent
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              How It <span className="text-gradient-royal">Works</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              A clear, four-step journey whether you&apos;re buying your dream home or selling a prized asset.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex p-1.5 rounded-full bg-luxe-soft shadow-luxe mt-8"
          >
            {(["buy", "sell"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "relative px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors",
                  mode === m ? "text-white" : "text-[var(--ink)]/60 hover:text-[var(--royal)]"
                )}
              >
                {mode === m && (
                  <motion.span
                    layoutId="processToggle"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--royal)] to-[var(--royal-light)] shadow-royal"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{m === "buy" ? "Buying" : "Selling"}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[var(--royal)]/20 via-[var(--gold)]/40 to-[var(--emerald-brand)]/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {steps.map((step, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative"
                  >
                    {/* Node */}
                    <div className="relative flex justify-center mb-6">
                      <div className="relative h-16 w-16 rounded-2xl bg-white shadow-luxe border-2 border-[var(--royal)]/15 flex items-center justify-center group-hover:border-[var(--royal)]/40 transition-colors">
                        <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-to-br from-[var(--royal)] to-[var(--royal-light)] flex items-center justify-center text-white font-display font-bold text-xs shadow-royal">
                          {step.step}
                        </div>
                        <Icon className="h-7 w-7 text-[var(--royal)] group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    <div className="text-center px-2">
                      <h3 className="font-display text-lg font-bold text-[var(--ink)] group-hover:text-[var(--royal)] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--ink)]/65 mt-2 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 pl-6 rounded-full bg-luxe-soft shadow-luxe">
            <span className="text-sm font-medium text-[var(--ink)]/70">Ready to {mode === "buy" ? "find" : "sell"} your property?</span>
            <SafeLink href="/contact" className="btn-royal px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
              Get Started Today <Handshake className="h-4 w-4" />
            </SafeLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
