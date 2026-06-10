import { motion } from "motion/react";

export default function AdminClients() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Clients</h1>
        <p className="text-gray-600">Manage client relationships and contacts</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 rounded-3xl bg-gradient-to-br from-[#8B5CF6]/10 via-[#FF5DA2]/10 to-[#FFD93D]/10 border border-gray-100 text-center"
      >
        <p className="text-lg text-gray-600">Clients module coming soon...</p>
      </motion.div>
    </div>
  );
}
