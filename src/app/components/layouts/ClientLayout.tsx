import { Outlet, Link } from "react-router";
import { motion } from "motion/react";
import { Eye, LogOut } from "lucide-react";
import { Logo } from "../Logo";

export default function ClientLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="h-full px-6 flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/client" className="flex items-center gap-3">
            <Logo className="h-8 w-auto" />
            <p className="text-xs text-gray-600">Client Portal</p>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FFD93D]/10 to-[#FF5DA2]/10 border border-[#FFD93D]/20">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-900">View Only</span>
            </div>

            <div className="w-px h-6 bg-gray-200"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Client User</p>
                <p className="text-xs text-gray-600">Nike</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] flex items-center justify-center text-white font-semibold">
                CU
              </div>
            </div>

            <Link
              to="/login"
              className="hidden sm:flex p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
