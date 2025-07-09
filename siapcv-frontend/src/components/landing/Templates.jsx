import React from "react";

const Templates = () => {
  const templates = [
    {
      name: "Template Modern",
      description: "Cocok untuk fresh graduate",
      color: "from-blue-50 to-blue-100",
      accentColor: "bg-blue-500",
    },
    {
      name: "Template Executive",
      description: "Untuk posisi managerial",
      color: "from-purple-50 to-purple-100",
      accentColor: "bg-purple-500",
    },
    {
      name: "Template Creative",
      description: "Untuk profesi kreatif",
      color: "from-green-50 to-green-100",
      accentColor: "bg-green-500",
    },
  ];

  return (
    <section id="templates" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Template CV <span className="text-primary">Profesional</span>
          </h2>
          <p className="text-xl text-gray-600">
            Pilih dari berbagai template yang telah didesain khusus untuk
            berbagai profesi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div key={index} className="card-hover group cursor-pointer">
              <div
                className={`bg-gradient-to-br ${template.color} p-6 rounded-2xl shadow-lg`}
              >
                <div className="bg-white p-4 rounded-xl mb-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 ${template.accentColor} rounded-full mx-auto mb-3`}
                    ></div>
                    <div className="h-2 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                    <div className="space-y-1">
                      <div className="h-1 bg-gray-200 rounded"></div>
                      <div className="h-1 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition duration-300 transform hover:scale-105">
            Lihat Semua Template
          </button>
        </div>
      </div>
    </section>
  );
};

export default Templates;
