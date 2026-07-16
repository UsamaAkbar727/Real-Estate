"use client";

import SafeLink from "@/components/ui/safe-link";


import { Home, Search, ArrowLeft, Crown } from "lucide-react";
import SiteShell from "@/components/real-estate/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-luxe-soft overflow-hidden py-20">
        <div className="absolute inset-0 bg-mesh-royal" />
        <div className="absolute inset-0 bg-dots-luxe opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[var(--gold)]/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--royal)]/10 blur-3xl animate-float-slower" />

        <div className="relative text-center px-6 max-w-xl">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-light)] shadow-royal mb-6 mx-auto">
            <Crown className="h-10 w-10 text-[var(--gold-light)]" strokeWidth={2} />
          </div>
          <div className="font-display text-7xl lg:text-9xl font-bold text-gradient-royal leading-none">404</div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--ink)] mt-4">
            Page Not Found
          </h1>
          <p className="text-[var(--ink)]/65 text-lg mt-4">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to finding your dream property.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <SafeLink href="/" className="btn-royal px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center">
              <Home className="h-4 w-4" /> Back to Home
            </SafeLink>
            <SafeLink href="/properties" className="btn-gold px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center">
              <Search className="h-4 w-4" /> Browse Properties
            </SafeLink>
          </div>
          <SafeLink href="/contact" className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--royal)] mt-6 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Or contact our team
          </SafeLink>
        </div>
      </section>
    </SiteShell>
  );
}
