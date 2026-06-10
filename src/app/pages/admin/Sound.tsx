import { motion } from "motion/react";

export default function AdminSound() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Sound Tracker</h1>
        <p className="text-gray-600">Audio production and sound design tracking</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 rounded-3xl bg-gradient-to-br from-[#00D4FF]/10 via-[#8B5CF6]/10 to-[#FFD93D]/10 border border-gray-100 text-center"
      >
        <p className="text-lg text-gray-600">Sound Tracker module coming soon...</p>
      </motion.div>
    </div>
  );
}
