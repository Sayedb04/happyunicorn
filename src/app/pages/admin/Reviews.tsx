import { motion } from "motion/react";

export default function AdminReviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Client Reviews</h1>
        <p className="text-gray-600">Manage client feedback and review comments</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 rounded-3xl bg-gradient-to-br from-[#FFD93D]/10 via-[#FF5DA2]/10 to-[#00D4FF]/10 border border-gray-100 text-center"
      >
        <p className="text-lg text-gray-600">Client Reviews module coming soon...</p>
      </motion.div>
    </div>
  );
}
