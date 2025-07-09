import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon,      // langsung elemen icon, contoh: <FileText className="w-6 h-6" />
  iconBg,
  iconColor,
  trend,     // "up", "down", "neutral"
  trendText,
}) => {
  // Pilih ikon trend berdasarkan props
  const trendIcon =
    trend === "up" ? (
      <ArrowUpRight className="inline w-4 h-4 mr-1" />
    ) : trend === "down" ? (
      <ArrowDownRight className="inline w-4 h-4 mr-1" />
    ) : (
      <Minus className="inline w-4 h-4 mr-1" />
    );

  // Pilih warna trend
  const trendColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`${iconBg} p-3 rounded-lg ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className={`text-sm font-medium ${trendColor}`}>
          {trendIcon}
          {trendText}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
