import React from "react";

const CTA = () => {
  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">
          Siap Membuat CV yang Memukau?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Bergabunglah dengan ribuan job seeker yang telah berhasil mendapatkan
          pekerjaan impian mereka
        </p>
        <button className="bg-secondary text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transition duration-300 transform hover:scale-105 shadow-lg">
          Mulai Buat CV Gratis
        </button>
        <p className="text-white/70 mt-4">
          Tidak perlu kartu kredit • 100% gratis • Hasil profesional
        </p>
      </div>
    </section>
  );
};

export default CTA;
