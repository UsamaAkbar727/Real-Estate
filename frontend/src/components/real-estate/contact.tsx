"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  { icon: MapPin, label: "Visit Us", value: "Office 14, Main Boulevard, Gulberg III, Lahore, Pakistan", accent: "royal" },
  { icon: Phone, label: "Call Us", value: "+92 42 111 486 775", accent: "emerald" },
  { icon: Mail, label: "Email Us", value: "hello@imperialestates.pk", accent: "gold" },
  { icon: Clock, label: "Office Hours", value: "Mon – Sat: 9:00 AM – 8:00 PM", accent: "royal" },
];

const interests = ["Buying a Property", "Selling a Property", "Investment Advisory", "Property Management", "General Inquiry"];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setDone(true);
      toast.success("Message sent! Our team will reach out within 24 hours.");
      form.reset();
      setTimeout(() => setDone(false), 4000);
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-luxe-soft overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[var(--royal)]/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
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
                Let&apos;s Connect
              </span>
              <span className="h-px w-10 bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Begin Your <span className="text-gradient-royal">Property Journey</span>
            </h2>
            <p className="mt-4 text-[var(--ink)]/65 text-lg">
              Share a few details and a dedicated advisor will craft a personalized plan within 24 hours.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-white shadow-luxe-lg p-7 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--royal)]/5 blur-3xl" />
            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={<User className="h-4 w-4" />} label="Full Name" name="name" placeholder="Ahmed Khan" required />
                <Field icon={<Mail className="h-4 w-4" />} label="Email Address" name="email" type="email" placeholder="you@email.com" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={<Phone className="h-4 w-4" />} label="Phone Number" name="phone" placeholder="+92 300 1234567" required />
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
                    I&apos;m interested in
                  </label>
                  <div className="relative">
                    <select
                      name="interest"
                      className="w-full appearance-none px-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors pr-10"
                    >
                      {interests.map((i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                    <Building2 className="h-4 w-4 text-[var(--royal)] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="h-4 w-4 text-[var(--royal)] absolute left-4 top-4" />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your dream property, budget, or timeline..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || done}
                className="w-full btn-royal py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-90"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                ) : done ? (
                  <><CheckCircle2 className="h-4 w-4" /> Message Sent!</>
                ) : (
                  <>Send Message <Send className="h-4 w-4" /></>
                )}
              </button>
              <p className="text-xs text-center text-[var(--muted-foreground)]">
                By submitting, you agree to our Privacy Policy. We never share your data.
              </p>
            </form>
          </motion.div>

          {/* Contact info + map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="rounded-2xl bg-white shadow-luxe p-5 hover:shadow-luxe-lg transition-all group">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                    c.accent === "royal" ? "bg-[var(--royal)]/10 text-[var(--royal)]" :
                    c.accent === "emerald" ? "bg-[var(--emerald-brand)]/10 text-[var(--emerald-brand)]" :
                    "bg-[var(--gold)]/15 text-[var(--gold-deep)]"
                  }`}>
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">{c.label}</div>
                  <div className="text-sm font-semibold text-[var(--ink)] mt-1">{c.value}</div>
                </div>
              ))}
            </div>

            {/* Embedded map */}
            <div className="rounded-2xl overflow-hidden shadow-luxe h-64 border-4 border-white">
              <iframe
                title="Imperial Estates Office Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=74.3437%2C31.5104%2C74.3737%2C31.5304&layer=mapnik&marker=31.5204%2C74.3587"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2 block">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--royal)]">{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-luxe-soft text-sm text-[var(--ink)] placeholder:text-[var(--muted-foreground)]/60 focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors"
        />
      </div>
    </div>
  );
}
