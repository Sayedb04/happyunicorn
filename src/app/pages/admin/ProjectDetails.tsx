// @ts-nocheck
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Users,
  User,
  Package,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Search,
  Plus,
  Download,
  Eye,
  MessageSquare,
  XCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import TimelineWorkflow from "../../components/admin/TimelineWorkflow";
import ProjectModuleNav, {
  PROJECT_MODULE_TABS,
  type ProjectModuleTabKey,
} from "../../components/admin/ProjectModuleNav";


type Project = {
  id: string;
  name: string;
  client: string;
  status: "On Track" | "At Risk" | "Delayed";
  priority: "Low" | "Medium" | "High";
  budget: string;
  teamMembers: string[];
  assignedPM: string;
  startDate: string;
  dueDate: string;
  overallCompletion: number;
  currentStage: string;
  health: "On Track" | "At Risk" | "Delayed";
  recentActivitySummary: string;
};

type Stage = {
  key: string;
  name: string;
  status: "completed" | "in-progress" | "pending" | "at-risk" | "delayed";
  assignedTo: string;
  startDate: string;
  dueDate: string;
  completion: number;
  estimatedCompletion: number;
  dependencyKeys: string[];
};

type Version = {
  version: string;
  uploadDate: string;
  uploadedBy: string;
  approvalStatus: "Approved" | "Changes Requested" | "Under Review" | "Rejected";
  commentCount: number;
  reviewStatus: string;
  versionNotes: string;
  changeLog: string[];
};

type ReviewThread = {
  id: string;
  department: "Client" | "Internal";
  requestedBy: string;
  dueDate: string;
  approvalStatus: "Approved" | "Changes Requested" | "Pending";
  rejectionStatus: "None" | "Rejected";
  messages: {
    id: string;
    user: string;
    role: string;
    timestamp: string;
    text: string;
  }[];
};

type Cut = {
  label: string;
  status: "In Progress" | "Ready" | "Blocked" | "Pending";
  assignedEditor: string;
  completion: number;
  dueDate: string;
  exportStatus: "Exported" | "Exporting" | "Not Started";
  versionCount: number;
};

type Task = {
  title: string;
  progress: number;
  assignedArtist: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  assetRequirements: string[];
  dependencies: string[];
  completionStatus: "Not Started" | "In Progress" | "Complete";
};

const pct = (n: number) => `${Math.max(0, Math.min(100, n))}%`;

