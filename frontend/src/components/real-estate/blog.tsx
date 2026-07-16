"use client";

import SafeLink from "@/components/ui/safe-link";


import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, Newspaper, BookOpen } from "lucide-react";
import { blogs } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

const categoryStyles: Record<string, string> = {
  Investment: "bg-[var(--royal)]/10 text-[var(--royal)]",
  Lifestyle: "bg-[var(--gold)]/15 text-[var(--gold-deep)]",
  Guides: "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]",
};

export default function Blog() {
  const [feature, ...rest] = blogs;
  return (
    <section id="blog" className="relative py-24 lg:py-32 bg-gold-tint overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[var(--gold)]/10 blur-3xl" />
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
              <Newspaper className="h-4 w-4 text-[var(--gold-deep)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                Insights & News
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight max-w-2xl">
              Latest from Our <span className="text-gradient-gold">Journal</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SafeLink
              href="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--gold-deep)]/30 text-[var(--gold-deep)] font-semibold hover:bg-[var(--gold)] hover:text-[var(--ink)] hover:border-[var(--gold)] transition-all w-fit"
            >
              Read All Articles
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
            </SafeLink>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Feature article */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-[2rem] overflow-hidden shadow-luxe hover:shadow-luxe-lg transition-all cursor-pointer lg:row-span-2"
          >
            <SafeLink href={`/blog/${feature.slug}`} className="absolute inset-0 z-10" aria-label={feature.title} />
            <div className="relative h-72 lg:h-[440px] overflow-hidden">
              <img src={feature.image} alt={feature.title} className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            </div>
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className={cn("px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider", categoryStyles[feature.category])}>
                {feature.category}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <div className="flex items-center gap-4 text-sm text-white/80 mb-3">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[var(--gold-light)]" /> {feature.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[var(--gold-light)]" /> {feature.read}</span>
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight group-hover:text-[var(--gold-light)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/80 mt-3 leading-relaxed">{feature.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-light)] group-hover:gap-3 transition-all">
                Read Article <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </motion.article>

          {/* Side articles */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {rest.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
                className="group flex gap-4 rounded-2xl bg-white shadow-luxe hover:shadow-luxe-lg transition-all p-4 cursor-pointer relative"
              >
                <SafeLink href={`/blog/${post.slug}`} className="absolute inset-0 z-10 rounded-2xl" aria-label={post.title} />
                <div className="relative h-28 w-32 sm:w-40 shrink-0 rounded-xl overflow-hidden">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <span className={cn("inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2", categoryStyles[post.category])}>
                      {post.category}
                    </span>
                    <h3 className="font-display font-bold text-[var(--ink)] leading-tight group-hover:text-[var(--royal)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.read}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Newsletter inline strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white shadow-luxe"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-[var(--ink)]" />
            </div>
            <div>
              <div className="font-display font-bold text-[var(--ink)]">Get the Imperial Estates Weekly</div>
              <div className="text-sm text-[var(--muted-foreground)]">Market insights & new listings, every Sunday.</div>
            </div>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 md:w-64 px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)]"
            />
            <button className="btn-royal px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap">Subscribe</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
