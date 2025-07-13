import React from "react";
import Navigation from "../components/landing/Navigation";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Stats from "../components/landing/Stats";
import Templates from "../components/landing/Templates";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Stats />
      <Templates />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;
