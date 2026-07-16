"use client";

import SafeLink from "@/components/ui/safe-link";


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Search,
  ArrowRight,
  MapPin,
  Crown,
  Heart,
} from "lucide-react";
import { navMenu, directLinks, COMPANY, properties } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favsOpen, setFavsOpen] = useState(false);

  const { favorites, removeFavorite } = useFavorites();
  const favoritedProperties = properties.filter((p) => favorites.includes(p.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden lg:block bg-[var(--ink)] text-white/80 text-[13px]">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[var(--gold)]" />
              {COMPANY.address}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[var(--gold)]" />
              {COMPANY.phone}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--gold-light)]">Lahore&apos;s #1 Luxury Real Estate Firm</span>
            <span className="h-3 w-px bg-white/20" />
            <SafeLink href="/contact" className="hover:text-[var(--gold-light)] transition-colors">Book a Consultation</SafeLink>
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled ? "glass shadow-luxe py-2" : "bg-white/0 py-4"
        )}
        onMouseLeave={() => setActiveMega(null)}
      >
        <nav className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          {/* Logo */}
          <SafeLink href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--gold)]/30 blur-lg rounded-full group-hover:bg-[var(--gold)]/50 transition-colors" />
              <div className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-light)] flex items-center justify-center shadow-royal">
                <Crown className="h-5 w-5 text-[var(--gold-light)]" strokeWidth={2.2} />
              </div>
            </div>
            <div className="leading-none">
              <div className="font-display text-xl font-bold tracking-tight text-[var(--ink)]">
                Imperial<span className="text-gradient-gold">Estates</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted-foreground)] mt-0.5">
                Luxury Real Estate · Lahore
              </div>
            </div>
          </SafeLink>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navMenu.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => setActiveMega(item.label)}
                className="relative"
              >
                <SafeLink
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2.5 rounded-full text-[15px] font-medium transition-all",
                    activeMega === item.label
                      ? "text-[var(--royal)] bg-[var(--royal)]/8"
                      : "text-[var(--ink)]/80 hover:text-[var(--royal)]"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      activeMega === item.label && "rotate-180"
                    )}
                  />
                </SafeLink>
              </div>
            ))}
            {directLinks.map((link) => (
              <SafeLink
                key={link.label}
                href={link.href}
                className="px-4 py-2.5 rounded-full text-[15px] font-medium text-[var(--ink)]/80 hover:text-[var(--royal)] hover:bg-[var(--royal)]/8 transition-all"
              >
                {link.label}
              </SafeLink>
            ))}
          </div>

          {/* CTA + mobile */}
          <div className="flex items-center gap-3">
            {/* Favorites Wishlist Drawer */}
            <Sheet open={favsOpen} onOpenChange={setFavsOpen}>
              <SheetTrigger asChild>
                <button
                  className="relative h-11 w-11 rounded-xl glass shadow-luxe flex items-center justify-center text-[var(--royal)] hover:text-[var(--gold-deep)] transition-colors shrink-0"
                  aria-label="View favorites"
                >
                  <Heart className="h-5 w-5 text-[var(--royal)] fill-current" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1.5 rounded-full bg-[var(--gold)] text-[var(--ink)] text-[10px] font-bold flex items-center justify-center border border-white">
                      {favorites.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[360px] p-0 bg-white flex flex-col h-full z-[100]">
                <SheetTitle className="sr-only">Saved Properties</SheetTitle>
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <div className="font-display text-lg font-bold flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-current text-[var(--gold-deep)]" />
                    Saved Properties
                  </div>
                  <button onClick={() => setFavsOpen(false)} className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-luxe">
                  {favoritedProperties.length === 0 ? (
                    <div className="text-center py-12 text-[var(--muted-foreground)]">
                      <Heart className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                      <p className="text-sm">No properties saved yet.</p>
                    </div>
                  ) : (
                    favoritedProperties.map((p) => (
                      <div key={p.id} className="flex gap-3 p-3 rounded-2xl bg-luxe-soft border border-border/50 group relative">
                        <img src={p.image} alt={p.title} className="h-16 w-16 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-sm font-bold text-[var(--ink)] truncate group-hover:text-[var(--royal)] transition-colors">
                            <SafeLink href={`/properties/${p.slug}`} onClick={() => setFavsOpen(false)}>
                              {p.title}
                            </SafeLink>
                          </h4>
                          <p className="text-[11px] text-[var(--muted-foreground)] truncate mt-0.5">{p.location}</p>
                          <div className="text-sm font-bold text-[var(--royal)] mt-1">{p.price}</div>
                        </div>
                        <button
                          onClick={() => removeFavorite(p.id)}
                          className="text-[var(--muted-foreground)] hover:text-red-500 p-1 self-start"
                          aria-label="Remove favorite"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                {favoritedProperties.length > 0 && (
                  <div className="p-5 border-t border-border">
                    <SafeLink
                      href="/contact?interest=Saved+Properties"
                      onClick={() => setFavsOpen(false)}
                      className="btn-gold w-full px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      Inquire About All
                    </SafeLink>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <SafeLink
              href="/properties"
              className="hidden md:inline-flex btn-gold items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              <Search className="h-4 w-4" />
              Find Property
            </SafeLink>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden h-11 w-11 rounded-xl glass shadow-luxe flex items-center justify-center text-[var(--royal)]"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] p-0 bg-white">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <MobileNav onClose={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        {/* Mega menu panel */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-full max-w-6xl pointer-events-none"
            >
              <div className="pointer-events-auto mx-6 rounded-3xl bg-white border border-border/80 shadow-luxe-lg p-8 grid grid-cols-3 gap-8">
                {navMenu
                  .find((n) => n.label === activeMega)
                  ?.columns.map((col) => (
                    <div key={col.title}>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold-deep)] mb-4">
                        {col.title}
                      </div>
                      <ul className="space-y-1">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <SafeLink
                              href={link.href}
                              onClick={() => setActiveMega(null)}
                              className="group flex items-center justify-between py-2 px-3 rounded-xl text-[15px] text-[var(--ink)]/80 hover:bg-[var(--royal)]/8 hover:text-[var(--royal)] transition-all"
                            >
                              {link.label}
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </SafeLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                <SafeLink
                  href={navMenu.find((n) => n.label === activeMega)?.href ?? "/"}
                  onClick={() => setActiveMega(null)}
                  className="relative rounded-2xl overflow-hidden bg-royal-tint p-6 flex flex-col justify-between hover:shadow-luxe transition-shadow"
                >
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--royal)] mb-3">
                      Featured
                    </div>
                    <div className="font-display text-lg font-bold text-[var(--ink)] leading-tight">
                      DHA Phase 9 Prism Plots
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mt-2">
                      Up to 28% ROI in 24 months. Limited inventory.
                    </p>
                  </div>
                  <span className="mt-4 btn-royal px-4 py-2.5 rounded-xl text-sm font-semibold w-fit">
                    Explore Now
                  </span>
                </SafeLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="font-display text-lg font-bold">
          Imperial<span className="text-gradient-gold">Estates</span>
        </div>
        <button onClick={onClose} className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scroll-luxe">
        {navMenu.map((item) => (
          <div key={item.label}>
            <SafeLink
              href={item.href}
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold-deep)] mb-2 block"
            >
              {item.label}
            </SafeLink>
            <div className="grid grid-cols-2 gap-x-4">
              {item.columns.map((col) => (
                <div key={col.title}>
                  <div className="text-sm font-semibold text-[var(--ink)] mb-1">{col.title}</div>
                  <ul>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <SafeLink href={l.href} onClick={onClose} className="block py-1.5 text-sm text-[var(--muted-foreground)]">
                          {l.label}
                        </SafeLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
        {directLinks.map((l) => (
          <SafeLink
            key={l.label}
            href={l.href}
            onClick={onClose}
            className="block py-2 text-lg font-medium text-[var(--ink)]"
          >
            {l.label}
          </SafeLink>
        ))}
      </div>
      <div className="p-5 border-t border-border">
        <SafeLink href="/contact" onClick={onClose} className="btn-gold w-full px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" /> Book a Consultation
        </SafeLink>
      </div>
    </div>
  );
}
