"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, MapPin, LayoutGrid, Rows3 } from "lucide-react";
import SiteShell from "@/components/real-estate/site-shell";
import PageHero from "@/components/real-estate/page-hero";
import PropertyCard from "@/components/real-estate/property-card";
import Reveal from "@/components/real-estate/reveal";
import { properties, categories } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";

const allCategories = ["All", "Villa", "Apartment", "Penthouse", "Commercial", "Farmhouse", "Plot"];
const allAreas = ["All Areas", "DHA Phase 6", "DHA Phase 8", "DHA Phase 9", "Bahria Town", "Bahria Orchard", "Gulberg", "Lake City", "Park View", "Wapda Town", "Bedian Road", "State Bank Housing"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

function PropertiesContent() {
  const params = useSearchParams();
  const initialCat = params.get("category") ?? "All";
  const initialAreaRaw = params.get("area") ?? "All Areas";
  const initialArea = allAreas.find((a) => a.toLowerCase().includes(initialAreaRaw.toLowerCase())) ?? "All Areas";
  const [category, setCategory] = useState(initialCat);
  const [area, setArea] = useState(initialArea);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured");
  const [minPrice, setMinPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [grid, setGrid] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = [...properties];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (area !== "All Areas") list = list.filter((p) => p.areaName === area || p.location.includes(area));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    if (minPrice > 0) list = list.filter((p) => p.priceValue >= minPrice);
    if (sort === "Price: Low to High") list.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "Price: High to Low") list.sort((a, b) => b.priceValue - a.priceValue);
    return list;
  }, [category, area, search, minPrice, sort]);

  const clearFilters = () => {
    setCategory("All");
    setArea("All Areas");
    setSearch("");
    setMinPrice(0);
    setSort("Featured");
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Browse Our Portfolio"
        title="Discover Your"
        titleAccent="Perfect Property"
        subtitle="Search our complete collection of luxury villas, penthouses, apartments, and investment plots across Lahore's finest neighborhoods."
        crumbs={[{ label: "Properties" }]}
        background="/images/interior_theater.png"
      />

      <section className="py-16 lg:py-20 bg-luxe-soft min-h-screen">
        <div className="mx-auto max-w-7xl px-6">
          {/* Search + controls bar */}
          <div className="rounded-3xl bg-white shadow-luxe p-5 mb-8 sticky top-20 z-30">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="h-5 w-5 text-[var(--muted-foreground)] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by property name or location..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="px-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm font-medium focus:outline-none focus:border-[var(--royal)]"
                >
                  {allAreas.map((a) => <option key={a}>{a}</option>)}
                </select>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm font-medium focus:outline-none focus:border-[var(--royal)]"
                >
                  {sortOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button
                  onClick={() => setShowFilters((s) => !s)}
                  className={cn(
                    "h-[50px] px-4 rounded-xl border flex items-center gap-2 text-sm font-semibold transition-all",
                    showFilters ? "bg-[var(--royal)] text-white border-[var(--royal)]" : "border-border bg-luxe-soft text-[var(--ink)] hover:border-[var(--royal)]"
                  )}
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-luxe-soft border border-border">
                  <button onClick={() => setGrid("grid")} className={cn("h-9 w-9 rounded-lg flex items-center justify-center", grid === "grid" ? "bg-white shadow-luxe text-[var(--royal)]" : "text-[var(--muted-foreground)]")}>
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button onClick={() => setGrid("list")} className={cn("h-9 w-9 rounded-lg flex items-center justify-center", grid === "list" ? "bg-white shadow-luxe text-[var(--royal)]" : "text-[var(--muted-foreground)]")}>
                    <Rows3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category chips */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
              {allCategories.map((c) => (
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

            {/* Expandable filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
                    Min Price: PKR {(minPrice / 10000000).toFixed(1)} Cr
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1500000000}
                    step={50000000}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full accent-[var(--royal)]"
                  />
                </div>
                <div className="flex items-end">
                  <button onClick={clearFilters} className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-[var(--ink)]/70 hover:bg-[var(--royal)]/8 hover:text-[var(--royal)] transition-all flex items-center gap-2">
                    <X className="h-4 w-4" /> Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[var(--ink)]/60 text-sm">
              Showing <span className="font-bold text-[var(--ink)]">{filtered.length}</span> {filtered.length === 1 ? "property" : "properties"}
              {category !== "All" && <> in <span className="font-semibold text-[var(--royal)]">{category}</span></>}
              {area !== "All Areas" && <> at <span className="font-semibold text-[var(--royal)]">{area}</span></>}
            </p>
          </div>

          {/* Results grid */}
          {filtered.length > 0 ? (
            <div className={cn("grid gap-6", grid === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.08}>
                  <PropertyCard property={p} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-3xl bg-white shadow-luxe">
              <div className="h-16 w-16 rounded-2xl bg-luxe-soft flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-[var(--muted-foreground)]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--ink)]">No properties found</h3>
              <p className="text-[var(--muted-foreground)] mt-2 mb-5">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="btn-royal px-6 py-3 rounded-xl text-sm font-semibold">Clear Filters</button>
            </div>
          )}

          {/* Category quick links */}
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-6 text-center">Browse by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCategory(c.slug === "plot" ? "Plot" : c.name.replace("Residential ", "").replace("Luxury ", "").replace(" & Files", ""))}
                  className="group rounded-2xl overflow-hidden relative h-28 shadow-luxe hover:shadow-luxe-lg transition-all"
                >
                  <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <div className="text-xs font-bold leading-tight">{c.name}</div>
                    <div className="text-[10px] text-white/70">{c.count}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="h-10 w-10 rounded-full border-4 border-[var(--royal)]/20 border-t-[var(--royal)] animate-spin" /></div>}>
      <PropertiesContent />
    </Suspense>
  );
}
