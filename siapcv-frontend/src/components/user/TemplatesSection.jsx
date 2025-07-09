import { FileText } from "lucide-react";

const templates = [
  {
    name: "Modern",
    description: "Clean & professional",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "Creative",
    description: "For designers",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    name: "Simple",
    description: "Minimalist style",
    gradient: "from-green-400 to-green-600",
  },
  {
    name: "Executive",
    description: "For managers",
    gradient: "from-red-400 to-red-600",
  },
];

const TemplatesSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">Recommended Templates</h3>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden transition duration-300 hover:shadow-lg cursor-pointer hover:transform hover:-translate-y-1"
          >
            <div
              className={`h-32 bg-gradient-to-r ${template.gradient} flex items-center justify-center`}
            >
              <FileText className="text-white w-12 h-12 drop-shadow-lg" />
            </div>
            <div className="p-3">
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesSection;
