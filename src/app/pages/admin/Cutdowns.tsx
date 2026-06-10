import { motion } from "motion/react";
import { Clock, CheckCircle2, Circle } from "lucide-react";

export default function AdminCutdowns() {
  const cutdowns = [
    { duration: "60s", status: "completed", progress: 100 },
    { duration: "45s", status: "completed", progress: 100 },
    { duration: "30s", status: "in-progress", progress: 75 },
    { duration: "20s", status: "in-progress", progress: 60 },
    { duration: "15s", status: "pending", progress: 0 },
    { duration: "10s", status: "pending", progress: 0 },
    { duration: "6s", status: "pending", progress: 0 },
  ];

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-6 h-6 text-white" />;
    if (status === "in-progress") return <Clock className="w-6 h-6 text-white" />;
    return <Circle className="w-6 h-6 text-white" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "completed") return "from-[#22C55E] to-[#10B981]";
    if (status === "in-progress") return "from-[#FFD93D] to-[#F59E0B]";
    return "from-gray-300 to-gray-400";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Cutdown Management</h1>
        <p className="text-gray-600">Track different duration versions of your projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cutdowns.map((cutdown, index) => (
          <motion.div
            key={cutdown.duration}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getStatusColor(cutdown.status)} flex items-center justify-center mb-4 mx-auto`}>
              {getStatusIcon(cutdown.status)}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{cutdown.duration}</h3>
            <p className="text-sm text-gray-600 text-center capitalize mb-4">{cutdown.status}</p>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getStatusColor(cutdown.status)} rounded-full transition-all`}
                style={{ width: `${cutdown.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">{cutdown.progress}% complete</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
