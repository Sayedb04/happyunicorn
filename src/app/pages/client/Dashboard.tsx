import { motion } from "motion/react";
import { 
  Play, 
  Clock, 
  FileVideo, 
  MessageSquare, 
  CheckCircle2,
  Calendar,
  TrendingUp,
  Download,
  Eye,
  User
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ClientDashboard() {
  const project = {
    name: "Nike Summer Campaign",
    client: "Nike",
    agency: "Wieden+Kennedy",
    producer: "John Doe",
    director: "Christopher Nolan",
    shootDate: "May 15, 2026",
    deliveryDate: "Jun 30, 2026",
    currentStage: "Motion Graphics",
    status: "On Track",
    progress: 65,
    health: 90,
  };

  const timeline = [
    { stage: "Prep", status: "completed", completion: 100 },
    { stage: "Offline Edit", status: "completed", completion: 100 },
    { stage: "Director Cut", status: "completed", completion: 100 },
    { stage: "Client Review", status: "completed", completion: 100 },
    { stage: "Graphics", status: "in-progress", completion: 65 },
    { stage: "VFX", status: "pending", completion: 0 },
    { stage: "DI", status: "pending", completion: 0 },
    { stage: "Sound", status: "pending", completion: 0 },
    { stage: "Delivery", status: "pending", completion: 0 },
  ];

  const versions = [
    {
      version: "V3",
      uploadDate: "Jun 10, 2026",
      status: "Pending Review",
      comments: 0
    },
    {
      version: "V2",
      uploadDate: "Jun 8, 2026",
      status: "Approved",
      comments: 8
    },
    {
      version: "V1",
      uploadDate: "Jun 5, 2026",
      status: "Changes Requested",
      comments: 12
    },
  ];

  const recentActivity = [
    {
      message: "V3 uploaded - Ready for review",
      time: "5 mins ago",
      type: "upload"
    },
    {
      message: "Motion Graphics 65% complete",
      time: "2 hours ago",
      type: "progress"
    },
    {
      message: "V2 approved by client",
      time: "2 days ago",
      type: "approval"
    },
    {
      message: "Client Review stage completed",
      time: "3 days ago",
      type: "milestone"
    },
  ];

  const progressData = [
    { week: "Week 1", progress: 15 },
    { week: "Week 2", progress: 30 },
    { week: "Week 3", progress: 45 },
    { week: "Week 4", progress: 65 },
  ];

  const deliverables = [
    { platform: "TVC", status: "In Progress", progress: 65 },
    { platform: "YouTube", status: "Pending", progress: 0 },
    { platform: "Instagram", status: "Pending", progress: 0 },
    { platform: "Meta", status: "Pending", progress: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] p-8 text-white"
      >
        {/* Background Blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="font-semibold">{project.client}</span>
                <span>•</span>
                <span>{project.agency}</span>
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
              <p className="text-sm font-semibold">{project.status}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-white/70 text-sm mb-1">Current Stage</p>
              <p className="text-lg font-bold">{project.currentStage}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-white/70 text-sm mb-1">Progress</p>
              <p className="text-lg font-bold">{project.progress}%</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-white/70 text-sm mb-1">Shoot Date</p>
              <p className="text-lg font-bold">{project.shootDate}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <p className="text-white/70 text-sm mb-1">Delivery</p>
              <p className="text-lg font-bold">{project.deliveryDate}</p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-6">
            <div className="w-full h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Project Progress</h2>
            <p className="text-sm text-gray-600">Weekly completion tracking</p>
          </div>
          <TrendingUp className="w-6 h-6 text-[#22C55E]" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="progress" 
              stroke="url(#colorGradient)" 
              strokeWidth={3}
              dot={{ fill: "#FF5DA2", r: 5 }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFD93D" />
                <stop offset="50%" stopColor="#FF5DA2" />
                <stop offset="100%" stopColor="#00D4FF" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Production Timeline</h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200" />
          <div 
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] transition-all"
            style={{ 
              width: `${(timeline.filter(s => s.status === "completed").length / timeline.length) * 100}%` 
            }}
          />

          {/* Timeline Stages */}
          <div className="relative grid grid-cols-3 lg:grid-cols-9 gap-4">
            {timeline.map((stage, index) => (
              <div key={index} className="relative">
                <div className={`p-3 rounded-2xl border-2 transition-all ${
                  stage.status === "completed" 
                    ? "bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 border-[#22C55E]/30"
                    : stage.status === "in-progress"
                    ? "bg-gradient-to-br from-[#FFD93D]/10 to-[#FF5DA2]/10 border-[#FFD93D]/30"
                    : "bg-white border-gray-200"
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                    stage.status === "completed" ? "bg-[#22C55E]" :
                    stage.status === "in-progress" ? "bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2]" :
                    "bg-gray-300"
                  }`}>
                    {stage.status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : stage.status === "in-progress" ? (
                      <Clock className="w-6 h-6 text-white" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-900 text-center">{stage.stage}</p>
                  {stage.completion > 0 && (
                    <p className="text-xs text-gray-600 text-center">{stage.completion}%</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Versions and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Versions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Versions</h2>
            <FileVideo className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl border border-gray-100 hover:border-[#FFD93D] hover:bg-gradient-to-r hover:from-[#FFD93D]/5 hover:to-[#FF5DA2]/5 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{version.version}</p>
                    <p className="text-xs text-gray-600">{version.uploadDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-sm font-semibold ${
                    version.status === "Approved" ? "bg-[#22C55E]/10 text-[#22C55E]" :
                    version.status === "Pending Review" ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                    "bg-[#EF4444]/10 text-[#EF4444]"
                  }`}>
                    {version.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{version.comments} comments</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 hover:from-[#FFD93D]/30 hover:to-[#FF5DA2]/30 transition-all font-semibold text-sm flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all font-semibold text-sm flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "approval" ? "bg-[#22C55E]" :
                  activity.type === "upload" ? "bg-[#00D4FF]" :
                  activity.type === "milestone" ? "bg-[#FFD93D]" :
                  "bg-[#8B5CF6]"
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Deliverables */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Deliverables by Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deliverables.map((deliverable, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl border border-gray-100 hover:border-[#FFD93D] transition-all"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">{deliverable.platform}</h3>
              <p className="text-sm text-gray-600 mb-3">{deliverable.status}</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    deliverable.progress > 0 
                      ? "bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2]" 
                      : "bg-gray-300"
                  }`}
                  style={{ width: `${deliverable.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">{deliverable.progress}%</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Project Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Producer</p>
              <p className="font-semibold text-gray-900">{project.producer}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Director</p>
              <p className="font-semibold text-gray-900">{project.director}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#FF5DA2] flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Agency</p>
              <p className="font-semibold text-gray-900">{project.agency}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
