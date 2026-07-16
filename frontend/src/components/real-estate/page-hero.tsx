"use client";

import SafeLink from "@/components/ui/safe-link";

import { motion } from "framer-motion";

import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  crumbs = [],
  background,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  crumbs?: Crumb[];
  background?: string;
  align?: "center" | "left";
}) {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-luxe-soft">
      {/* Background */}
      {background ? (
        <div className="absolute inset-0">
          <img src={background} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-mesh-royal" />
          <div className="absolute inset-0 bg-dots-luxe opacity-40" />
        </>
      )}

      {/* Decorative glows */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[var(--gold)]/10 blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[var(--royal)]/10 blur-3xl animate-float-slower" />

      <div
        className={cn(
          "relative mx-auto max-w-7xl px-6",
          align === "center" ? "text-center" : "text-left"
        )}
      >
        {/* Breadcrumbs */}
        {crumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "flex items-center gap-1.5 text-sm mb-6",
              align === "center" ? "justify-center" : "justify-start"
            )}
          >
            <SafeLink href="/" className="flex items-center gap-1 text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">
              <Home className="h-3.5 w-3.5" /> Home
            </SafeLink>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]/50" />
                {c.href ? (
                  <SafeLink href={c.href} className="text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">
                    {c.label}
                  </SafeLink>
                ) : (
                  <span className="text-[var(--royal)] font-semibold">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={cn("inline-flex items-center gap-2 mb-5", align === "center" && "justify-center")}
          >
            <span className="h-px w-8 bg-[var(--gold)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--ink)] tracking-tight leading-[1.05] text-balance"
        >
          {title} {titleAccent && <span className="text-gradient-royal">{titleAccent}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "mt-5 text-lg text-[var(--ink)]/65 leading-relaxed",
              align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
            )}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
