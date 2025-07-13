import { useState, useEffect } from "react";
import {
  FileText,
  Bell,
  LogOut,
  Settings,
  CircleUserRound,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({
  showBackButton = false,
  backButtonText = "Back",
  backButtonPath = "/",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggingOut(false);
      toast.success("You have been logged out.");
      navigate("/login");
    }, 900);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <FileText className="text-2xl text-purple-700 flex-shrink-0" />
            <span className="font-bold text-xl text-gray-800 tracking-tight truncate">
              SiapCV
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 mt-2 sm:mt-0">
            {showBackButton && (
              <button
                onClick={() => navigate(backButtonPath)}
                className="flex items-center space-x-1 px-2 py-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">{backButtonText}</span>
              </button>
            )}
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-purple-50 transition-colors group focus:outline-none">
                <Bell className="text-purple-600 group-hover:text-purple-800" />
                <span className="absolute top-1 right-0 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
              </button>
            </div>
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none group min-w-0"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="User menu"
              >
                <img
                  src={
                    user?.photo_url ||
                    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-purple-600 object-cover shadow-sm group-hover:border-purple-800 flex-shrink-0"
                />
                <ChevronDown className="text-purple-600 group-hover:text-purple-800 text-xs flex-shrink-0" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-52 bg-white rounded-md shadow-xl py-1 z-20 border border-gray-100 transition-all duration-100 min-w-[160px]">
                  <a
                    href="#"
                    className="px-4 py-2 text-gray-800 hover:bg-purple-50 flex items-center transition-colors"
                  >
                    <CircleUserRound className="mr-2 text-purple-600" />
                    Profile
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 text-gray-800 hover:bg-purple-50 flex items-center transition-colors"
                  >
                    <Settings className="mr-2 text-purple-600" />
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-50 flex items-center transition-colors disabled:opacity-60"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-4 w-4 mr-2 text-purple-600"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Logging out...
                      </span>
                    ) : (
                      <>
                        <LogOut className="mr-2 text-purple-600" />
                        Logout
                      </>
                    )}
                  </button>
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
