"use client";

import SafeLink from "@/components/ui/safe-link";


import { motion } from "framer-motion";
import { HelpCircle, MessageCircleQuestion, PhoneCall, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/real-estate-data";

export default function FAQ() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[40%] h-[60%] bg-gradient-to-l from-[var(--royal)]/5 to-transparent rounded-l-full" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          {/* Left: header + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <MessageCircleQuestion className="h-4 w-4 text-[var(--royal)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--royal)]">
                Questions & Answers
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Frequently Asked <span className="text-gradient-royal">Questions</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Everything you need to know about buying, selling, and investing in Lahore real estate with us.
            </p>

            {/* Help card */}
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-deep)] p-7 text-white shadow-royal relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold)]/20 blur-2xl" />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6 text-[var(--gold-light)]" />
                </div>
                <h3 className="font-display text-xl font-bold">Still have questions?</h3>
                <p className="text-white/75 text-sm mt-2 mb-5">
                  Our advisors are one call away, seven days a week.
                </p>
                <SafeLink
                  href="/contact"
                  className="btn-gold inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                >
                  <PhoneCall className="h-4 w-4" /> Talk to an Advisor
                </SafeLink>
              </div>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border/70 bg-luxe-soft px-5 data-[state=open]:bg-white data-[state=open]:shadow-luxe data-[state=open]:border-[var(--royal)]/20 transition-all"
                >
                  <AccordionTrigger className="text-left font-display font-bold text-[var(--ink)] hover:no-underline py-5 text-base lg:text-lg group">
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br from-[var(--royal)] to-[var(--royal-light)] flex items-center justify-center text-white text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--ink)]/65 leading-relaxed pb-5 pl-10">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--muted-foreground)]"
            >
              Didn&apos;t find your answer?
              <SafeLink href="/contact" className="font-semibold text-[var(--royal)] flex items-center gap-1 hover:gap-2 transition-all">
                Contact us <ArrowRight className="h-3.5 w-3.5" />
              </SafeLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
