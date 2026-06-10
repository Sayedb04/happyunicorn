import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
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
  Languages,
  CheckCircle,
  Package,
  Activity,
  Users,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Logo } from "../components/Logo";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: FolderKanban, label: "Active Projects", path: "/admin/projects" },
  { icon: Clock, label: "Timeline", path: "/admin/timeline" },
  { icon: FileVideo, label: "Versions", path: "/admin/versions" },
  { icon: MessageSquare, label: "Client Reviews", path: "/admin/reviews" },
  { icon: Scissors, label: "Cutdowns", path: "/admin/cutdowns" },
  { icon: Wand2, label: "Motion Graphics", path: "/admin/motion-graphics" },
  { icon: Sparkles, label: "VFX", path: "/admin/vfx" },
  { icon: Palette, label: "DI", path: "/admin/di" },
  { icon: Music, label: "Sound", path: "/admin/sound" },
  { icon: Languages, label: "Languages", path: "/admin/languages" },
  { icon: CheckCircle, label: "Approvals", path: "/admin/approvals" },
  { icon: Package, label: "Deliverables", path: "/admin/deliverables" },
  { icon: Activity, label: "Activity Feed", path: "/admin/activity" },
  { icon: Users, label: "Clients", path: "/admin/clients" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-soft-background">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-2 hover:bg-soft-background rounded-[12px] transition-colors"
              >
                {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-soft-background rounded-[12px] transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link to="/admin">
                <Logo className="h-8 w-auto" />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-soft-background px-4 py-2 rounded-[12px] w-80">
                <Search className="w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>

              <button className="relative p-2 hover:bg-soft-background rounded-[12px] transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-happy-pink rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-text-secondary">Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-happy-pink to-happy-purple flex items-center justify-center text-white font-semibold">
                  AU
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Desktop Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block bg-white border-r border-border h-[calc(100vh-73px)] sticky top-[73px] overflow-hidden"
            >
              <div className="p-4 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-1">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-happy-pink to-happy-purple text-white shadow-lg"
                            : "hover:bg-soft-background text-text-secondary"
                        }`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <button className="flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-[12px] transition-all duration-200 mt-4">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed top-0 left-0 w-72 h-screen bg-white z-50 shadow-2xl"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <Logo className="h-8 w-auto" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-soft-background rounded-[12px]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 h-[calc(100%-80px)] flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-1">
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-happy-pink to-happy-purple text-white shadow-lg"
                              : "hover:bg-soft-background text-text-secondary"
                          }`}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <button className="flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-[12px] transition-all duration-200 mt-4">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
