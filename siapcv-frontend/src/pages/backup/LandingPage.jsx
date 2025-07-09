import { useState } from "react";
import {
  FaFileAlt,
  FaRocket,
  FaPlay,
  FaMagic,
  FaPalette,
  FaDownload,
  FaGift,
  FaCheck,
  FaCheckCircle,
  FaCrown,
  FaStar,
  FaGem,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaShieldAlt,
  FaChevronDown,
  FaTag,
  FaTimes,
} from "react-icons/fa";

const faqs = [
  {
    q: "Apakah SiapCV benar-benar gratis?",
    a: (
      <>
        Ya! SiapCV menawarkan versi gratis dengan akses ke template dasar dan
        fitur essential. Untuk template premium dan fitur advanced seperti AI
        Assistant, tersedia paket berbayar dengan harga terjangkau mulai dari Rp
        49.000/bulan.
      </>
    ),
  },
  {
    q: "Berapa lama waktu yang dibutuhkan untuk membuat CV?",
    a: (
      <>
        Dengan bantuan AI Assistant kami, Anda bisa membuat CV profesional hanya
        dalam 10-15 menit! Sistem kami akan memandu Anda step-by-step dan
        memberikan saran konten yang relevan dengan industri target Anda.
      </>
    ),
  },
  {
    q: "Apakah CV yang dibuat ATS-friendly?",
    a: (
      <>
        Tentu saja! Semua template kami didesain khusus untuk lolos sistem ATS
        (Applicant Tracking System) yang digunakan perusahaan modern. CV Anda
        akan mudah dibaca oleh sistem dan HR.
      </>
    ),
  },
  {
    q: "Bisakah saya mengedit CV setelah didownload?",
    a: (
      <>
        Ya! CV yang didownload dalam format Word (.docx) dapat diedit kapan
        saja. Selain itu, Anda juga bisa login kembali ke akun SiapCV untuk
        melakukan perubahan dan mendownload ulang.
      </>
    ),
  },
  {
    q: "Apakah data pribadi saya aman?",
    a: (
      <>
        Keamanan data adalah prioritas utama kami. Semua informasi pribadi
        dienkripsi dengan standar bank dan tersimpan di server yang aman. Kami
        tidak akan pernah membagikan data Anda kepada pihak ketiga tanpa
        persetujuan.
      </>
    ),
  },
  {
    q: "Bagaimana cara menghubungi customer support?",
    a: (
      <>
        Tim support kami siap membantu 24/7 melalui live chat di website, email
        support@siap-cv.com, atau WhatsApp di +62 812-3456-7890. Rata-rata
        response time kami kurang dari 2 jam!
      </>
    ),
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Helper for scroll to section
  const handleScroll = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white overflow-x-hidden relative">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/75 backdrop-blur-md shadow-lg transition-all duration-300 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-glow">
              <FaFileAlt className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SiapCV
            </span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => handleScroll("features")}
              className="hover:text-blue-400 transition-colors duration-300 hover:scale-105 transform"
            >
              Fitur
            </button>
            <button
              onClick={() => handleScroll("pricing")}
              className="hover:text-blue-400 transition-colors duration-300 hover:scale-105 transform"
            >
              Harga
            </button>
            <button
              onClick={() => handleScroll("faq")}
              className="hover:text-blue-400 transition-colors duration-300 hover:scale-105 transform"
            >
              FAQ
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="hover:text-blue-400 transition-colors duration-300 hover:scale-105 transform"
            >
              Kontak
            </button>
          </div>
          {/* Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900/95 rounded-xl mt-3 shadow-xl px-6 py-4 animate-fade-in space-y-4 z-30">
            <button
              onClick={() => {
                handleScroll("features");
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-1 hover:text-blue-400"
            >
              Fitur
            </button>
            <button
              onClick={() => {
                handleScroll("pricing");
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-1 hover:text-blue-400"
            >
              Harga
            </button>
            <button
              onClick={() => {
                handleScroll("faq");
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-1 hover:text-blue-400"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                handleScroll("contact");
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-1 hover:text-blue-400"
            >
              Kontak
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 py-20 pt-32 md:pt-44">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Buat CV
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-glow p-2">
                Profesional
              </span>
              <br />
              dalam Hitungan Menit
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Platform AI-powered yang membantu Anda membuat CV menarik dengan
              template modern dan panduan ahli.
              <span className="text-blue-400 font-semibold">
                Tingkatkan peluang diterima kerja hingga 3x lipat!
              </span>
            </p>
          </div>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 animate-glow">
              <FaRocket className="mr-2 inline group-hover:animate-bounce" />
              Mulai Buat CV Gratis
            </button>
            <button className="group border-2 border-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300">
              <FaPlay className="mr-2 inline group-hover:animate-pulse" />
              Lihat Demo
            </button>
          </div>

          {/* Floating CV Preview */}
          <div className="relative animate-float">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-shadow duration-500">
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold text-lg">Akbar Rayyan</h3>
                    <p className="text-purple-300">Software Engineer</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <FaEnvelope className="w-4 mr-2 text-blue-400" />
                    akbar@mail.com
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="w-4 mr-2 text-blue-400" />
                    +62 812-1498-0632
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="w-4 mr-2 text-blue-400" />
                    Jakarta, Indonesia
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <h4 className="font-semibold mb-2 text-purple-300">
                    Experience
                  </h4>
                  <div className="text-sm text-gray-300">
                    <p className="font-medium">Senior Developer</p>
                    <p>Tech Company • 2021-2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 px-6 py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Mengapa Pilih
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SiapCV?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fitur canggih yang dirancang khusus untuk membantu Anda menonjol
              di mata recruiter
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-blue-400/50 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <FaMagic className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                AI Assistant
              </h3>
              <p className="text-gray-300 leading-relaxed">
                AI cerdas yang membantu menulis konten CV yang menarik dan
                sesuai dengan industri target Anda
              </p>
            </div>
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-purple-400/50 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <FaPalette className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                50+ Template Premium
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Koleksi template profesional yang dapat disesuaikan untuk
                berbagai industri dan level karir
              </p>
            </div>
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-pink-400/50 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/25">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <FaDownload className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-pink-400 transition-colors">
                Export Multi-Format
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Download CV dalam format PDF, Word, atau link online yang dapat
                dibagikan dengan mudah
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">
                100K+
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">
                CV Dibuat
              </p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">
                95%
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">
                Tingkat Kepuasan
              </p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">
                50+
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">
                Template Premium
              </p>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">
                24/7
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">
                Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="relative z-10 px-6 py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pilih Paket yang
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Tepat untuk Anda
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Investasi terbaik untuk karir Anda, mulai dari gratis hingga paket
              profesional
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-green-400/50 transform hover:scale-105 transition-all duration-500 relative">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                  <FaGift className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                  Gratis
                </h3>
                <div className="text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Rp 0
                  </span>
                </div>
                <p className="text-gray-400">Selamanya</p>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  Fitur Gratis
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Form input data CV
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Preview real-time
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      1 template dasar
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Export PDF (hanya untuk template dasar)
                    </span>
                  </li>
                </ul>
              </div>
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 py-4 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
                <FaRocket className="mr-2 inline" />
                Mulai Gratis
              </button>
            </div>

            {/* Premium Plan */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-blue-500 hover:border-blue-400 transform hover:scale-105 transition-all duration-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full text-sm font-bold text-white animate-pulse">
                  <FaCrown className="mr-1 inline" />
                  TERPOPULER
                </div>
              </div>
              <div className="text-center mb-8 mt-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce animate-glow">
                  <FaStar className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  Premium
                </h3>
                <div className="text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Rp 49K
                  </span>
                </div>
                <p className="text-gray-400">per bulan</p>
                <p className="text-sm text-green-400 mt-1">
                  <FaTag className="mr-1 inline" />
                  Hemat 40% jika bayar tahunan
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                  <FaGem className="mr-2" />
                  Fitur Premium
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Pilihan lebih banyak template profesional
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Export PDF semua template
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Mode multi-bahasa (Indonesia/English)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Simpan dan edit ulang CV kapan saja
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Share link CV (custom URL)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Download sebagai file .docx
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-400 w-5 mr-3 mt-0.5 text-sm" />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      Fitur AI: auto-generate deskripsi pengalaman kerja
                      berdasarkan posisi
                    </span>
                  </li>
                </ul>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-4 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 animate-glow shadow-2xl hover:shadow-blue-500/25">
                <FaCrown className="mr-2 inline" />
                Pilih Premium
              </button>
            </div>
          </div>
          {/* Money Back Guarantee */}
          <div
            className="text-center mt-12 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-6 py-3">
              <FaShieldAlt className="text-green-400 mr-2" />
              <span className="text-green-300 font-semibold">
                Garansi 30 hari uang kembali
              </span>
            </div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Tidak puas dengan hasilnya? Kami akan mengembalikan 100% uang Anda
              tanpa pertanyaan dalam 30 hari pertama.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pertanyaan yang
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Sering Ditanyakan
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Temukan jawaban atas pertanyaan umum tentang SiapCV
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className={`group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 ${
                  openFaq === idx ? "border-blue-400/50" : ""
                } transition-all duration-300 overflow-hidden`}
              >
                <button
                  className="faq-button w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-300"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <h3
                    className={`text-lg md:text-xl font-semibold transition-colors ${
                      openFaq === idx
                        ? "text-blue-400"
                        : "group-hover:text-blue-400"
                    }`}
                  >
                    {item.q}
                  </h3>
                  <FaChevronDown
                    className={`transform transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    } text-blue-400`}
                  />
                </button>
                <div
                  className="faq-content transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: openFaq === idx ? "500px" : "0px",
                    overflow: "hidden",
                  }}
                >
                  <div className="px-8 pb-6 text-gray-300 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap Membuat CV yang
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Mengagumkan?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan profesional yang telah berhasil
            mendapatkan pekerjaan impian mereka
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 px-12 py-5 rounded-full text-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 animate-glow">
              <FaStar className="mr-2 inline group-hover:animate-spin" />
              Mulai Sekarang - GRATIS
            </button>
            <p className="text-sm text-gray-400">
              <FaShieldAlt className="mr-1 text-green-400 inline" />
              Tidak perlu kartu kredit
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SiapCV
              </span>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
          <div className="text-center text-gray-400 mt-8 pt-8 border-t border-white/10">
            <p>&copy; 2024 SiapCV. Semua hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Icon
function FaBars(props) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      className={props.className}
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M4 5h16M4 12h16M4 19h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
