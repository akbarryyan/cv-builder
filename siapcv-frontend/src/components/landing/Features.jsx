import React from "react";
import { Zap, Palette, Smartphone, Bot, Save, Target } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cepat & Mudah",
      description:
        "Buat CV profesional hanya dalam 5 menit dengan interface yang intuitif dan user-friendly.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Template Modern",
      description:
        "Pilihan template yang beragam dan modern, disesuaikan dengan berbagai profesi dan industri.",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design",
      description:
        "Akses dari perangkat apapun - desktop, tablet, atau smartphone dengan tampilan yang sempurna.",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Assistant",
      description:
        "Dapatkan saran dan rekomendasi dari AI untuk membuat CV yang lebih menarik dan efektif.",
    },
    {
      icon: <Save className="w-8 h-8" />,
      title: "Auto Save",
      description:
        "Jangan khawatir kehilangan data! Sistem auto save memastikan progress Anda selalu tersimpan.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "ATS Friendly",
      description:
        "CV yang dibuat mudah dibaca oleh sistem ATS perusahaan, meningkatkan peluang diterima kerja.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih <span className="text-primary">SiapCV</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan semua yang Anda butuhkan untuk membuat CV yang
            memukau dan profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-hover bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
