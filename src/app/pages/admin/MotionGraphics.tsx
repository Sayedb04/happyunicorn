import { motion } from "motion/react";
import { Wand2 } from "lucide-react";

export default function AdminMotionGraphics() {
  const tasks = [
    { name: "Supers", status: "completed", completion: 100 },
    { name: "CTA", status: "in-progress", completion: 70 },
    { name: "Logo Reveal", status: "in-progress", completion: 45 },
    { name: "End Cards", status: "pending", completion: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Motion Graphics</h1>
        <p className="text-gray-600">Track motion graphics tasks and deliverables</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                task.status === "completed" ? "from-[#22C55E] to-[#10B981]" :
                task.status === "in-progress" ? "from-[#FFD93D] to-[#F59E0B]" :
                "from-gray-300 to-gray-400"
              } flex items-center justify-center`}>
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{task.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{task.status}</p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${
                  task.status === "completed" ? "from-[#22C55E] to-[#10B981]" :
                  task.status === "in-progress" ? "from-[#FFD93D] to-[#F59E0B]" :
                  "from-gray-300 to-gray-400"
                } rounded-full`}
                style={{ width: `${task.completion}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-right mt-2">{task.completion}%</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
