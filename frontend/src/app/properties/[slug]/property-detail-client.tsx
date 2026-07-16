"use client";

import SafeLink from "@/components/ui/safe-link";

import { useState } from "react";

import { motion } from "framer-motion";
import {
  Bed, Bath, Maximize, MapPin, Heart, Share2, ArrowLeft, ArrowRight,
  CheckCircle2, Phone, Mail, Calendar, Car, Home, Building2, Send,
  ChevronLeft, ChevronRight, Star, ShieldCheck, FileCheck, Calculator,
} from "lucide-react";
import type { Property, Agent } from "@/lib/real-estate-data";
import { COMPANY } from "@/lib/real-estate-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import PropertyCard from "@/components/real-estate/property-card";
import Reveal from "@/components/real-estate/reveal";

export default function PropertyDetailClient({
  property,
  agent,
  related,
}: {
  property: Property;
  agent: Agent;
  related: Property[];
}) {
  const [activeImg, setActiveImg] = useState(0);
  const isPlot = property.category === "Plot" || property.category === "Commercial";

  const gallery = property.gallery.length > 0 ? property.gallery : [property.image];

  return (
    <>
      {/* Breadcrumb bar */}
      <div className="bg-luxe-soft border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-2 text-sm">
          <SafeLink href="/" className="text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">Home</SafeLink>
          <span className="text-[var(--muted-foreground)]/50">/</span>
          <SafeLink href="/properties" className="text-[var(--muted-foreground)] hover:text-[var(--royal)] transition-colors">Properties</SafeLink>
          <span className="text-[var(--muted-foreground)]/50">/</span>
          <span className="text-[var(--royal)] font-semibold truncate">{property.title}</span>
        </div>
      </div>

      {/* Gallery + summary */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
            {/* Gallery */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-[2rem] overflow-hidden shadow-luxe-lg h-[360px] lg:h-[480px] group"
              >
                <img src={gallery[activeImg]} alt={property.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {property.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[var(--royal)] text-white text-xs font-bold uppercase tracking-wider">
                    {property.tag}
                  </span>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="h-10 w-10 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Link copied to clipboard"); }}
                    className="h-10 w-10 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--royal)] transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i + 1) % gallery.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--royal)] transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={cn("h-1.5 rounded-full transition-all", i === activeImg ? "w-8 bg-white" : "w-1.5 bg-white/50")}
                        />
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex gap-3 mt-3 overflow-x-auto no-scrollbar">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={cn("h-20 w-28 rounded-xl overflow-hidden shrink-0 transition-all", i === activeImg ? "ring-2 ring-[var(--royal)] ring-offset-2" : "opacity-60 hover:opacity-100")}
                    >
                      <img src={g} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Summary card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[2rem] bg-luxe-soft shadow-luxe p-7 lg:p-8 flex flex-col"
            >
              <div className="flex items-center gap-2 text-sm text-[var(--royal)] font-semibold mb-2">
                <MapPin className="h-4 w-4" /> {property.location}
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-[var(--ink)] leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />)}
                <span className="text-sm text-[var(--muted-foreground)] ml-1">4.9 (128 reviews)</span>
              </div>

              <div className="my-6 pt-6 border-t border-border">
                <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">Price</div>
                <div className="font-display text-4xl font-bold text-gradient-royal">{property.price}</div>
                {property.pricePerSqft && <div className="text-sm text-[var(--muted-foreground)] mt-1">{property.pricePerSqft}</div>}
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-2 gap-3">
                {!isPlot ? (
                  <>
                    <Spec icon={<Bed className="h-5 w-5" />} label="Bedrooms" value={String(property.beds)} />
                    <Spec icon={<Bath className="h-5 w-5" />} label="Bathrooms" value={String(property.baths)} />
                    <Spec icon={<Maximize className="h-5 w-5" />} label="Area" value={property.area} />
                    <Spec icon={<Car className="h-5 w-5" />} label="Parking" value={String(property.parking ?? 2)} />
                  </>
                ) : (
                  <>
                    <Spec icon={<Maximize className="h-5 w-5" />} label="Area" value={property.area} />
                    <Spec icon={<Building2 className="h-5 w-5" />} label="Type" value={property.category} />
                    <Spec icon={<Calendar className="h-5 w-5" />} label="Available" value="Possession Ready" />
                    <Spec icon={<FileCheck className="h-5 w-5" />} label="Title" value="Clear & Verified" />
                  </>
                )}
                <Spec icon={<Calendar className="h-5 w-5" />} label="Year Built" value={String(property.yearBuilt)} />
                <Spec icon={<Home className="h-5 w-5" />} label="Status" value={`For ${property.type}`} />
              </div>

              {/* Quick action */}
              <SafeLink
                href="#inquiry"
                className="btn-royal mt-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                Request a Viewing <ArrowRight className="h-4 w-4" />
              </SafeLink>
              <SafeLink href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="mt-3 py-3 rounded-xl border-2 border-[var(--royal)]/20 text-[var(--royal)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--royal)]/8 transition-colors">
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </SafeLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description + features + agent */}
      <section className="py-12 lg:py-16 bg-luxe-soft">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">
            {/* Left: description + features */}
            <div>
              <Reveal>
                <div className="rounded-3xl bg-white shadow-luxe p-7 lg:p-9">
                  <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">About This Property</h2>
                  <p className="text-[var(--ink)]/70 leading-relaxed">{property.description}</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-white shadow-luxe p-7 lg:p-9 mt-6">
                  <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-5">Features & Amenities</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-luxe-soft">
                        <div className="h-8 w-8 rounded-lg bg-[var(--emerald-brand)]/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[var(--emerald-brand)]" />
                        </div>
                        <span className="text-sm font-medium text-[var(--ink)]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="rounded-3xl bg-white shadow-luxe p-7 lg:p-9 mt-6">
                  <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-5">Property Details</h2>
                  <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    <DetailRow label="Property ID" value={`IE-${String(property.id).padStart(4, "0")}`} />
                    <DetailRow label="Type" value={`For ${property.type}`} />
                    <DetailRow label="Category" value={property.category} />
                    <DetailRow label="Area" value={property.area} />
                    <DetailRow label="Location" value={property.location} />
                    <DetailRow label="Year Built" value={String(property.yearBuilt)} />
                    {!isPlot && <DetailRow label="Bedrooms" value={String(property.beds)} />}
                    {!isPlot && <DetailRow label="Bathrooms" value={String(property.baths)} />}
                    {property.parking != null && <DetailRow label="Parking" value={`${property.parking} vehicles`} />}
                    <DetailRow label="Price" value={property.price} />
                    <DetailRow label="Status" value="Available" />
                  </dl>
                </div>
              </Reveal>

              {/* Mortgage calculator */}
              <Reveal delay={0.2}>
                <div className="rounded-3xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-deep)] shadow-royal p-7 lg:p-9 mt-6 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[var(--gold)]/20 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-5 w-5 text-[var(--gold-light)]" />
                      <h2 className="font-display text-xl font-bold">Mortgage Calculator</h2>
                    </div>
                    <p className="text-white/70 text-sm mb-5">Estimate your monthly payments on this property.</p>
                    <MortgageCalc price={property.priceValue} />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: agent + inquiry */}
            <div className="space-y-6">
              <Reveal delay={0.1}>
                <div id="inquiry" className="rounded-3xl bg-white shadow-luxe p-7 sticky top-24">
                  <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-5">Schedule a Viewing</h2>
                  <InquiryForm propertyTitle={property.title} />
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <SafeLink href={`/agents/${agent.slug}`} className="block rounded-3xl bg-white shadow-luxe p-6 hover:shadow-luxe-lg transition-all group">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--gold-deep)] mb-3">Listed By</div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[var(--gold)]/30 blur-lg rounded-full" />
                      <img src={agent.image} alt={agent.name} className="relative h-16 w-16 rounded-full object-cover ring-2 ring-[var(--gold)]/40" />
                    </div>
                    <div className="flex-1">
                      <div className="font-display font-bold text-[var(--ink)] group-hover:text-[var(--royal)] transition-colors">{agent.name}</div>
                      <div className="text-sm text-[var(--royal)] font-semibold">{agent.role}</div>
                      <div className="text-xs text-[var(--muted-foreground)] mt-1">{agent.deals} deals · {agent.sales}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[var(--royal)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </SafeLink>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-3xl bg-luxe-soft p-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <ShieldCheck className="h-5 w-5 text-[var(--emerald-brand)]" />
                    <span className="text-[var(--ink)]/70">100% Verified Listing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FileCheck className="h-5 w-5 text-[var(--royal)]" />
                    <span className="text-[var(--ink)]/70">Title Cleared by Legal Team</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="h-5 w-5 text-[var(--gold)]" />
                    <span className="text-[var(--ink)]/70">98% Client Satisfaction</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related properties */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-px w-8 bg-[var(--gold)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold-deep)]">You May Also Like</span>
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-[var(--ink)]">Similar Properties</h2>
              </div>
              <SafeLink href="/properties" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal)] hover:gap-3 transition-all">
                View All <ArrowRight className="h-4 w-4" />
              </SafeLink>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
      <div className="h-10 w-10 rounded-lg bg-[var(--royal)]/8 text-[var(--royal)] flex items-center justify-center shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">{label}</div>
        <div className="text-sm font-bold text-[var(--ink)] truncate">{value}</div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/60 last:border-0">
      <dt className="text-sm text-[var(--muted-foreground)]">{label}</dt>
      <dd className="text-sm font-semibold text-[var(--ink)]">{value}</dd>
    </div>
  );
}

