import { motion } from "motion/react";

export default function AdminApprovals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Approval Center</h1>
        <p className="text-gray-600">Manage approval workflows and stakeholder sign-offs</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 rounded-3xl bg-gradient-to-br from-[#22C55E]/10 via-[#FFD93D]/10 to-[#FF5DA2]/10 border border-gray-100 text-center"
      >
        <p className="text-lg text-gray-600">Approval Center module coming soon...</p>
      </motion.div>
    </div>
  );
}
