import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg"
          : "bg-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SiapCV
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection("templates")}
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Template
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Fitur
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Harga
            </button>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition duration-300"
            >
              Kontak
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 transition duration-300"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition duration-300 transform hover:scale-105"
            >
              Mulai Gratis
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection("hero")}
              className="block px-3 py-2 text-gray-700 hover:text-primary w-full text-left"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection("templates")}
              className="block px-3 py-2 text-gray-700 hover:text-primary w-full text-left"
            >
              Template
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block px-3 py-2 text-gray-700 hover:text-primary w-full text-left"
            >
              Fitur
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block px-3 py-2 text-gray-700 hover:text-primary w-full text-left"
            >
              Harga
            </button>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
            >
              Kontak
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