function statusBadgeClass(status: string) {
  switch (status) {
    case "On Track":
      return "bg-[#22C55E]/10 text-[#22C55E]";
    case "At Risk":
      return "bg-[#F59E0B]/10 text-[#F59E0B]";
    case "Delayed":
      return "bg-[#EF4444]/10 text-[#EF4444]";
    case "Approved":
      return "bg-[#22C55E]/10 text-[#22C55E]";
    case "Changes Requested":
      return "bg-[#F59E0B]/10 text-[#F59E0B]";
    case "Rejected":
      return "bg-[#EF4444]/10 text-[#EF4444]";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function ProjectDetails() {
  const { projectId } = useParams();

  const project: Project = useMemo(() => {
    const id = String(projectId ?? "1");
    const data: Record<string, Project> = {
      "1": {
        id: "1",
        name: "Nike Summer Campaign",
        client: "Nike",
        status: "On Track",
        priority: "High",
        budget: "$240,000",
        teamMembers: ["John Doe", "Sarah Chen", "Amy Wu", "Tom Lee"],
        assignedPM: "Emily White",
        startDate: "May 15, 2026",
        dueDate: "Jun 30, 2026",
        overallCompletion: 65,
        currentStage: "Graphics",
        health: "On Track",
        recentActivitySummary: "V3 uploaded. Client feedback received and pending updates.",
      },
      "2": {
        id: "2",
        name: "Adidas Launch Film",
        client: "Adidas",
        status: "On Track",
        priority: "Medium",
        budget: "$180,000",
        teamMembers: ["Michael Ross", "Lisa Park", "James Kim"],
        assignedPM: "Sarah Chen",
        startDate: "May 20, 2026",
        dueDate: "Jul 10, 2026",
        overallCompletion: 42,
        currentStage: "Client Review",
        health: "At Risk",
        recentActivitySummary: "Director cut delivered. Awaiting client comments on Version 2.",
      },
      "3": {
        id: "3",
        name: "Coca-Cola Festival Ad",
        client: "Coca-Cola",
        status: "At Risk",
        priority: "High",
        budget: "$95,000",
        teamMembers: ["Tom Lee", "Amy Wu", "John Doe"],
        assignedPM: "Mike Johnson",
        startDate: "Jun 1, 2026",
        dueDate: "Jun 28, 2026",
        overallCompletion: 58,
        currentStage: "VFX",
        health: "At Risk",
        recentActivitySummary: "3 shots approved. 2 shots pending render + review.",
      },
      "4": {
        id: "4",
        name: "Netflix Promo",
        client: "Netflix",
        status: "Delayed",
        priority: "Medium",
        budget: "$320,000",
        teamMembers: ["James Kim", "Emily White", "Lisa Park"],
        assignedPM: "John Doe",
        startDate: "May 5, 2026",
        dueDate: "Jul 2, 2026",
        overallCompletion: 35,
        currentStage: "DI",
        health: "Delayed",
        recentActivitySummary: "DI revision requested. Export readiness is pending LUT updates.",
      },
    };

    return data[id] ?? data["1"];
  }, [projectId]);

  const stages: Stage[] = useMemo(
    () => [
      {
        key: "prep",
        name: "Prep",
        status: "completed",
        assignedTo: project.assignedPM,
        startDate: "May 15, 2026",
        dueDate: "May 18, 2026",
        completion: 100,
        estimatedCompletion: 100,
        dependencyKeys: [],
      },
      {
        key: "offline",
        name: "Offline Edit",
        status: "completed",
        assignedTo: "Sarah Chen",
        startDate: "May 18, 2026",
        dueDate: "May 22, 2026",
        completion: 100,
        estimatedCompletion: 100,
        dependencyKeys: ["prep"],
      },
      {
        key: "director",
        name: "Director Cut",
        status: "completed",
        assignedTo: "Mike Ross",
        startDate: "May 22, 2026",
        dueDate: "May 28, 2026",
        completion: 100,
        estimatedCompletion: 100,
        dependencyKeys: ["offline"],
      },
      {
        key: "client",
        name: "Client Review",
        status: "in-progress",
        assignedTo: "Sarah Chen",
        startDate: "May 28, 2026",
        dueDate: "Jun 2, 2026",
        completion: 78,
        estimatedCompletion: 85,
        dependencyKeys: ["director"],
      },
      {
        key: "graphics",
        name: "Graphics",
        status: "in-progress",
        assignedTo: "Amy Wu",
        startDate: "Jun 2, 2026",
        dueDate: "Jun 10, 2026",
        completion: 65,
        estimatedCompletion: 80,
        dependencyKeys: ["client"],
      },
      {
        key: "vfx",
        name: "VFX",
        status: "pending",
        assignedTo: "Tom Lee",
        startDate: "Jun 10, 2026",
        dueDate: "Jun 15, 2026",
        completion: 0,
        estimatedCompletion: 60,
        dependencyKeys: ["graphics"],
      },
      {
        key: "di",
        name: "DI",
        status: "pending",
        assignedTo: "Lisa Park",
        startDate: "Jun 15, 2026",
        dueDate: "Jun 20, 2026",
        completion: 0,
        estimatedCompletion: 55,
        dependencyKeys: ["vfx"],
      },
      {
        key: "sound",
        name: "Sound",
        status: "pending",
        assignedTo: "James Kim",
        startDate: "Jun 20, 2026",
        dueDate: "Jun 25, 2026",
        completion: 0,
        estimatedCompletion: 50,
        dependencyKeys: ["di"],
      },
      {
        key: "delivery",
        name: "Delivery",
        status: "pending",
        assignedTo: project.assignedPM,
        startDate: "Jun 25, 2026",
        dueDate: "Jun 30, 2026",
        completion: 0,
        estimatedCompletion: 45,
        dependencyKeys: ["sound"],
      },
    ],
    [project.assignedPM]
  );

  const versions: Version[] = useMemo(
    () => [
      {
        version: "V3",
        uploadDate: "Jun 10, 2026 2:30 PM",
        uploadedBy: "Mike Johnson",
        approvalStatus: "Approved",
        commentCount: 3,
        reviewStatus: "Released",
        versionNotes: "Final VFX comp pass + color polish.",
        changeLog: [
          "Approved shots integrated",
          "DI LUT v4 applied",
          "Sound mix updates",
        ],
      },
      {
        version: "V2",
        uploadDate: "Jun 8, 2026 10:15 AM",
        uploadedBy: "Sarah Chen",
        approvalStatus: "Changes Requested",
        commentCount: 8,
        reviewStatus: "Needs Updates",
        versionNotes: "Client notes received for graphics and lower thirds.",
        changeLog: ["Graphics revisions", "Lower thirds re-timed"],
      },
      {
        version: "V1",
        uploadDate: "Jun 5, 2026 4:45 PM",
        uploadedBy: "Mike Johnson",
        approvalStatus: "Rejected",
        commentCount: 12,
        reviewStatus: "Rejected",
        versionNotes: "Initial delivery candidate.",
        changeLog: ["First cut", "First comp set"],
      },
    ],
    []
  );

  const reviewThreads: ReviewThread[] = useMemo(
    () => [
      {
        id: "r1",
        department: "Client",
        requestedBy: "Nike Producer",
        dueDate: "Jun 12, 2026",
        approvalStatus: "Pending",
        rejectionStatus: "None",
        messages: [
          {
            id: "m1",
            user: "Nike Client",
            role: "Brand Manager",
            timestamp: "Jun 9, 2026 3:10 PM",
            text: "Looks great. Please refine the CTA supers timing and add a subtle glow on the logo reveal.",
          },
          {
            id: "m2",
            user: "Project PM",
            role: "PM",
            timestamp: "Jun 9, 2026 4:02 PM",
            text: "Got it. We’ll update the supers + add the glow treatment. New Version will be uploaded by EOD.",
          },
        ],
      },
    ],
    []
  );

  const cutdowns: Cut[] = useMemo(
    () => [
      { label: "60s", status: "In Progress", assignedEditor: "Sarah Chen", completion: 72, dueDate: "Jun 14", exportStatus: "Exporting", versionCount: 3 },
      { label: "45s", status: "Ready", assignedEditor: "Sarah Chen", completion: 100, dueDate: "Jun 12", exportStatus: "Exported", versionCount: 2 },
      { label: "30s", status: "In Progress", assignedEditor: "Amy Wu", completion: 58, dueDate: "Jun 12", exportStatus: "Not Started", versionCount: 2 },
      { label: "20s", status: "Pending", assignedEditor: "Amy Wu", completion: 0, dueDate: "Jun 15", exportStatus: "Not Started", versionCount: 1 },
      { label: "15s", status: "Pending", assignedEditor: "Amy Wu", completion: 0, dueDate: "Jun 18", exportStatus: "Not Started", versionCount: 1 },
      { label: "10s", status: "Pending", assignedEditor: "Amy Wu", completion: 0, dueDate: "Jun 20", exportStatus: "Not Started", versionCount: 1 },
      { label: "6s", status: "Pending", assignedEditor: "Amy Wu", completion: 0, dueDate: "Jun 22", exportStatus: "Not Started", versionCount: 1 },
    ],
    []
  );

  const motionGraphicsTasks: Task[] = useMemo(
    () => [
      { title: "Supers", progress: 62, assignedArtist: "Amy Wu", priority: "High", dueDate: "Jun 9", assetRequirements: ["Brand font pack", "Logo assets"], dependencies: ["Client Review"], completionStatus: "In Progress" },
      { title: "CTA", progress: 48, assignedArtist: "Amy Wu", priority: "Medium", dueDate: "Jun 10", assetRequirements: ["CTA copy doc"], dependencies: ["Graphics"], completionStatus: "In Progress" },
      { title: "Logo Reveal", progress: 70, assignedArtist: "Amy Wu", priority: "High", dueDate: "Jun 8", assetRequirements: ["Logo in alpha", "Glow style guide"], dependencies: ["Prep"], completionStatus: "In Progress" },
      { title: "End Cards", progress: 30, assignedArtist: "Amy Wu", priority: "Low", dueDate: "Jun 14", assetRequirements: ["End card layouts"], dependencies: ["Client Review"], completionStatus: "Not Started" },
      { title: "Lower Thirds", progress: 55, assignedArtist: "Amy Wu", priority: "Medium", dueDate: "Jun 11", assetRequirements: ["Tagline copy"], dependencies: ["Supers"], completionStatus: "In Progress" },
    ],
    []
  );

  const vfxShots = useMemo(
    () => [
      { shotId: "S-001", name: "Logo Glow Pass", sequence: "Seq A", assigned: "Tom Lee", complexity: "High", status: "In Progress", versionCount: 3, dueDate: "Jun 13", renderProgress: 55 },
      { shotId: "S-002", name: "Product Reflection", sequence: "Seq B", assigned: "Tom Lee", complexity: "Medium", status: "Pending Review", versionCount: 2, dueDate: "Jun 12", renderProgress: 20 },
      { shotId: "S-003", name: "Background Replacement", sequence: "Seq C", assigned: "Tom Lee", complexity: "High", status: "Approved", versionCount: 4, dueDate: "Jun 10", renderProgress: 100 },
      { shotId: "S-004", name: "Motion Stabilization", sequence: "Seq D", assigned: "Tom Lee", complexity: "Low", status: "In Progress", versionCount: 2, dueDate: "Jun 14", renderProgress: 35 },
    ],
    []
  );

  const diScenes = useMemo(
    () => [
      { name: "Scene 01", colorist: "Lisa Park", progress: 80, lutVersion: "LUT v4", hdrSdr: "HDR", reviewStatus: "Approved", exportStatus: "Ready" },
      { name: "Scene 02", colorist: "Lisa Park", progress: 50, lutVersion: "LUT v4", hdrSdr: "SDR", reviewStatus: "Pending", exportStatus: "Not Started" },
      { name: "Scene 03", colorist: "Lisa Park", progress: 20, lutVersion: "LUT v4", hdrSdr: "HDR", reviewStatus: "Pending", exportStatus: "Not Started" },
    ],
    []
  );

  const soundTasks = useMemo(
    () => [
      { name: "Voice Over", assigned: "James Kim", progress: 65, dueDate: "Jun 18", status: "In Progress", reviewNotes: "Level check pending" },
      { name: "Background Music", assigned: "James Kim", progress: 45, dueDate: "Jun 16", status: "In Progress", reviewNotes: "Need client preference A" },
      { name: "Sound Effects", assigned: "James Kim", progress: 55, dueDate: "Jun 15", status: "In Progress", reviewNotes: "Transitions updated" },
      { name: "Mixing", assigned: "James Kim", progress: 30, dueDate: "Jun 22", status: "Pending", reviewNotes: "Wait for DI export" },
      { name: "Mastering", assigned: "James Kim", progress: 0, dueDate: "Jun 28", status: "Pending", reviewNotes: "After picture lock" },
    ],
    []
  );

  const languages = useMemo(
    () => [
      { name: "English", translation: "Complete", dubbing: "Complete", subtitles: "Complete", translator: "Kiran", progress: 100, deliveryReady: "Ready", notes: "—" },
      { name: "Tamil", translation: "In Review", dubbing: "Pending", subtitles: "In Progress", translator: "Arun", progress: 60, deliveryReady: "Not Ready", notes: "Need timing adjustments" },
      { name: "Telugu", translation: "Complete", dubbing: "In Progress", subtitles: "Complete", translator: "Prakash", progress: 75, deliveryReady: "Ready", notes: "—" },
      { name: "Hindi", translation: "In Progress", dubbing: "Pending", subtitles: "Pending", translator: "Neha", progress: 40, deliveryReady: "Not Ready", notes: "Review required" },
      { name: "Kannada", translation: "Pending", dubbing: "Pending", subtitles: "Pending", translator: "Ravi", progress: 15, deliveryReady: "Not Ready", notes: "Kickoff scheduled" },
      { name: "Malayalam", translation: "Pending", dubbing: "Pending", subtitles: "Pending", translator: "Sofia", progress: 10, deliveryReady: "Not Ready", notes: "—" },
    ],
    []
  );

  const approvals = useMemo(
    () => [
      { itemName: "V3 - Final DI Render", department: "DI", submittedBy: "Lisa Park", approver: "Nike Studio Lead", status: "Under Review", approvalDate: "—", comments: "Waiting on final sign-off." },
      { itemName: "Version 3 - Graphics Pack", department: "Motion Graphics", submittedBy: "Amy Wu", approver: "Nike Brand Team", status: "Pending", approvalDate: "—", comments: "Needs supers timing check." },
      { itemName: "Sound Mix - Master", department: "Sound", submittedBy: "James Kim", approver: "Nike Producer", status: "Approved", approvalDate: "Jun 18, 2026", comments: "Approved." },
    ],
    []
  );

  const deliverables = useMemo(
    () => [
      { name: "Main Cut", format: "MP4", resolution: "4K", duration: "00:00:60", platform: "Web + OTT", linkedVersion: "V3", deliveryDate: "Jun 30", status: "Ready", clientAck: "Pending" },
      { name: "Social Cut - 30s", format: "MP4", resolution: "1080p", duration: "00:00:30", platform: "Instagram", linkedVersion: "V2", deliveryDate: "Jun 22", status: "In Progress", clientAck: "Pending" },
      { name: "Festival Cut - 15s", format: "MOV", resolution: "4K", duration: "00:00:15", platform: "Digital Screens", linkedVersion: "V2", deliveryDate: "Jun 24", status: "Not Started", clientAck: "—" },
    ],
    []
  );

  const activityItems = useMemo(
    () => [
      { id: "a1", user: "John Doe", action: "Version Uploaded", timestamp: "5 mins ago", department: "VFX", module: "VFX", project: project.name },
      { id: "a2", user: "Sarah Chen", action: "Client Commented", timestamp: "12 mins ago", department: "Client Reviews", module: "Client Reviews", project: project.name },
      { id: "a3", user: "Lisa Park", action: "DI LUT updated", timestamp: "23 mins ago", department: "DI", module: "DI", project: project.name },
      { id: "a4", user: "James Kim", action: "Render started", timestamp: "1 hour ago", department: "Sound", module: "Sound", project: project.name },
      { id: "a5", user: "Project PM", action: "Delivery scheduled", timestamp: "2 hours ago", department: "Deliverables", module: "Deliverables", project: project.name },
    ],
    [project.name]
  );

  const [timelineSearch] = useState("");
  const [versionsQuery, setVersionsQuery] = useState("");
  const [reviewsQuery, setReviewsQuery] = useState("");
  const [deliverablesQuery, setDeliverablesQuery] = useState("");
  const [activityUser, setActivityUser] = useState<string>("All");
  const [activityDept, setActivityDept] = useState<string>("All");
  const [activityDate, setActivityDate] = useState<string>("All");

  const filteredVersions = useMemo(() => {
    if (!versionsQuery.trim()) return versions;
    return versions.filter((v) => `${v.version} ${v.uploadedBy} ${v.approvalStatus}`.toLowerCase().includes(versionsQuery.toLowerCase()));
  }, [versions, versionsQuery]);

  const filteredReviews = useMemo(() => {
    if (!reviewsQuery.trim()) return reviewThreads;
    return reviewThreads.filter((t) => `${t.department} ${t.requestedBy} ${t.approvalStatus}`.toLowerCase().includes(reviewsQuery.toLowerCase()));
  }, [reviewThreads, reviewsQuery]);

  const filteredDeliverables = useMemo(() => {
    if (!deliverablesQuery.trim()) return deliverables;
    return deliverables.filter((d) => `${d.name} ${d.platform} ${d.status}`.toLowerCase().includes(deliverablesQuery.toLowerCase()));
  }, [deliverables, deliverablesQuery]);

  const filteredActivity = useMemo(() => {
    return activityItems.filter((a) => {
      const okUser = activityUser === "All" ? true : a.user === activityUser;
      const okDept = activityDept === "All" ? true : a.department === activityDept;
      const okDate = activityDate === "All" ? true : a.timestamp.includes(activityDate);
      return okUser && okDept && okDate;
    });
  }, [activityItems, activityUser, activityDept, activityDate]);

  const getStageColor = (status: Stage["status"]) => {
    switch (status) {
      case "completed":
        return "bg-[#22C55E]";
      case "in-progress":
        return "bg-[#FFD93D]";
      case "at-risk":
        return "bg-[#F59E0B]";
      case "delayed":
        return "bg-[#EF4444]";
      default:
        return "bg-gray-300";
    }
  };

  const getStageIcon = (status: Stage["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-white" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-white" />;
      case "at-risk":
        return <AlertTriangle className="w-5 h-5 text-white" />;
      case "delayed":
        return <XCircle className="w-5 h-5 text-white" />;
      default:
        return <Clock className="w-5 h-5 text-white" />;
    }
  };

  const healthInfo = useMemo(() => {
    switch (project.health) {
      case "On Track":
        return { label: "On Track", icon: <CheckCircle2 className="w-5 h-5" />, color: "#22C55E" };
      case "At Risk":
        return { label: "At Risk", icon: <AlertTriangle className="w-5 h-5" />, color: "#F59E0B" };
      case "Delayed":
        return { label: "Delayed", icon: <XCircle className="w-5 h-5" />, color: "#EF4444" };
    }
  }, [project.health]);

  const [activeTab, setActiveTab] = useState<ProjectModuleTabKey>("timeline");

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <div>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.name}</h1>
            <p className="text-gray-600">Client: <span className="font-semibold text-gray-900">{project.client}</span></p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-4 py-2 rounded-2xl text-sm font-semibold ${statusBadgeClass(project.status)}`}> {project.status} </div>
            <div className="px-4 py-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 text-gray-900 border border-gray-100">
              Priority: {project.priority}
            </div>
            <div className="px-4 py-2 rounded-2xl text-sm font-semibold border border-gray-100" style={{ backgroundColor: `${healthInfo.color}20`, color: healthInfo.color }}>
              <div className="flex items-center gap-2">
                {healthInfo.icon}
                {project.health}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall Completion</span>
              <Badge variant="secondary" className="rounded-xl bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 text-gray-900 border border-gray-100">{project.overallCompletion}%</Badge>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] rounded-full" style={{ width: pct(project.overallCompletion) }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Current stage: <span className="font-semibold text-gray-900">{project.currentStage}</span></p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="w-4 h-4" /> Start Date</div>
            <p className="font-semibold text-gray-900">{project.startDate}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="w-4 h-4" /> Due Date</div>
            <p className="font-semibold text-gray-900">{project.dueDate}</p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600"><Package className="w-4 h-4" /> Budget</div>
            <p className="font-semibold text-gray-900">{project.budget}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600"><User className="w-4 h-4" /> Assigned PM</div>
            <p className="font-semibold text-gray-900">{project.assignedPM}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4" /> Team Members</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.teamMembers.map((m) => (
                <span key={m} className="px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-900">{m}</span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-2 text-sm text-gray-600"><Activity className="w-4 h-4" /> Recent Activity Summary</div>
            <p className="mt-3 text-gray-700">{project.recentActivitySummary}</p>
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ProjectModuleTabKey)}>
        <ProjectModuleNav tabs={PROJECT_MODULE_TABS} />

        {/* Timeline (Production workflow) */}
        <TabsContent value="timeline">
          <TimelineWorkflow
            project={project}
            stages={stages}
            getStageIcon={getStageIcon}
            getStageColor={getStageColor}
            pct={pct}
          />
        </TabsContent>

        {/* Versions */}
        <TabsContent value="versions">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Version Tracker</h2>
                <p className="text-sm text-gray-600">Upload history, approvals, notes, previews, downloads, and compare actions</p>
              </div>
              <div className="w-full sm:w-96">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input value={versionsQuery} onChange={(e) => setVersionsQuery(e.target.value)} placeholder="Search versions..." className="pl-9 rounded-2xl" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredVersions.map((v, index) => (
                <motion.div
                  key={v.version + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex items-start gap-5">
                      <div className="w-16 h-12 rounded-2xl bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center text-white font-bold shadow-sm">
                        {v.version}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Uploaded on {v.uploadDate}</p>
                        <h3 className="text-xl font-bold text-gray-900">{project.client}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${statusBadgeClass(v.approvalStatus)}`}>
                            {v.approvalStatus}
                          </span>
                          <span className="flex items-center gap-2 text-sm text-gray-600">
                            <MessageSquare className="w-4 h-4" /> {v.commentCount} comments
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="rounded-2xl" onClick={() => {}}>
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" className="rounded-2xl" onClick={() => {}}>
                        <Download className="w-5 h-5" />
                      </Button>
                      <Button className="rounded-2xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white" onClick={() => {}}>
                        Compare
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                      <p className="text-xs text-gray-600">Uploaded By</p>
                      <p className="font-semibold text-gray-900">{v.uploadedBy}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                      <p className="text-xs text-gray-600">Review Status</p>
                      <p className="font-semibold text-gray-900">{v.reviewStatus}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                      <p className="text-xs text-gray-600">Version Notes</p>
                      <p className="text-sm text-gray-700">{v.versionNotes}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Change Log</p>
                    <ul className="list-disc ml-5 text-sm text-gray-600">
                      {v.changeLog.map((c, i) => (
                        <li key={i} className="py-0.5">{c}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Client Reviews */}
        <TabsContent value="reviews">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Client Review Management</h2>
                <p className="text-sm text-gray-600">Requests, feedback threads, attachments, approval status, and revision requests</p>
              </div>
              <div className="w-full sm:w-96">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input value={reviewsQuery} onChange={(e) => setReviewsQuery(e.target.value)} placeholder="Search reviews..." className="pl-9 rounded-2xl" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {filteredReviews.map((thread, idx) => (
                  <motion.div
                    key={thread.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${statusBadgeClass(thread.approvalStatus === "Pending" ? "Delayed" : thread.approvalStatus)}`}>{thread.approvalStatus}</span>
                          <span className="text-sm text-gray-600">{thread.department} thread</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mt-2">Requested by {thread.requestedBy}</h3>
                        <p className="text-sm text-gray-600 mt-1">Due: {thread.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="rounded-2xl" onClick={() => {}}>
                          Attachments
                        </Button>
                        <Button className="rounded-2xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white" onClick={() => {}}>
                          Request Revision
                        </Button>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {thread.messages.map((m) => (
                        <div key={m.id} className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center text-white font-bold text-sm">
                                {m.user.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">{m.user}</p>
                                <p className="text-xs text-gray-600">{m.role}</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{m.timestamp}</span>
                          </div>
                          <p className="mt-3 text-sm text-gray-700">{m.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white border border-gray-100">
                        <p className="text-xs text-gray-600">Response Timeline</p>
                        <p className="text-sm text-gray-900 font-semibold mt-1">48h SLA target</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-gray-100">
                        <p className="text-xs text-gray-600">Approval History</p>
                        <p className="text-sm text-gray-900 font-semibold mt-1">V2 → Changes Requested</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900">Review Requests</h3>
                  <p className="text-sm text-gray-600 mt-1">Create and track new requests</p>
                  <div className="mt-4 space-y-3">
                    {["Version V3 Preview", "Graphics Pass", "DI HDR Check"].map((x) => (
                      <div key={x} className="p-4 rounded-2xl border border-gray-100 hover:border-[#FFD93D] transition-all">
                        <p className="font-semibold text-gray-900">{x}</p>
                        <p className="text-xs text-gray-600 mt-1">Due in 3 days</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFD93D]/10 via-[#FF5DA2]/10 to-[#00D4FF]/10 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">Revision Requests</h3>
                  <p className="text-sm text-gray-600 mt-1">Re-submit notes and track status</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="p-4 rounded-2xl bg-white border border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Supers glow intensity</p>
                      <p className="text-xs text-gray-600 mt-1">Waiting on update</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Lower third timing</p>
                      <p className="text-xs text-gray-600 mt-1">Submitted for review</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Cutdowns */}
        <TabsContent value="cutdowns">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Cutdowns</h2>
                <p className="text-sm text-gray-600">Duration-based exports with progress and export status</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cutdowns.map((c, idx) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{c.label}</p>
                      <p className="text-sm text-gray-600 mt-1">Assigned: <span className="font-semibold text-gray-900">{c.assignedEditor}</span></p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${c.status === "Ready" ? "bg-[#22C55E]/10 text-[#22C55E]" : c.status === "Blocked" ? "bg-[#EF4444]/10 text-[#EF4444]" : "bg-[#F59E0B]/10 text-[#F59E0B]"}`}>
                      {c.status}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Completion</span>
                      <span className="text-sm font-bold text-gray-900">{c.completion}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] rounded-full" style={{ width: pct(c.completion) }} />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-600">Due: <span className="font-semibold text-gray-900">{c.dueDate}</span></p>
                    <p className="text-xs text-gray-600">Export: <span className="font-semibold text-gray-900">{c.exportStatus}</span></p>
                    <p className="text-xs text-gray-600">Versions: <span className="font-semibold text-gray-900">{c.versionCount}</span></p>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Button variant="outline" className="rounded-2xl flex-1" onClick={() => {}}>
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </Button>
                    <Button className="rounded-2xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white" onClick={() => {}}>
                      <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Motion Graphics */}
        <TabsContent value="motion-graphics">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Motion Graphics</h2>
                <p className="text-sm text-gray-600">Supers, CTA, Logo Reveal, End Cards, Product Highlights, Lower Thirds</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {motionGraphicsTasks.map((t, idx) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{t.title}</p>
                      <p className="text-sm text-gray-600 mt-1">Assigned: <span className="font-semibold text-gray-900">{t.assignedArtist}</span></p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${t.priority === "High" ? "bg-[#EF4444]/10 text-[#EF4444]" : t.priority === "Medium" ? "bg-[#F59E0B]/10 text-[#F59E0B]" : "bg-[#22C55E]/10 text-[#22C55E]"}`}>
                      {t.priority}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-sm font-bold text-gray-900">{t.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] rounded-full" style={{ width: pct(t.progress) }} />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-600">Due: <span className="font-semibold text-gray-900">{t.dueDate}</span></p>
                    <p className="text-xs text-gray-600">Status: <span className="font-semibold text-gray-900">{t.completionStatus}</span></p>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-900">Dependencies</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {t.dependencies.map((d) => (
                        <span key={d} className="px-2.5 py-1 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-700">{d}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-900">Asset Requirements</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {t.assetRequirements.map((a) => (
                        <span key={a} className="px-2.5 py-1 rounded-2xl bg-gradient-to-r from-[#FFD93D]/10 to-[#FF5DA2]/10 border border-gray-100 text-xs font-semibold text-gray-700">{a}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* VFX */}
        <TabsContent value="vfx">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">VFX Production Dashboard</h2>
                <p className="text-sm text-gray-600">Shots, render queue tracking, review status, filtering and search</p>
              </div>
              <div className="w-full sm:w-96">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input value={timelineSearch} readOnly placeholder="Search shots..." className="pl-9 rounded-2xl" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { label: "Total Shots", value: vfxShots.length, icon: Package, gradient: "from-[#FFD93D] to-[#FF5DA2]" },
                { label: "Approved Shots", value: vfxShots.filter((s) => s.status === "Approved").length, icon: CheckCircle2, gradient: "from-[#22C55E] to-[#00D4FF]" },
                { label: "Shots In Progress", value: vfxShots.filter((s) => s.status === "In Progress").length, icon: Clock, gradient: "from-[#FFD93D] to-[#F59E0B]" },
                { label: "Pending Review", value: vfxShots.filter((s) => s.status === "Pending Review").length, icon: MessageSquare, gradient: "from-[#00D4FF] to-[#8B5CF6]" },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{card.label}</span>
                    </div>
                    <p className="mt-3 text-3xl font-bold text-gray-900">{card.value}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h3 className="text-xl font-bold text-gray-900">Shot Management</h3>
                <Button className="rounded-2xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white" onClick={() => {}}>
                  <Plus className="w-4 h-4 mr-2" /> Asset Upload
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[820px] w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      {[
                        "Shot ID",
                        "Shot Name",
                        "Sequence",
                        "Assigned Artist",
                        "Complexity",
                        "Status",
                        "Version Count",
                        "Due Date",
                        "Render Progress",
                      ].map((h) => (
                        <th key={h} className="py-3 px-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vfxShots.map((s, idx) => (
                      <tr key={s.shotId} className="border-t border-gray-100">
                        <td className="py-3 px-3 text-sm font-semibold text-gray-900">{s.shotId}</td>
                        <td className="py-3 px-3 text-sm text-gray-700">{s.name}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{s.sequence}</td>
                        <td className="py-3 px-3 text-sm text-gray-700">{s.assigned}</td>
                        <td className="py-3 px-3 text-sm text-gray-700">{s.complexity}</td>
                        <td className="py-3 px-3">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${s.status === "Approved" ? "bg-[#22C55E]/10 text-[#22C55E]" : s.status === "Pending Review" ? "bg-[#F59E0B]/10 text-[#F59E0B]" : "bg-[#FFD93D]/20 text-gray-900"}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-sm text-gray-600">{s.versionCount}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{s.dueDate}</td>
                        <td className="py-3 px-3 text-sm">
                          <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] rounded-full" style={{ width: pct(s.renderProgress) }} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{s.renderProgress}%</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                  <p className="text-sm font-semibold text-gray-900">Render Queue Tracking</p>
                  <p className="text-xs text-gray-600 mt-1">Next up: Shot S-002 (estimated 2h)</p>
                </div>
                <div className="p-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                  <p className="text-sm font-semibold text-gray-900">Approval History</p>
                  <p className="text-xs text-gray-600 mt-1">Last approved: S-003 • Jun 10</p>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* DI */}
        <TabsContent value="di">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">DI Color Grading</h2>
              <p className="text-sm text-gray-600">Scenes, LUT versions, HDR/SDR, review and export readiness</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { label: "Total Scenes", value: diScenes.length },
                { label: "Graded Scenes", value: diScenes.filter((s) => s.reviewStatus !== "Pending").length },
                { label: "Pending Scenes", value: diScenes.filter((s) => s.reviewStatus === "Pending").length },
                { label: "Approved Scenes", value: diScenes.filter((s) => s.reviewStatus === "Approved").length },
              ].map((c, idx) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
                >
                  <p className="text-sm text-gray-600 font-semibold">{c.label}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{c.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Scene Table</h3>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-[760px] w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      {[
                        "Scene Name",
                        "Colorist",
                        "Progress",
                        "LUT Version",
                        "HDR/SDR Status",
                        "Review Status",
                        "Export Status",
                      ].map((h) => (
                        <th key={h} className="py-3 px-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {diScenes.map((s, idx) => (
                      <tr key={s.name} className="border-t border-gray-100">
                        <td className="py-3 px-3 text-sm font-semibold text-gray-900">{s.name}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{s.colorist}</td>
                        <td className="py-3 px-3 text-sm">
                          <div className="w-44 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] rounded-full" style={{ width: pct(s.progress) }} />
                          </div>
                          <span className="block text-xs text-gray-500 mt-1">{s.progress}%</span>
                        </td>
                        <td className="py-3 px-3 text-sm text-gray-600">{s.lutVersion}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{s.hdrSdr}</td>
                        <td className="py-3 px-3">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${s.reviewStatus === "Approved" ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#F59E0B]/10 text-[#F59E0B]"}`}>{s.reviewStatus}</span>
                        </td>
                        <td className="py-3 px-3 text-sm">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${s.exportStatus === "Ready" ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-gray-100 text-gray-600"}`}>{s.exportStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                  <p className="text-sm font-semibold text-gray-900">Color Grading Timeline</p>
                  <p className="text-xs text-gray-600 mt-1">Scene 01 graded • Scene 02 pending review</p>
                </div>
                <div className="p-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                  <p className="text-sm font-semibold text-gray-900">Scene Comparison Viewer</p>
                  <p className="text-xs text-gray-600 mt-1">Compare: Scene 02 LUT v3 vs v4</p>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Sound */}
        <TabsContent value="sound">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sound Post-Production</h2>
              <p className="text-sm text-gray-600">VO, music, SFX, mixing, mastering, approvals, waveform preview</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { label: "Voice Over", value: soundTasks.find((x) => x.name === "Voice Over")?.progress ?? 0 },
                { label: "Background Music", value: soundTasks.find((x) => x.name === "Background Music")?.progress ?? 0 },
                { label: "Sound Effects", value: soundTasks.find((x) => x.name === "Sound Effects")?.progress ?? 0 },
                { label: "Mixing", value: soundTasks.find((x) => x.name === "Mixing")?.progress ?? 0 },
              ].map((c, idx) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
                >
                  <p className="text-sm text-gray-600 font-semibold">{c.label}</p>
                  <div className="mt-3">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] rounded-full" style={{ width: pct(c.value) }} />
                    </div>
                    <p className="mt-2 text-sm font-bold text-gray-900">{c.value}%</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Sound Tasks</h3>
              <div className="mt-4 space-y-3">
                {soundTasks.map((t) => (
                  <div key={t.name} className="p-4 rounded-2xl border border-gray-100 hover:border-[#FFD93D] transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-600 mt-1">Assigned: <span className="font-semibold">{t.assigned}</span></p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${t.status === "In Progress" ? "bg-[#F59E0B]/10 text-[#F59E0B]" : "bg-gray-100 text-gray-600"}`}>{t.status}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Due: <span className="font-semibold text-gray-900">{t.dueDate}</span></span>
                        <span className="text-xs text-gray-600">Progress: <span className="font-semibold text-gray-900">{t.progress}%</span></span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] rounded-full" style={{ width: pct(t.progress) }} />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Review notes: {t.reviewNotes}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Languages */}
        <TabsContent value="languages">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Localization Management</h2>
              <p className="text-sm text-gray-600">Translation, dubbing, subtitles, progress, and delivery readiness</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {languages.map((l, idx) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{l.name}</p>
                      <p className="text-sm text-gray-600 mt-1">Assigned Translator: <span className="font-semibold text-gray-900">{l.translator}</span></p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${l.deliveryReady === "Ready" ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#F59E0B]/10 text-[#F59E0B]"}`}>{l.deliveryReady}</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-sm font-bold text-gray-900">{l.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#00D4FF] rounded-full" style={{ width: pct(l.progress) }} />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <InfoRow label="Translation" value={l.translation} />
                    <InfoRow label="Dubbing" value={l.dubbing} />
                    <InfoRow label="Subtitles" value={l.subtitles} />
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                      <p className="text-xs text-gray-500">Localization Notes</p>
                      <p className="text-sm font-semibold text-gray-700 mt-1">{l.notes}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Approvals */}
        <TabsContent value="approvals">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Approval Workflow</h2>
              <p className="text-sm text-gray-600">Centralized approval queue across departments</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {["Pending Approvals", "Approved Items", "Rejected Items", "Under Review"].map((label, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg"
                >
                  <p className="text-sm text-gray-600 font-semibold">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{[3, 2, 1, 1][idx]}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Approval Table</h3>
                <span className="px-3 py-1.5 rounded-2xl text-xs font-semibold bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 text-gray-900 border border-gray-100">Filter by Department</span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      {["Item Name", "Department", "Submitted By", "Approver", "Status", "Approval Date", "Comments"].map((h) => (
                        <th key={h} className="py-3 px-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {approvals.map((a, idx) => (
                      <tr key={idx} className="border-t border-gray-100">
                        <td className="py-3 px-3 text-sm font-semibold text-gray-900">{a.itemName}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{a.department}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{a.submittedBy}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{a.approver}</td>
                        <td className="py-3 px-3">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${a.status === "Approved" ? "bg-[#22C55E]/10 text-[#22C55E]" : a.status === "Rejected" ? "bg-[#EF4444]/10 text-[#EF4444]" : a.status === "Under Review" ? "bg-[#FFD93D]/20 text-[#F59E0B]" : "bg-gray-100 text-gray-600"}`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-sm text-gray-600">{a.approvalDate}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{a.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Deliverables */}
        <TabsContent value="deliverables">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Deliverables Management</h2>
              <p className="text-sm text-gray-600">Formats, platforms, linked versions, delivery tracking, and client acknowledgement</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-[880px] w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      {["Deliverable Name","Format","Resolution","Duration","Delivery Platform","Linked Version","Delivery Date","Status","Client Acknowledgement"].map((h) => (
                        <th key={h} className="py-3 px-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {deliverables.map((d, idx) => (
                      <tr key={idx} className="border-t border-gray-100">
                        <td className="py-3 px-3 text-sm font-semibold text-gray-900">{d.name}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{d.format}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{d.resolution}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{d.duration}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{d.platform}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{d.linkedVersion}</td>
                        <td className="py-3 px-3 text-sm text-gray-600">{d.deliveryDate}</td>
                        <td className="py-3 px-3">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${d.status === "Ready" ? "bg-[#22C55E]/10 text-[#22C55E]" : d.status === "In Progress" ? "bg-[#F59E0B]/10 text-[#F59E0B]" : "bg-gray-100 text-gray-600"}`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-sm text-gray-600">{d.clientAck}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Activity Feed */}
        <TabsContent value="activity">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Live Production Activity</h2>
              <p className="text-sm text-gray-600">File uploads, version uploads, comments, approvals, and deliveries</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <div className="space-y-4">
                {activityItems.map((a) => (
                  <div key={a.id} className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#FFD93D] transition-all">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center text-white font-bold text-sm">
                          {a.user.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{a.user}</p>
                          <p className="text-xs text-gray-600">{a.department} • {a.module}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{a.action} • <span className="font-semibold text-gray-900">{a.project}</span></p>
                    </div>
                    <div className="text-xs text-gray-500">{a.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Close */}
      </Tabs>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function ProgressPill({ value }: { value: number }) {
  const label = `${Math.max(0, Math.min(100, value))}%`;

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#FFD93D]/20 to-[#FF5DA2]/20 border border-gray-100">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD93D] to-[#FF5DA2] flex items-center justify-center text-white font-bold">
        {Math.round(value / 10) * 10}
      </div>
      <div className="min-w-[86px]">
        <div className="text-xs text-gray-600 font-semibold">Overall</div>
        <div className="text-sm font-bold text-gray-900">{label}</div>
      </div>
    </div>
  );
}


