import React, { useEffect } from "react";
import Navigation from "../components/landing/Navigation";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import Templates from "../components/landing/Templates";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

function LandingPage() {
  useEffect(() => {
    // Create scroll progress indicator
    const scrollProgress = document.createElement("div");
    scrollProgress.className = "scroll-progress";
    document.body.appendChild(scrollProgress);

    const updateScrollProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = scrollPercentage + "%";
    };

    window.addEventListener("scroll", updateScrollProgress);

    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    const handleKeyDown = (e) => {
      konamiCode.push(e.keyCode);
      if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
      }

      if (konamiCode.join(",") === konamiSequence.join(",")) {
        document.body.style.animation = "rainbow 2s infinite";
        setTimeout(() => {
          document.body.style.animation = "";
          alert(
            "🎉 Selamat! Anda menemukan Easter Egg SiapCV! Dapatkan diskon 50% untuk template premium!"
          );
        }, 2000);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      document.removeEventListener("keydown", handleKeyDown);
      if (scrollProgress && scrollProgress.parentNode) {
        scrollProgress.parentNode.removeChild(scrollProgress);
      }
    };
  }, []);

  return (
    <div className="bg-gray-50">
      <Navigation />
      <Hero />
      <Stats />
      <Features />
      <Templates />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;
