import { FileText, Pencil, Download, Trash } from "lucide-react";

const cvData = [
  {
    name: "Senior Web Developer",
    template: "Modern",
    lastUpdated: "2 days ago",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    iconColor: "text-purple-600",
  },
  {
    name: "Frontend Engineer",
    template: "Creative",
    lastUpdated: "1 week ago",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    iconColor: "text-blue-600",
  },
  {
    name: "Full Stack Developer",
    template: "Professional",
    lastUpdated: "3 weeks ago",
    status: "Draft",
    statusColor: "bg-gray-100 text-gray-800",
    iconColor: "text-yellow-600",
  },
];

const CVTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Your Recent CVs</h3>
        <a href="#" className="text-purple-600 hover:underline">
          View All
        </a>
      </div>

      {/* Pastikan wrapper table pakai block dan overflow-x-auto */}
      <div className="block w-full overflow-x-auto">
        <table className="min-w-[700px] w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3">CV Name</th>
              <th className="pb-3">Template</th>
              <th className="pb-3">Last Updated</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {cvData.map((cv, index) => (
              <tr key={index}>
                <td className="py-4 min-w-[200px]">
                  <div className="flex items-center">
                    <FileText className={`w-5 h-5 mr-3 ${cv.iconColor}`} />
                    <span className="font-medium">{cv.name}</span>
                  </div>
                </td>
                <td className="py-4 min-w-[130px]">{cv.template}</td>
                <td className="py-4 min-w-[140px]">{cv.lastUpdated}</td>
                <td className="py-4 min-w-[100px]">
                  <span
                    className={`${cv.statusColor} text-xs px-2 py-1 rounded-full`}
                  >
                    {cv.status}
                  </span>
                </td>
                <td className="py-4 min-w-[120px]">
                  <div className="flex space-x-2">
                    <button
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CVTable;
