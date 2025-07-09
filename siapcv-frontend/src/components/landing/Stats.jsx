import React, { useEffect, useRef, useState } from "react";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    users: 0,
    cvs: 0,
    templates: 0,
  });
  const sectionRef = useRef(null);

  const animateCounter = (start, end, duration, callback) => {
    const increment = end / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        callback(end);
        clearInterval(timer);
      } else {
        callback(Math.floor(current));
      }
    }, 16);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          // Animate counters
          animateCounter(0, 50000, 2000, (value) => {
            setCounts((prev) => ({ ...prev, users: value }));
          });

          animateCounter(0, 125000, 2000, (value) => {
            setCounts((prev) => ({ ...prev, cvs: value }));
          });

          animateCounter(0, 25, 2000, (value) => {
            setCounts((prev) => ({ ...prev, templates: value }));
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">
              {counts.users.toLocaleString()}
            </div>
            <div className="text-gray-600">Pengguna Aktif</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">
              {counts.cvs.toLocaleString()}
            </div>
            <div className="text-gray-600">CV Dibuat</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">
              {counts.templates}
            </div>
            <div className="text-gray-600">Template Tersedia</div>
          </div>
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-gray-600">Tingkat Kepuasan</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
