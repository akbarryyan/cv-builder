import { useState } from "react";
import { FileText, Bell } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="text-2xl" />
            <span className="font-bold text-xl">SiapCV</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
                <Bell />
                <span className="absolute top-1 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <span className="font-medium">John Doe</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <i className="fas fa-user mr-2"></i>Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <i className="fas fa-cog mr-2"></i>Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
