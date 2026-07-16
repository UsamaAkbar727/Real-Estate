"use client";

import SiteShell from "@/components/real-estate/site-shell";
import Hero from "@/components/real-estate/hero";
import FeaturedProperties from "@/components/real-estate/featured-properties";
import PropertyMap from "@/components/real-estate/property-map";
import WhyChooseUs from "@/components/real-estate/why-choose-us";
import Services from "@/components/real-estate/services";
import Categories from "@/components/real-estate/categories";
import Investment from "@/components/real-estate/investment";
import Testimonials from "@/components/real-estate/testimonials";
import Stats from "@/components/real-estate/stats";
import Agents from "@/components/real-estate/agents";
import Process from "@/components/real-estate/process";
import Blog from "@/components/real-estate/blog";
import FAQ from "@/components/real-estate/faq";
import Contact from "@/components/real-estate/contact";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <FeaturedProperties />
      <PropertyMap />
      <WhyChooseUs />
      <Services />
      <Categories />
      <Investment />
      <Stats />
      <Testimonials />
      <Agents />
      <Process />
      <Blog />
      <FAQ />
      <Contact />
    </SiteShell>
  );
}
