import { motion } from "motion/react";
import { Globe2, CheckCircle2, Clock, Circle } from "lucide-react";

export default function AdminLanguages() {
  const languages = [
    { name: "Tamil", status: "completed", progress: 100 },
    { name: "Telugu", status: "completed", progress: 100 },
    { name: "Hindi", status: "in-progress", progress: 75 },
    { name: "Kannada", status: "in-progress", progress: 50 },
    { name: "Malayalam", status: "not-started", progress: 0 },
    { name: "English", status: "completed", progress: 100 },
  ];

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-6 h-6 text-white" />;
    if (status === "in-progress") return <Clock className="w-6 h-6 text-white" />;
    return <Circle className="w-6 h-6 text-white" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "completed") return { gradient: "from-[#22C55E] to-[#10B981]", text: "Completed" };
    if (status === "in-progress") return { gradient: "from-[#FFD93D] to-[#F59E0B]", text: "In Progress" };
    return { gradient: "from-gray-300 to-gray-400", text: "Not Started" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Language Versions</h1>
        <p className="text-gray-600">Track localization progress for different languages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((lang, index) => {
          const statusInfo = getStatusColor(lang.status);
          
          return (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${statusInfo.gradient} flex items-center justify-center mb-4 mx-auto`}>
                {getStatusIcon(lang.status)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{lang.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-4">{statusInfo.text}</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${statusInfo.gradient} rounded-full transition-all`}
                  style={{ width: `${lang.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 text-center mt-2">{lang.progress}%</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
