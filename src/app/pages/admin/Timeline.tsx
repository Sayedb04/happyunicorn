import { motion } from "motion/react";
import { 
  Clock, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  User,
  Calendar
} from "lucide-react";

export default function AdminTimeline() {
  const projects = [
    {
      id: 1,
      name: "Nike Summer Campaign",
      client: "Nike",
      currentStage: "Graphics",
      stages: [
        { name: "Prep", status: "completed", owner: "John Doe", deadline: "May 15", completion: 100 },
        { name: "Offline Edit", status: "completed", owner: "Sarah Chen", deadline: "May 22", completion: 100 },
        { name: "Director Cut", status: "completed", owner: "Mike Ross", deadline: "May 28", completion: 100 },
        { name: "Client Review", status: "completed", owner: "Sarah Chen", deadline: "Jun 2", completion: 100 },
        { name: "Graphics", status: "in-progress", owner: "Amy Wu", deadline: "Jun 10", completion: 65 },
        { name: "VFX", status: "pending", owner: "Tom Lee", deadline: "Jun 15", completion: 0 },
        { name: "DI", status: "pending", owner: "Lisa Park", deadline: "Jun 20", completion: 0 },
        { name: "Sound", status: "pending", owner: "James Kim", deadline: "Jun 25", completion: 0 },
        { name: "Delivery", status: "pending", owner: "John Doe", deadline: "Jun 30", completion: 0 },
      ]
    },
    {
      id: 2,
      name: "Apple iPhone 15 TVC",
      client: "Apple",
      currentStage: "Sound",
      stages: [
        { name: "Prep", status: "completed", owner: "Emily White", deadline: "May 10", completion: 100 },
        { name: "Offline Edit", status: "completed", owner: "David Brown", deadline: "May 18", completion: 100 },
        { name: "Director Cut", status: "completed", owner: "Mike Ross", deadline: "May 24", completion: 100 },
        { name: "Client Review", status: "completed", owner: "Emily White", deadline: "May 29", completion: 100 },
        { name: "Graphics", status: "completed", owner: "Amy Wu", deadline: "Jun 5", completion: 100 },
        { name: "VFX", status: "completed", owner: "Tom Lee", deadline: "Jun 8", completion: 100 },
        { name: "DI", status: "completed", owner: "Lisa Park", deadline: "Jun 12", completion: 100 },
        { name: "Sound", status: "in-progress", owner: "James Kim", deadline: "Jun 15", completion: 80 },
        { name: "Delivery", status: "pending", owner: "Emily White", deadline: "Jun 18", completion: 0 },
      ]
    },
  ];

  const getStageColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#22C55E]";
      case "in-progress":
        return "bg-[#FFD93D]";
      case "at-risk":
        return "bg-[#F59E0B]";
      case "delayed":
        return "bg-[#EF4444]";
      default:
        return "bg-gray-300";
    }
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-white" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-white" />;
      case "at-risk":
        return <AlertCircle className="w-5 h-5 text-white" />;
      default:
        return <Circle className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Master Timeline</h1>
        <p className="text-gray-600">Cinematic workflow timeline for all active projects</p>
      </div>

      {/* Projects Timeline */}
      {projects.map((project, projectIndex) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: projectIndex * 0.2 }}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
        >
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{project.name}</h2>
                <p className="text-gray-600">{project.client}</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 border border-[#FFD93D]/30">
                <p className="text-sm font-semibold text-gray-900">
                  Current: <span className="text-[#FF5DA2]">{project.currentStage}</span>
                </p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] rounded-full transition-all"
                style={{ 
                  width: `${(project.stages.filter(s => s.status === "completed").length / project.stages.length) * 100}%` 
                }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {project.stages.filter(s => s.status === "completed").length} of {project.stages.length} stages completed
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200" />
            <div 
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] transition-all"
              style={{ 
                width: `${(project.stages.filter(s => s.status === "completed").length / project.stages.length) * 100}%` 
              }}
            />

            {/* Timeline Stages */}
            <div className="relative grid grid-cols-3 lg:grid-cols-9 gap-4">
              {project.stages.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: projectIndex * 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="relative"
                >
                  {/* Stage Card */}
                  <div className={`p-4 rounded-2xl border-2 transition-all ${
                    stage.status === "completed" 
                      ? "bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 border-[#22C55E]/30"
                      : stage.status === "in-progress"
                      ? "bg-gradient-to-br from-[#FFD93D]/10 to-[#FF5DA2]/10 border-[#FFD93D]/30 shadow-lg"
                      : "bg-white border-gray-200"
                  }`}>
                    {/* Stage Icon */}
                    <div className={`w-12 h-12 rounded-xl ${getStageColor(stage.status)} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      {getStageIcon(stage.status)}
                    </div>

                    {/* Stage Name */}
                    <p className="text-sm font-semibold text-gray-900 text-center mb-1">
                      {stage.name}
                    </p>

                    {/* Completion % */}
                    {stage.status !== "pending" && (
                      <div className="mb-2">
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              stage.status === "completed" ? "bg-[#22C55E]" : "bg-[#FFD93D]"
                            } rounded-full transition-all`}
                            style={{ width: `${stage.completion}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 text-center mt-1">
                          {stage.completion}%
                        </p>
                      </div>
                    )}

                    {/* Owner */}
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <User className="w-3 h-3 text-gray-500" />
                      <p className="text-xs text-gray-600 truncate">{stage.owner}</p>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-1 justify-center">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <p className="text-xs text-gray-600">{stage.deadline}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22C55E] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Completed</p>
              <p className="text-xs text-gray-600">100% done</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD93D] flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">In Progress</p>
              <p className="text-xs text-gray-600">Currently working</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">At Risk</p>
              <p className="text-xs text-gray-600">Needs attention</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-300 flex items-center justify-center">
              <Circle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Pending</p>
              <p className="text-xs text-gray-600">Not started</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
