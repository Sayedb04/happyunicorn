import { motion } from "motion/react";

export default function AdminDI() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">DI Tracker</h1>
        <p className="text-gray-600">Color grading and digital intermediate tracking</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 rounded-3xl bg-gradient-to-br from-[#Palette]/10 via-[#FF5DA2]/10 to-[#00D4FF]/10 border border-gray-100 text-center"
      >
        <p className="text-lg text-gray-600">DI Tracker module coming soon...</p>
      </motion.div>
    </div>
  );
}
