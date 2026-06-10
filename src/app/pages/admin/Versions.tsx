import { motion } from "motion/react";
import { FileVideo, Download, Eye, MessageSquare, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function AdminVersions() {
  const versions = [
    {
      version: "V3",
      project: "Nike Summer Campaign",
      uploadDate: "Jun 10, 2026 2:30 PM",
      reviewer: "Mike Johnson",
      status: "Approved",
      comments: 3,
      thumbnail: "gradient-1"
    },
    {
      version: "V2",
      project: "Nike Summer Campaign",
      uploadDate: "Jun 8, 2026 10:15 AM",
      reviewer: "Sarah Chen",
      status: "Changes Requested",
      comments: 8,
      thumbnail: "gradient-2"
    },
    {
      version: "V1",
      project: "Nike Summer Campaign",
      uploadDate: "Jun 5, 2026 4:45 PM",
      reviewer: "Mike Johnson",
      status: "Rejected",
      comments: 12,
      thumbnail: "gradient-3"
    },
    {
      version: "Final",
      project: "Apple iPhone 15 TVC",
      uploadDate: "Jun 9, 2026 11:30 AM",
      reviewer: "Emily White",
      status: "Approved",
      comments: 2,
      thumbnail: "gradient-4"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return { bg: "bg-[#22C55E]/10", text: "text-[#22C55E]", icon: CheckCircle2 };
      case "Changes Requested":
        return { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", icon: Clock };
      case "Rejected":
        return { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", icon: XCircle };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600", icon: Clock };
    }
  };

  const gradients = {
    "gradient-1": "from-[#FFD93D] to-[#F59E0B]",
    "gradient-2": "from-[#FF5DA2] to-[#EF4444]",
    "gradient-3": "from-[#00D4FF] to-[#0EA5E9]",
    "gradient-4": "from-[#8B5CF6] to-[#A855F7]",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Version Tracker</h1>
        <p className="text-gray-600">Manage and review all project versions</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {versions.map((version, index) => {
          const statusInfo = getStatusColor(version.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-6">
                {/* Thumbnail */}
                <div className={`w-32 h-20 rounded-2xl bg-gradient-to-br ${gradients[version.thumbnail as keyof typeof gradients]} flex items-center justify-center flex-shrink-0`}>
                  <FileVideo className="w-8 h-8 text-white" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{version.project}</h3>
                      <p className="text-sm text-gray-600">{version.uploadDate}</p>
                    </div>
                    <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 text-lg font-bold text-gray-900">
                      {version.version}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center text-white text-xs font-semibold">
                        {version.reviewer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-600">{version.reviewer}</span>
                    </div>

                    <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${statusInfo.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                      <span className={`text-sm font-semibold ${statusInfo.text}`}>
                        {version.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MessageSquare className="w-4 h-4" />
                      {version.comments} comments
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gray-100 hover:bg-gradient-to-r hover:from-[#FFD93D]/20 hover:to-[#FF5DA2]/20 transition-all"
                  >
                    <Eye className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-gray-100 hover:bg-gradient-to-r hover:from-[#FFD93D]/20 hover:to-[#FF5DA2]/20 transition-all"
                  >
                    <Download className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
