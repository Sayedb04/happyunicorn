import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Logo } from "../components/Logo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "client";
  
  const [activeRole, setActiveRole] = useState<"admin" | "client">(
    defaultRole as "admin" | "client"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/client");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Creative Artwork */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 rounded-full bg-white/20 backdrop-blur-xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 80, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white/20 backdrop-blur-xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white/20 backdrop-blur-xl"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Logo className="h-24 w-auto mx-auto mb-8 drop-shadow-2xl" />
            <h1 className="text-5xl font-bold mb-6">Welcome to Happy Unicorn</h1>
            <p className="text-xl text-white/90 max-w-md mx-auto leading-relaxed">
              Your premium post-production tracking platform for extraordinary creative projects.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back to Home */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Logo for Mobile */}
          <div className="lg:hidden flex flex-col items-start gap-2 mb-8">
            <Logo className="h-12 w-auto" />
            <p className="text-sm text-gray-600">Post Production Tracker</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 mb-8">Access your dashboard</p>

            {/* Role Switch Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl mb-8">
              <button
                type="button"
                onClick={() => setActiveRole("client")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  activeRole === "client"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setActiveRole("admin")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  activeRole === "admin"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FFD93D] focus:ring-2 focus:ring-[#FFD93D]/20 outline-none transition-all"
                    placeholder={
                      activeRole === "admin" 
                        ? "admin@happyunicorn.studio" 
                        : "client@example.com"
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FFD93D] focus:ring-2 focus:ring-[#FFD93D]/20 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#FF5DA2] hover:text-[#8B5CF6] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFD93D] to-[#F59E0B] text-gray-900 font-semibold shadow-lg shadow-[#FFD93D]/30 hover:shadow-xl hover:shadow-[#FFD93D]/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In as {activeRole === "admin" ? "Admin" : "Client"}
              </motion.button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button className="font-semibold text-[#FF5DA2] hover:text-[#8B5CF6] transition-colors">
                  Contact us
                </button>
              </p>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#FFD93D]/10 to-[#FF5DA2]/10 border border-[#FFD93D]/20">
            <p className="text-xs text-gray-600 text-center">
              <strong>Demo:</strong> Use any email/password to access the {activeRole} dashboard
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
