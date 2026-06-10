import { Outlet, Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { 
  LayoutDashboard,
  FolderKanban,
  Clock,
  FileVideo,
  MessageSquare,
  Scissors,
  Wand2,
  Sparkles,
  Palette,
  Music,
  Globe2,
  CheckCircle2,
  Package,
  Activity,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { Logo } from "../Logo";

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/projects", label: "Active Projects", icon: FolderKanban },
    { path: "/admin/timeline", label: "Timeline", icon: Clock },
    { path: "/admin/versions", label: "Versions", icon: FileVideo },
    { path: "/admin/reviews", label: "Client Reviews", icon: MessageSquare },
    { path: "/admin/cutdowns", label: "Cutdowns", icon: Scissors },
    { path: "/admin/motion-graphics", label: "Motion Graphics", icon: Wand2 },
    { path: "/admin/vfx", label: "VFX", icon: Sparkles },
    { path: "/admin/di", label: "DI", icon: Palette },
    { path: "/admin/sound", label: "Sound", icon: Music },
    { path: "/admin/languages", label: "Languages", icon: Globe2 },
    { path: "/admin/approvals", label: "Approvals", icon: CheckCircle2 },
    { path: "/admin/deliverables", label: "Deliverables", icon: Package },
    { path: "/admin/activity", label: "Activity Feed", icon: Activity },
    { path: "/admin/clients", label: "Clients", icon: Users },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link to="/admin">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, clients, files..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FFD93D] focus:ring-2 focus:ring-[#FFD93D]/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF5DA2] rounded-full"></span>
            </button>

            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center text-white font-semibold">
                AU
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

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-full overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 text-gray-900 font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-[#FF5DA2]" : ""}`} />
                  {(sidebarOpen || mobileMenuOpen) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
