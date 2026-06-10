import { Link } from "react-router";
import { motion } from "motion/react";
import { Logo } from "../components/Logo";
import { 
  Play, 
  Film, 
  Palette, 
  Music, 
  Sparkles, 
  Video,
  Wand2,
  Volume2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";

export default function LandingPage() {
  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "TV Commercial Production",
      description: "End-to-end production of high-quality television commercials",
      gradient: "from-[#FFD93D] to-[#F59E0B]"
    },
    {
      icon: <Film className="w-8 h-8" />,
      title: "Post Production",
      description: "Complete post-production workflows and finishing",
      gradient: "from-[#FF5DA2] to-[#EF4444]"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Video Editing",
      description: "Professional editing for commercials and digital content",
      gradient: "from-[#00D4FF] to-[#0EA5E9]"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Motion Graphics",
      description: "Stunning motion graphics and animations",
      gradient: "from-[#8B5CF6] to-[#A855F7]"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "VFX",
      description: "Visual effects and compositing services",
      gradient: "from-[#22C55E] to-[#10B981]"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Color Grading",
      description: "Professional color grading and DI services",
      gradient: "from-[#FFD93D] to-[#FF5DA2]"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Sound Design",
      description: "Audio production and sound design",
      gradient: "from-[#00D4FF] to-[#8B5CF6]"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Digital Content Production",
      description: "Content creation for digital platforms",
      gradient: "from-[#FF5DA2] to-[#FFD93D]"
    },
  ];

  const clients = [
    "Coca-Cola", "Nike", "Apple", "Samsung", "Amazon", 
    "Google", "Microsoft", "Tesla", "BMW", "Mercedes"
  ];

  const testimonials = [
    {
      quote: "Happy Unicorn transformed our vision into stunning reality. Their attention to detail and creative expertise is unmatched.",
      author: "Sarah Johnson",
      role: "Creative Director, Brand Co.",
      avatar: "SJ"
    },
    {
      quote: "Working with Happy Unicorn has been an absolute pleasure. They deliver exceptional quality on time, every time.",
      author: "Michael Chen",
      role: "Marketing Lead, Tech Corp",
      avatar: "MC"
    },
    {
      quote: "The team's creativity and technical skills brought our campaign to life. We couldn't be happier with the results.",
      author: "Emily Rodriguez",
      role: "VP Marketing, Retail Giant",
      avatar: "ER"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFD93D]/10 via-[#FF5DA2]/10 to-[#00D4FF]/10">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFD93D]/30 to-[#FF5DA2]/30 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#00D4FF]/30 to-[#8B5CF6]/30 blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[#8B5CF6]/30 to-[#FFD93D]/30 blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <motion.div 
              className="mb-8 inline-flex flex-col items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Logo className="h-20 w-auto drop-shadow-2xl" />
              <p className="text-sm text-gray-600">Post Production Tracker</p>
            </motion.div>

            {/* Headline */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] bg-clip-text text-transparent">
                Where Creative
              </span>
              <br />
              <span className="text-gray-900">Magic Happens</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Premium post-production tracking platform designed for advertising agencies 
              and production houses who create extraordinary content.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login?role=client">
                <motion.button
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FFD93D] to-[#F59E0B] text-gray-900 font-semibold shadow-lg shadow-[#FFD93D]/30 hover:shadow-xl hover:shadow-[#FFD93D]/50 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Client Login
                </motion.button>
              </Link>
              <Link to="/login?role=admin">
                <motion.button
                  className="px-8 py-4 rounded-2xl bg-white border-2 border-gray-200 text-gray-900 font-semibold hover:border-[#FF5DA2] hover:bg-gradient-to-r hover:from-[#FF5DA2]/5 hover:to-[#8B5CF6]/5 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Admin Login
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF5DA2] to-[#8B5CF6] bg-clip-text text-transparent">
              About Happy Unicorn
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're a premium advertising production and post-production company dedicated to 
              creating cinematic excellence. Our platform empowers teams to collaborate seamlessly 
              and deliver extraordinary results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-5xl font-bold mb-6">Our Services</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive production and post-production services for modern brands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="h-full p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-5xl font-bold mb-6">Our Work</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Featured projects that showcase our creative excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD93D]/20 via-[#FF5DA2]/20 to-[#00D4FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                </div>
                <h4 className="mt-4 text-lg font-semibold text-gray-900">Project {item}</h4>
                <p className="text-sm text-gray-600">Client Campaign</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-5xl font-bold mb-6">Trusted By Industry Leaders</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've had the privilege of working with some of the world's most iconic brands
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="flex items-center justify-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#FFD93D] hover:shadow-lg transition-all"
              >
                <span className="text-lg font-semibold text-gray-400 hover:text-gray-900 transition-colors">
                  {client}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-5xl font-bold mb-6">What Clients Say</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the creative leaders who trust Happy Unicorn
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg hover:shadow-2xl transition-all"
              >
                <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#FFD93D]/10 via-[#FF5DA2]/10 to-[#00D4FF]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-5xl font-bold mb-6">Get In Touch</h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ready to create something extraordinary? Let's talk about your next project.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD93D] to-[#F59E0B] flex items-center justify-center text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">hello@happyunicorn.studio</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF5DA2] to-[#EF4444] flex items-center justify-center text-white">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#0EA5E9] flex items-center justify-center text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Studio</p>
                    <p className="text-gray-600">123 Creative Avenue, Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8 rounded-3xl bg-white shadow-xl">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FFD93D] focus:ring-2 focus:ring-[#FFD93D]/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FFD93D] focus:ring-2 focus:ring-[#FFD93D]/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#FFD93D] focus:ring-2 focus:ring-[#FFD93D]/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFD93D] to-[#F59E0B] text-gray-900 font-semibold shadow-lg shadow-[#FFD93D]/30 hover:shadow-xl hover:shadow-[#FFD93D]/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Logo className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 text-sm">
                Creating extraordinary content for extraordinary brands.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Production</li>
                <li className="hover:text-white transition-colors cursor-pointer">Post Production</li>
                <li className="hover:text-white transition-colors cursor-pointer">VFX</li>
                <li className="hover:text-white transition-colors cursor-pointer">Color Grading</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">About</li>
                <li className="hover:text-white transition-colors cursor-pointer">Portfolio</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#FFD93D] hover:to-[#FF5DA2] transition-all cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2026 Happy Unicorn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
