"use client";

import SafeLink from "@/components/ui/safe-link";


import { useMemo, useState } from "react";
import { Calendar, Clock, ArrowUpRight, Newspaper, BookOpen, Search } from "lucide-react";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import Reveal from "@/components/real-estate/reveal";
import { blogs } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

const categoryStyles: Record<string, string> = {
  Investment: "bg-[var(--royal)]/10 text-[var(--royal)]",
  Lifestyle: "bg-[var(--gold)]/15 text-[var(--gold-deep)]",
  Guides: "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]",
};

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const allCats = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  const filtered = useMemo(() => {
    let list = [...blogs];
    if (category !== "All") list = list.filter((b) => b.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }
    return list;
  }, [category, search]);

  const [feature, ...rest] = filtered;

  return (
    <SiteShell>
      <PageHero
        eyebrow="Insights & Journal"
        title="The Imperial Estates"
        titleAccent="Blog"
        subtitle="Market intelligence, investment analysis, and luxury lifestyle stories from Lahore's leading real estate experts."
        crumbs={[{ label: "Blog" }]}
        background="/images/blog_1.png"
      />

      <section className="py-16 lg:py-20 bg-luxe-soft min-h-screen">
        <div className="mx-auto max-w-7xl px-6">
          {/* Search + filter bar */}
          <div className="rounded-3xl bg-white shadow-luxe p-5 mb-10 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
            <div className="relative lg:w-80">
              <Search className="h-5 w-5 text-[var(--muted-foreground)] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {allCats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                    category === c ? "bg-gradient-to-r from-[var(--royal)] to-[var(--royal-light)] text-white shadow-royal" : "bg-luxe-soft text-[var(--ink)]/70 hover:bg-[var(--royal)]/8 hover:text-[var(--royal)]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-white shadow-luxe">
              <div className="h-16 w-16 rounded-2xl bg-luxe-soft flex items-center justify-center mx-auto mb-4">
                <Newspaper className="h-8 w-8 text-[var(--muted-foreground)]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--ink)]">No articles found</h3>
              <p className="text-[var(--muted-foreground)] mt-2">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Feature article */}
              {feature && (
                <Reveal className="lg:row-span-2">
                  <SafeLink
                    href={`/blog/${feature.slug}`}
                    className="group relative rounded-[2rem] overflow-hidden shadow-luxe hover:shadow-luxe-lg transition-all block h-full min-h-[480px]"
                  >
                    <img src={feature.image} alt={feature.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute top-5 left-5">
                      <span className={cn("px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider", categoryStyles[feature.category])}>{feature.category}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                      <div className="flex items-center gap-4 text-sm text-white/80 mb-3">
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[var(--gold-light)]" /> {feature.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[var(--gold-light)]" /> {feature.read}</span>
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight group-hover:text-[var(--gold-light)] transition-colors">{feature.title}</h3>
                      <p className="text-white/80 mt-3 leading-relaxed line-clamp-3">{feature.excerpt}</p>
                      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/20">
                        <img src={feature.authorImage} alt={feature.author} className="h-9 w-9 rounded-full object-cover ring-2 ring-white/20" />
                        <span className="text-sm text-white/70">By {feature.author}</span>
                        <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold-light)] group-hover:gap-2 transition-all">
                          Read <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </SafeLink>
                </Reveal>
              )}

              {/* Side articles */}
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={(i + 1) * 0.08}>
                  <SafeLink
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 rounded-2xl bg-white shadow-luxe hover:shadow-luxe-lg transition-all p-4"
                  >
                    <div className="relative h-32 w-40 shrink-0 rounded-xl overflow-hidden">
                      <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-110" />
                    </div>
                    <div className="flex flex-col justify-between py-1 min-w-0 flex-1">
                      <div>
                        <span className={cn("inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2", categoryStyles[post.category])}>{post.category}</span>
                        <h3 className="font-display font-bold text-[var(--ink)] leading-tight group-hover:text-[var(--royal)] transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mt-2">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.read}</span>
                      </div>
                    </div>
                  </SafeLink>
                </Reveal>
              ))}
            </div>
          )}

          {/* Newsletter */}
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 p-7 rounded-3xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-deep)] text-white">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
                  <BookOpen className="h-7 w-7 text-[var(--gold-light)]" />
                </div>
                <div>
                  <div className="font-display text-xl font-bold">Get the Imperial Estates Weekly</div>
                  <div className="text-white/70 text-sm">Market insights & new listings, every Sunday.</div>
                </div>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("input") as HTMLInputElement).value = ""; }} className="flex w-full md:w-auto gap-2">
                <input type="email" required placeholder="you@email.com" className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--gold)] text-sm" />
                <button className="btn-gold px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap">Subscribe</button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
