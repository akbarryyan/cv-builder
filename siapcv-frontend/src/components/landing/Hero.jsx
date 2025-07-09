import React, { useState, useEffect } from "react";
import { ChevronDown, Play, Rocket, Monitor } from "lucide-react";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const dynamicTexts = [
    "dalam Hitungan Menit!",
    "yang Memukau HRD!",
    "dengan AI Assistant!",
    "Tanpa Ribet!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [dynamicTexts.length]);

  return (
    <section
      id="hero"
      className="gradient-bg min-h-screen flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Buat CV <span className="text-secondary">Profesional</span>
              <br />
              <span className="typewriter">{dynamicTexts[currentText]}</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Dapatkan pekerjaan impian Anda dengan CV yang menarik perhatian
              HRD. Template modern, mudah digunakan, dan hasil yang memukau!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Buat CV Sekarang
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Lihat Demo
              </button>
            </div>

            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-secondary">✓</span>
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary">✓</span>
                <span>Tanpa Watermark</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary">✓</span>
                <span>Download PDF</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="animate-float">
              <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-2 bg-primary rounded w-16"></div>
                    <div className="h-2 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-2 bg-secondary rounded w-20"></div>
                    <div className="h-2 bg-gray-200 rounded w-10"></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full animate-float"
              style={{ animationDelay: "-2s" }}
            ></div>
            <div
              className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/20 rounded-full animate-float"
              style={{ animationDelay: "-4s" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce-slow">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
