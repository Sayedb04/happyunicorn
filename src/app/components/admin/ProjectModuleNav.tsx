import { motion } from "motion/react";
import {
  Activity,
  CheckCircle,
  Clock,
  FileVideo,
  Languages,
  MessageSquare,
  Music,
  Package,
  Palette,
  Scissors,
  Sparkles,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../ui/utils";

export const PROJECT_MODULE_TABS = [
  { key: "timeline", label: "Timeline", icon: Clock },
  { key: "versions", label: "Versions", icon: FileVideo },
  { key: "reviews", label: "Client Reviews", icon: MessageSquare },
  { key: "cutdowns", label: "Cutdowns", icon: Scissors },
  { key: "motion-graphics", label: "Motion Graphics", icon: Wand2 },
  { key: "vfx", label: "VFX", icon: Sparkles },
  { key: "di", label: "DI", icon: Palette },
  { key: "sound", label: "Sound", icon: Music },
  { key: "languages", label: "Languages", icon: Languages },
  { key: "approvals", label: "Approvals", icon: CheckCircle },
  { key: "deliverables", label: "Deliverables", icon: Package },
  { key: "activity", label: "Activity Feed", icon: Activity },
] as const;

export type ProjectModuleTabKey = (typeof PROJECT_MODULE_TABS)[number]["key"];

type ProjectModuleNavProps = {
  tabs?: readonly { key: ProjectModuleTabKey; label: string; icon: LucideIcon }[];
};

export default function ProjectModuleNav({
  tabs = PROJECT_MODULE_TABS,
}: ProjectModuleNavProps) {
  return (
    <div className="sticky top-16 z-30 -mx-6 px-6 py-5 my-2">
      <div
        className={cn(
          "relative overflow-hidden rounded-[24px]",
          "bg-white/95 backdrop-blur-xl",
          "border border-gray-200/70",
          "shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08),0_12px_32px_-12px_rgba(255,93,162,0.12)]",
          "ring-1 ring-white/80",
          "p-2.5",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFD93D]/[0.04] via-transparent to-[#FF5DA2]/[0.06]"
        />

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-white/95 to-transparent sm:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-white/95 to-transparent sm:hidden" />

          <TabsList
            className={cn(
              "relative flex h-auto w-full min-w-0 items-center justify-start gap-1.5",
              "overflow-x-auto overscroll-x-contain scroll-smooth",
              "bg-transparent p-0",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className={cn(
                    "group relative flex flex-none shrink-0 items-center gap-2 rounded-full px-4 py-2.5",
                    "border border-transparent text-sm font-medium text-gray-600",
                    "bg-gray-100/90 transition-all duration-300 ease-out",
                    "hover:-translate-y-0.5 hover:bg-gray-200/90 hover:text-gray-900 hover:shadow-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5DA2]/30",
                    "data-[state=active]:z-[1] data-[state=active]:border-white/70",
                    "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFD93D]/35 data-[state=active]:via-[#FF5DA2]/25 data-[state=active]:to-[#00D4FF]/25",
                    "data-[state=active]:font-bold data-[state=active]:text-gray-900",
                    "data-[state=active]:shadow-[0_8px_24px_-8px_rgba(255,93,162,0.45),0_4px_12px_-4px_rgba(255,217,61,0.35)]",
                    "data-[state=active]:-translate-y-0.5 data-[state=active]:scale-[1.02]",
                  )}
                >
                  <motion.span
                    layout
                    className={cn(
                      "flex items-center justify-center rounded-full p-1 transition-colors duration-300",
                      "bg-white/60 text-gray-500 group-hover:text-gray-800",
                      "group-data-[state=active]:bg-white/80 group-data-[state=active]:text-[#FF5DA2]",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                  </motion.span>
                  <span className="whitespace-nowrap">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>
    </div>
  );
}
