import { motion } from "motion/react";
import { Search, Filter, Plus, Play, Calendar, User, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import NewProjectModal, { NewProjectFormData } from "../../components/admin/NewProjectModal";

export default function AdminProjects() {
  const navigate = useNavigate();
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [draft, setDraft] = useState<NewProjectFormData | null>(null);
  const projects = [
    {
      id: 1,
      name: "Nike Summer Campaign",
      client: "Nike",
      agency: "Wieden+Kennedy",
      producer: "John Doe",
      director: "Christopher Nolan",
      shootDate: "May 15, 2026",
      deliveryDate: "Jun 30, 2026",
      stage: "Motion Graphics",
      status: "On Track",
      progress: 65,
      health: 90,
      healthColor: "#22C55E"
    },
    {
      id: 2,
      name: "Apple iPhone 15 TVC",
      client: "Apple",
      agency: "TBWA\\Media Arts Lab",
      producer: "Sarah Chen",
      director: "Ridley Scott",
      shootDate: "May 10, 2026",
      deliveryDate: "Jun 18, 2026",
      stage: "Sound Design",
      status: "On Track",
      progress: 85,
      health: 92,
      healthColor: "#22C55E"
    },
    {
      id: 3,
      name: "Samsung Galaxy Launch",
      client: "Samsung",
      agency: "Leo Burnett",
      producer: "Mike Ross",
      director: "Denis Villeneuve",
      shootDate: "Jun 1, 2026",
      deliveryDate: "Jun 25, 2026",
      stage: "VFX",
      status: "At Risk",
      progress: 45,
      health: 65,
      healthColor: "#F59E0B"
    },
    {
      id: 4,
      name: "Tesla Model Y Promo",
      client: "Tesla",
      agency: "Droga5",
      producer: "Emily White",
      director: "James Cameron",
      shootDate: "Jun 5, 2026",
      deliveryDate: "Jun 28, 2026",
      stage: "Client Review",
      status: "Delayed",
      progress: 35,
      health: 45,
      healthColor: "#EF4444"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Active Projects</h1>
          <p className="text-gray-600">Manage and track all your production projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setNewProjectModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white font-semibold shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Project
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, clients, directors..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-[#FFD93D] focus:ring-2 focus:ring-[#FFD93D]/20 outline-none transition-all"
          />
        </div>
        <button className="px-6 py-3 rounded-2xl bg-white border border-gray-200 hover:border-[#FFD93D] transition-all flex items-center gap-2 font-semibold">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            onClick={() => navigate(`/admin/projects/${project.id}`)}
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <div
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >
              {/* Project Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center flex-shrink-0">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold">{project.client}</span>
                      <span>•</span>
                      <span>{project.agency}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <User className="w-3 h-3" />
                      Producer
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{project.producer}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <User className="w-3 h-3" />
                      Director
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{project.director}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      Shoot Date
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{project.shootDate}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      Delivery
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{project.deliveryDate}</p>
                  </div>
                </div>
              </div>

              {/* Status and Progress */}
              <div className="lg:w-64 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Stage</span>
                  <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 text-sm font-semibold text-gray-900">
                    {project.stage}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span
                    className="px-3 py-1 rounded-xl text-sm font-semibold"
                    style={{
                      backgroundColor: `${project.healthColor}20`,
                      color: project.healthColor
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Health Score</span>
                    <span className="text-sm font-bold text-gray-900">{project.health}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${project.health}%`,
                        backgroundColor: project.healthColor
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <NewProjectModal
        open={newProjectModalOpen}
        onOpenChange={setNewProjectModalOpen}
        initialValues={draft ?? undefined}
        onOk={(data) => {
          const params = new URLSearchParams({
            client: data.client,
            agency: data.agency,
            director: data.director,
            producer: data.producer,
            editor: data.editor,
            dop: data.dop,
            startdate: data.startdate,
            enddate: data.enddate,
            versions: data.versions,
            cutdowns: data.cutdowns,
          });

          setDraft(data);
          setNewProjectModalOpen(false);
          navigate(`/admin/projects/new?${params.toString()}`);
        }}
      />
    </div>
  );
}

