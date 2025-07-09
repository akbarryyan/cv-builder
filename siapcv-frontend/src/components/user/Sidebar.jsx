import {
  LayoutDashboard,
  FileText,
  Pencil,
  Briefcase,
  Settings,
  Plus,
  Upload,
} from "lucide-react";

const menuItems = [
  {
    icon: <LayoutDashboard className="w-5 h-5 mr-3" />,
    label: "Dashboard",
    active: true,
  },
  {
    icon: <FileText className="w-5 h-5 mr-3" />,
    label: "My CVs",
    active: false,
  },
  {
    icon: <Pencil className="w-5 h-5 mr-3" />,
    label: "Templates",
    active: false,
  },
  {
    icon: <Briefcase className="w-5 h-5 mr-3" />,
    label: "Job Search",
    active: false,
  },
  {
    icon: <Settings className="w-5 h-5 mr-3" />,
    label: "Settings",
    active: false,
  },
];

const Sidebar = () => (
  <div className="w-full lg:w-1/4">
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col items-center">
        <img
          src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-purple-200 mb-4 object-cover"
        />
        <h3 className="text-xl font-bold">John Doe</h3>
        <p className="text-gray-600 mb-4">Web Developer</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: "75%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mb-6">Profile completeness: 75%</p>
      </div>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href="#"
              className={`flex items-center p-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6">
      <h4 className="font-bold text-lg mb-4">Quick Actions</h4>
      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium mb-3 hover:opacity-90 transition-opacity flex items-center justify-center">
        <Plus className="w-5 h-5 mr-2" /> Create New CV
      </button>
      <button className="w-full bg-white border border-purple-600 text-purple-600 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center">
        <Upload className="w-5 h-5 mr-2" /> Import Resume
      </button>
    </div>
  </div>
);

export default Sidebar;