function MortgageCalc({ price }: { price: number }) {
  const [down, setDown] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(14);

  const principal = price * (1 - down / 100);
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Down Payment: {down}%</label>
          <input type="range" min={10} max={50} value={down} onChange={(e) => setDown(Number(e.target.value))} className="w-full accent-[var(--gold)] mt-2" />
        </div>
        <div>
          <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Tenure: {years} yrs</label>
          <input type="range" min={5} max={30} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-[var(--gold)] mt-2" />
        </div>
        <div>
          <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Rate: {rate}%</label>
          <input type="range" min={8} max={22} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[var(--gold)] mt-2" />
        </div>
      </div>
      <div className="rounded-2xl bg-white/10 p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-white/60 uppercase tracking-wider">Estimated Monthly</div>
          <div className="font-display text-2xl font-bold text-[var(--gold-light)]">PKR {Math.round(monthly / 100000).toLocaleString()} Lakh</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/60 uppercase tracking-wider">Loan Amount</div>
          <div className="font-display text-lg font-bold">PKR {(principal / 10000000).toFixed(1)} Cr</div>
        </div>
      </div>
    </div>
  );
}

function InquiryForm({ propertyTitle }: { propertyTitle: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest: `Viewing: ${propertyTitle}` }),
      });
      setDone(true);
      toast.success("Viewing request sent! Our advisor will call you within 24 hours.");
      form.reset();
      setTimeout(() => setDone(false), 4000);
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="name" required placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors" />
      <input name="email" type="email" required placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors" />
      <input name="phone" required placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors" />
      <textarea name="message" rows={3} placeholder="Preferred viewing date & time..." className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors resize-none" />
      <button type="submit" disabled={loading || done} className="w-full btn-gold py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-90">
        {loading ? "Sending..." : done ? "Request Sent!" : <>Request Viewing <Send className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
