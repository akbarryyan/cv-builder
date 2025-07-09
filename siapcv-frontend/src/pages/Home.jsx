import Navbar from "../components/user/Navbar";
import Sidebar from "../components/user/Sidebar";
import StatsCard from "../components/user/StatsCard";
import CVTable from "../components/user/CVTable";
import ProgressSection from "../components/user/ProgressSection";
import TemplatesSection from "../components/user/TemplatesSection";
import Footer from "../components/user/Footer";
import { FileText, Palette, Eye, Briefcase } from "lucide-react";

function Home() {
  const statsData = [
    {
      title: "CVs Created",
      value: "5",
      icon: <FileText className="w-6 h-6" />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "up",
      trendText: "2 new this month",
    },
    {
      title: "Templates Used",
      value: "3",
      icon: <Palette className="w-6 h-6" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "neutral",
      trendText: "Last used: Modern",
    },
    {
      title: "Profile Views",
      value: "124",
      icon: <Eye className="w-6 h-6" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: "up",
      trendText: "12% from last week",
    },
    {
      title: "Job Applications",
      value: "8",
      icon: <Briefcase className="w-6 h-6" />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      trend: "neutral",
      trendText: "2 interviews scheduled",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar />

          {/* Main Dashboard */}
          <div className="w-full lg:w-3/4">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 mb-6 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
                <p className="mb-4 opacity-90">
                  Ready to create your next amazing resume?
                </p>
                <button className="bg-white text-purple-700 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                  Start Building Now
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-20">
                <i className="fas fa-file-alt text-9xl"></i>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Recent CVs */}
            <CVTable />

            {/* CV Progress & Templates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProgressSection />
              <TemplatesSection />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
