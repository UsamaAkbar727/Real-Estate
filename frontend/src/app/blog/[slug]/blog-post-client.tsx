"use client";

import SafeLink from "@/components/ui/safe-link";


import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight, ArrowUpRight, Share2, Facebook, Linkedin, Twitter, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Reveal from "@/components/real-estate/reveal";

const categoryStyles: Record<string, string> = {
  Investment: "bg-[var(--royal)]/10 text-[var(--royal)]",
  Lifestyle: "bg-[var(--gold)]/15 text-[var(--gold-deep)]",
  Guides: "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]",
};

export default function BlogPostClient({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-luxe-soft border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-2 text-sm">
          <SafeLink href="/" className="text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">Home</SafeLink>
          <span className="text-[var(--muted-foreground)]/50">/</span>
          <SafeLink href="/blog" className="text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">Blog</SafeLink>
          <span className="text-[var(--muted-foreground)]/50">/</span>
          <span className="text-[var(--royal)] font-semibold truncate">{post.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-12 lg:pt-16 pb-10 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--gold)]/8 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={cn("inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5", categoryStyles[post.category])}>
              {post.category}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-3xl lg:text-5xl font-bold text-[var(--ink)] leading-[1.1] tracking-tight text-balance"
          >
            {post.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-[var(--ink)]/65 leading-relaxed"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center justify-center gap-5 mt-7 pt-6 border-t border-border"
          >
            <div className="flex items-center gap-3">
              <img src={post.authorImage} alt={post.author} className="h-11 w-11 rounded-full object-cover ring-2 ring-[var(--gold)]/30" />
              <div className="text-left">
                <div className="text-sm font-bold text-[var(--ink)]">{post.author}</div>
                <div className="text-xs text-[var(--muted-foreground)]">Real Estate Expert</div>
              </div>
            </div>
            <span className="h-8 w-px bg-border" />
            <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.read}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-[2rem] overflow-hidden shadow-luxe-lg h-[300px] lg:h-[480px]"
          >
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-start gap-8">
            {/* Share rail */}
            <div className="hidden lg:flex flex-col items-center gap-3 sticky top-28 pt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] [writing-mode:vertical-rl] rotate-180">Share</div>
              <div className="h-12 w-px bg-border" />
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied!"); }}
                  aria-label={`Share on ${label}`}
                  className="h-10 w-10 rounded-full bg-luxe-soft flex items-center justify-center text-[var(--royal)] hover:bg-[var(--royal)] hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
              <button
                onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied to clipboard!"); }}
                aria-label="Copy link"
                className="h-10 w-10 rounded-full bg-luxe-soft flex items-center justify-center text-[var(--royal)] hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Article content */}
            <article className="flex-1 min-w-0">
              {post.content.map((section, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="mb-10">
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-[var(--ink)] mb-4 leading-tight">{section.heading}</h2>
                    {section.body.map((para, j) => (
                      <p key={j} className="text-[var(--ink)]/75 leading-[1.8] text-[17px] mb-4">{para}</p>
                    ))}
                  </div>
                </Reveal>
              ))}

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-6 mt-4 border-t border-border">
                <Tag className="h-4 w-4 text-[var(--muted-foreground)]" />
                {["Lahore Real Estate", post.category, "Imperial Estates", "Property Tips"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-luxe-soft text-sm text-[var(--ink)]/70 font-medium">{t}</span>
                ))}
              </div>

              {/* Author box */}
              <div className="mt-8 rounded-3xl bg-luxe-soft p-6 flex items-center gap-4">
                <img src={post.authorImage} alt={post.author} className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--gold)]/40" />
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--gold-deep)]">Written By</div>
                  <div className="font-display text-lg font-bold text-[var(--ink)]">{post.author}</div>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">Real estate expert at Imperial Estates, sharing insights on Lahore's luxury property market.</p>
                </div>
                <SafeLink href="/agents" className="btn-royal px-4 py-2.5 rounded-xl text-sm font-semibold hidden sm:inline-flex items-center gap-2">
                  Meet Our Team <ArrowRight className="h-4 w-4" />
                </SafeLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-luxe-soft">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-px w-8 bg-[var(--gold)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">Keep Reading</span>
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--ink)]">Related Articles</h2>
              </div>
              <SafeLink href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal)] hover:gap-3 transition-all">
                All Articles <ArrowRight className="h-4 w-4" />
              </SafeLink>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.1}>
                  <SafeLink href={`/blog/${p.slug}`} className="group relative rounded-[1.75rem] overflow-hidden shadow-luxe hover:shadow-luxe-lg transition-all block h-80">
                    <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", categoryStyles[p.category])}>{p.category}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-3 text-xs text-white/70 mb-2">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.read}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold leading-tight group-hover:text-[var(--gold-light)] transition-colors">{p.title}</h3>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold-light)] mt-3 group-hover:gap-2 transition-all">
                        Read Article <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </SafeLink>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
