import { motion } from "motion/react";
import { 
  FolderKanban, 
  Clock, 
  MessageSquare, 
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Play
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Projects",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: FolderKanban,
      gradient: "from-[#FFD93D] to-[#F59E0B]"
    },
    {
      label: "Active Projects",
      value: "8",
      change: "+3",
      trend: "up",
      icon: Clock,
      gradient: "from-[#FF5DA2] to-[#EF4444]"
    },
    {
      label: "Pending Reviews",
      value: "15",
      change: "-5",
      trend: "down",
      icon: MessageSquare,
      gradient: "from-[#00D4FF] to-[#0EA5E9]"
    },
    {
      label: "Completed Deliverables",
      value: "142",
      change: "+28%",
      trend: "up",
      icon: Package,
      gradient: "from-[#8B5CF6] to-[#A855F7]"
    },
  ];

  const projectStatusData = [
    { name: "Prep", value: 3, color: "#FFD93D" },
    { name: "Offline Edit", value: 5, color: "#FF5DA2" },
    { name: "Client Review", value: 4, color: "#00D4FF" },
    { name: "VFX", value: 2, color: "#8B5CF6" },
    { name: "DI", value: 3, color: "#22C55E" },
    { name: "Sound", value: 2, color: "#F59E0B" },
    { name: "Delivery", value: 5, color: "#EF4444" },
  ];

  const monthlyDeliveries = [
    { month: "Jan", deliveries: 12 },
    { month: "Feb", deliveries: 18 },
    { month: "Mar", deliveries: 15 },
    { month: "Apr", deliveries: 22 },
    { month: "May", deliveries: 28 },
    { month: "Jun", deliveries: 24 },
  ];

  const approvalTrends = [
    { week: "Week 1", approved: 8, rejected: 2, pending: 5 },
    { week: "Week 2", approved: 12, rejected: 1, pending: 3 },
    { week: "Week 3", approved: 10, rejected: 3, pending: 4 },
    { week: "Week 4", approved: 15, rejected: 1, pending: 2 },
  ];

  const recentActivity = [
    {
      type: "upload",
      project: "Nike Summer Campaign",
      message: "V3 uploaded by John Doe",
      time: "5 mins ago",
      status: "success"
    },
    {
      type: "review",
      project: "Apple iPhone 15 TVC",
      message: "Client approved final cut",
      time: "12 mins ago",
      status: "success"
    },
    {
      type: "comment",
      project: "Samsung Galaxy Launch",
      message: "New comment by Sarah Chen",
      time: "23 mins ago",
      status: "info"
    },
    {
      type: "deadline",
      project: "Tesla Model Y Promo",
      message: "Deadline approaching in 2 hours",
      time: "1 hour ago",
      status: "warning"
    },
    {
      type: "delivery",
      project: "BMW X5 Campaign",
      message: "All platforms delivered",
      time: "2 hours ago",
      status: "success"
    },
  ];

  const upcomingDeadlines = [
    {
      project: "Nike Summer Campaign",
      task: "Final DI",
      deadline: "Today, 6:00 PM",
      priority: "high",
      progress: 85
    },
    {
      project: "Apple iPhone 15 TVC",
      task: "Sound Mix",
      deadline: "Tomorrow, 2:00 PM",
      priority: "medium",
      progress: 60
    },
    {
      project: "Samsung Galaxy Launch",
      task: "Motion Graphics",
      deadline: "Jun 12, 10:00 AM",
      priority: "medium",
      progress: 40
    },
    {
      project: "Tesla Model Y Promo",
      task: "Client Review",
      deadline: "Jun 13, 4:00 PM",
      priority: "low",
      progress: 25
    },
  ];

  const projectHealth = [
    {
      project: "Nike Summer Campaign",
      client: "Nike",
      status: "On Track",
      health: 90,
      color: "#22C55E"
    },
    {
      project: "Apple iPhone 15 TVC",
      client: "Apple",
      status: "On Track",
      health: 85,
      color: "#22C55E"
    },
    {
      project: "Samsung Galaxy Launch",
      client: "Samsung",
      status: "At Risk",
      health: 65,
      color: "#F59E0B"
    },
    {
      project: "Tesla Model Y Promo",
      client: "Tesla",
      status: "Delayed",
      health: 45,
      color: "#EF4444"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <div className="h-full p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-[#22C55E]" : "text-[#FF5DA2]"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Project Status Overview</h3>
              <p className="text-sm text-gray-600">Current stage distribution</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {projectStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Deliveries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Monthly Deliveries</h3>
              <p className="text-sm text-gray-600">Completed deliverables per month</p>
            </div>
            <TrendingUp className="w-5 h-5 text-[#22C55E]" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyDeliveries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="deliveries" fill="url(#colorGradient)" radius={[10, 10, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD93D" />
                  <stop offset="100%" stopColor="#FF5DA2" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Approval Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Client Approval Trends</h3>
            <p className="text-sm text-gray-600">Weekly approval statistics</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={approvalTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="approved" 
              stroke="#22C55E" 
              strokeWidth={3}
              dot={{ fill: "#22C55E", r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="rejected" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: "#EF4444", r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="pending" 
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ fill: "#F59E0B", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Activity and Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <button className="text-sm font-semibold text-[#FF5DA2] hover:text-[#8B5CF6] transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === "success" ? "bg-[#22C55E]" :
                  activity.status === "warning" ? "bg-[#F59E0B]" :
                  "bg-[#00D4FF]"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {activity.project}
                  </p>
                  <p className="text-sm text-gray-600">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Upcoming Deadlines</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl border border-gray-100 hover:border-[#FFD93D] hover:bg-gradient-to-r hover:from-[#FFD93D]/5 hover:to-[#FF5DA2]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.project}</p>
                    <p className="text-sm text-gray-600">{item.task}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    item.priority === "high" ? "bg-[#EF4444]/10 text-[#EF4444]" :
                    item.priority === "medium" ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                    "bg-[#22C55E]/10 text-[#22C55E]"
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{item.deadline}</p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Health Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Project Health Overview</h3>
            <p className="text-sm text-gray-600">Overall project status and health scores</p>
          </div>
        </div>
        <div className="space-y-4">
          {projectHealth.map((project, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl border border-gray-100 hover:border-[#FFD93D] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{project.project}</p>
                  <p className="text-xs text-gray-600">{project.client}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="px-3 py-1 rounded-xl text-sm font-semibold"
                    style={{ 
                      backgroundColor: `${project.color}20`,
                      color: project.color
                    }}
                  >
                    {project.status}
                  </span>
                  <span className="text-sm font-bold text-gray-900">{project.health}%</span>
                </div>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${project.health}%`,
                    backgroundColor: project.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
