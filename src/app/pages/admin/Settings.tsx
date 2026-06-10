import { motion } from "motion/react";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your platform preferences</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-12 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 text-center"
      >
        <p className="text-lg text-gray-600">Settings module coming soon...</p>
      </motion.div>
    </div>
  );
}
