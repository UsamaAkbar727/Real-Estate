"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import Navbar from "@/components/real-estate/navbar";
import Footer from "@/components/real-estate/footer";
import SafeLink from "@/components/ui/safe-link";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Floating WhatsApp button */}
      <SafeLink
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full bg-[#25D366] shadow-luxe-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring opacity-40" />
        <MessageCircle className="h-7 w-7 relative" fill="currentColor" />
      </SafeLink>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full btn-gold shadow-luxe-lg flex items-center justify-center"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
