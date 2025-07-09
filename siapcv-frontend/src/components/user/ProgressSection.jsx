import { useEffect, useState } from "react";

const ProgressSection = () => {
  const [animatedProgress, setAnimatedProgress] = useState(false);

  const progressData = [
    { label: "Personal Information", percentage: 90, color: "bg-green-500" },
    { label: "Work Experience", percentage: 75, color: "bg-blue-500" },
    { label: "Education", percentage: 60, color: "bg-purple-500" },
    { label: "Skills", percentage: 45, color: "bg-yellow-500" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold mb-6">CV Completion Progress</h3>
      <div className="space-y-4">
        {progressData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="font-medium">{item.label}</span>
              <span className="text-sm text-gray-500">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{
                  width: animatedProgress ? `${item.percentage}%` : "0%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSection;
