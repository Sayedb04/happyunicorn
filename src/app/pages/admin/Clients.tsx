import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Activity,
  ArrowUpDown,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Edit3,
  Eye,
  Filter,
  FolderKanban,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Send,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  Video,
  Copy,
  Check,
  PlusCircle,
  Briefcase,
  CalendarDays,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Skeleton } from "../../components/ui/skeleton";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Toaster } from "../../components/ui/sonner";
import { toast } from "sonner";

type ClientStatus = "Active" | "Inactive" | "Prospect" | "On Hold";

type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  activeProjects: number;
  completedProjects: number;
  lastActivity: string;
  contractValue: number;
  revenue: number;
  logoGradient: string;
  initials: string;
  recentInteractions: { type: string; message: string; time: string }[];
};

type ActivityItem = {
  id: string;
  type: "project" | "feedback" | "meeting" | "deliverable" | "approval";
  title: string;
  client: string;
  time: string;
};

type Meeting = {
  id: string;
  client: string;
  date: string;
  time: string;
  type: "Video Call" | "In Person" | "Phone Call";
};

const GRADIENTS = [
  "from-amber-400 via-pink-500 to-purple-600",
  "from-blue-600 via-indigo-600 to-sky-400",
  "from-sky-500 via-emerald-400 to-blue-600",
  "from-red-500 via-rose-600 to-amber-500",
  "from-purple-500 via-fuchsia-500 to-pink-500",
  "from-slate-700 to-slate-900",
  "from-amber-500 via-orange-600 to-slate-900",
  "from-blue-500 via-red-500 to-yellow-500"
];

const INITIAL_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    company: "Nike",
    email: "sarah.mitchell@nike.com",
    phone: "+1 (503) 555-0142",
    status: "Active",
    activeProjects: 2,
    completedProjects: 8,
    lastActivity: "2 hours ago",
    contractValue: 1200000,
    revenue: 980000,
    logoGradient: "from-amber-400 via-pink-500 to-purple-600",
    initials: "NK",
    recentInteractions: [
      { type: "Email", message: "Approved V3 cutdowns for Summer Campaign", time: "2 hours ago" },
      { type: "Call", message: "Creative review with Wieden+Kennedy team", time: "Yesterday" },
      { type: "Meeting", message: "Q3 pipeline planning session", time: "3 days ago" },
    ],
  },
  {
    id: "2",
    name: "David Park",
    company: "Apple",
    email: "david.park@apple.com",
    phone: "+1 (408) 555-0198",
    status: "Active",
    activeProjects: 1,
    completedProjects: 12,
    lastActivity: "5 hours ago",
    contractValue: 2400000,
    revenue: 2150000,
    logoGradient: "from-slate-800 to-slate-900",
    initials: "AP",
    recentInteractions: [
      { type: "Feedback", message: "Notes on iPhone 15 TVC color grade", time: "5 hours ago" },
      { type: "Email", message: "Requested additional language versions", time: "2 days ago" },
      { type: "Meeting", message: "TBWA\\Media Arts Lab sync", time: "1 week ago" },
    ],
  },
  {
    id: "3",
    name: "Elena Vasquez",
    company: "Samsung",
    email: "elena.v@samsung.com",
    phone: "+1 (972) 555-0176",
    status: "Active",
    activeProjects: 1,
    completedProjects: 6,
    lastActivity: "1 day ago",
    contractValue: 890000,
    revenue: 720000,
    logoGradient: "from-blue-600 via-indigo-600 to-sky-400",
    initials: "SS",
    recentInteractions: [
      { type: "Approval", message: "Signed off Galaxy Launch VFX pass", time: "1 day ago" },
      { type: "Call", message: "Leo Burnett producer check-in", time: "4 days ago" },
    ],
  },
  {
    id: "4",
    name: "James Hart",
    company: "Tesla",
    email: "james.hart@tesla.com",
    phone: "+1 (650) 555-0133",
    status: "On Hold",
    activeProjects: 1,
    completedProjects: 3,
    lastActivity: "3 days ago",
    contractValue: 650000,
    revenue: 410000,
    logoGradient: "from-red-600 to-neutral-900",
    initials: "TS",
    recentInteractions: [
      { type: "Email", message: "Paused Model Y promo pending legal review", time: "3 days ago" },
      { type: "Meeting", message: "Droga5 alignment on delivery timeline", time: "2 weeks ago" },
    ],
  },
  {
    id: "5",
    name: "Rachel Kim",
    company: "Coca-Cola",
    email: "rachel.kim@coca-cola.com",
    phone: "+1 (404) 555-0167",
    status: "Active",
    activeProjects: 2,
    completedProjects: 15,
    lastActivity: "4 hours ago",
    contractValue: 1800000,
    revenue: 1620000,
    logoGradient: "from-red-500 via-rose-600 to-amber-500",
    initials: "CC",
    recentInteractions: [
      { type: "Deliverable", message: "Global anthem master delivered", time: "4 hours ago" },
      { type: "Feedback", message: "Requested brighter DI on 30s cut", time: "Yesterday" },
    ],
  },
  {
    id: "6",
    name: "Marcus Weber",
    company: "BMW",
    email: "marcus.weber@bmw.com",
    phone: "+49 89 555-0190",
    status: "Active",
    activeProjects: 1,
    completedProjects: 9,
    lastActivity: "6 hours ago",
    contractValue: 1100000,
    revenue: 940000,
    logoGradient: "from-sky-700 via-blue-800 to-neutral-900",
    initials: "BM",
    recentInteractions: [
      { type: "Meeting", message: "Munich studio walkthrough scheduled", time: "6 hours ago" },
      { type: "Approval", message: "Approved electric series launch film", time: "3 days ago" },
    ],
  },
  {
    id: "7",
    name: "Priya Sharma",
    company: "Amazon",
    email: "priya.sharma@amazon.com",
    phone: "+1 (206) 555-0188",
    status: "Prospect",
    activeProjects: 0,
    completedProjects: 2,
    lastActivity: "1 week ago",
    contractValue: 320000,
    revenue: 180000,
    logoGradient: "from-amber-500 via-orange-600 to-slate-900",
    initials: "AM",
    recentInteractions: [
      { type: "Project", message: "Prime Day retail spot — proposal sent", time: "1 week ago" },
      { type: "Call", message: "Intro call with brand marketing lead", time: "2 weeks ago" },
    ],
  },
  {
    id: "8",
    name: "Tom Anderson",
    company: "Google",
    email: "tom.anderson@google.com",
    phone: "+1 (650) 555-0120",
    status: "Active",
    activeProjects: 3,
    completedProjects: 11,
    lastActivity: "30 min ago",
    contractValue: 2100000,
    revenue: 1875000,
    logoGradient: "from-blue-500 via-red-500 to-yellow-500",
    initials: "GO",
    recentInteractions: [
      { type: "Feedback", message: "Pixel campaign motion graphics notes", time: "30 min ago" },
      { type: "Deliverable", message: "Search brand film finals uploaded", time: "Yesterday" },
    ],
  },
  {
    id: "9",
    name: "Lisa Monroe",
    company: "Mercedes-Benz",
    email: "lisa.monroe@mercedes-benz.com",
    phone: "+1 (678) 555-0155",
    status: "Inactive",
    activeProjects: 0,
    completedProjects: 7,
    lastActivity: "3 weeks ago",
    contractValue: 950000,
    revenue: 950000,
    logoGradient: "from-zinc-700 via-neutral-800 to-zinc-900",
    initials: "MB",
    recentInteractions: [
      { type: "Email", message: "Contract renewal deferred to Q4", time: "3 weeks ago" },
    ],
  },
  {
    id: "10",
    name: "Carlos Mendez",
    company: "Adidas",
    email: "carlos.mendez@adidas.com",
    phone: "+49 9132 555-0144",
    status: "Active",
    activeProjects: 1,
    completedProjects: 5,
    lastActivity: "Yesterday",
    contractValue: 780000,
    revenue: 620000,
    logoGradient: "from-neutral-900 via-neutral-800 to-stone-700",
    initials: "AD",
    recentInteractions: [
      { type: "Approval", message: "World Cup anthem edit approved", time: "Yesterday" },
      { type: "Meeting", message: "Athlete spot storyboard review", time: "5 days ago" },
    ],
  },
];

const INITIAL_ACTIVITY: ActivityItem[] = [
  { id: "a1", type: "project", title: "New project request — Nike Fall Global", client: "Nike", time: "2 hours ago" },
  { id: "a2", type: "feedback", title: "Color grade feedback on iPhone 15 TVC", client: "Apple", time: "5 hours ago" },
  { id: "a3", type: "meeting", title: "VFX review sync scheduled", client: "Samsung", time: "Yesterday" },
  { id: "a4", type: "deliverable", title: "Master files sent for Prime anthem", client: "Coca-Cola", time: "4 hours ago" },
  { id: "a5", type: "approval", title: "Final cut approved — Pixel Launch", client: "Google", time: "30 min ago" },
  { id: "a6", type: "deliverable", title: "Social cutdowns delivered", client: "Adidas", time: "Yesterday" },
];

const INITIAL_MEETINGS: Meeting[] = [
  { id: "m1", client: "Nike", date: "Jun 22, 2026", time: "2:00 PM", type: "Video Call" },
  { id: "m2", client: "Apple", date: "Jun 23, 2026", time: "10:30 AM", type: "In Person" },
  { id: "m3", client: "Samsung", date: "Jun 24, 2026", time: "4:00 PM", type: "Video Call" },
  { id: "m4", client: "Google", date: "Jun 25, 2026", time: "11:00 AM", type: "Video Call" },
  { id: "m5", client: "BMW", date: "Jun 26, 2026", time: "9:00 AM", type: "Phone Call" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function statusStyle(status: ClientStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "Inactive":
      return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    case "Prospect":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    case "On Hold":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  }
}

function activityIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "project":
      return <FolderKanban className="h-4 w-4 text-purple-500" />;
    case "feedback":
      return <MessageSquare className="h-4 w-4 text-pink-500" />;
    case "meeting":
      return <Calendar className="h-4 w-4 text-blue-500" />;
    case "deliverable":
      return <Send className="h-4 w-4 text-amber-500" />;
    case "approval":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  }
}

function activityLabel(type: ActivityItem["type"]) {
  switch (type) {
    case "project":
      return "New Project Request";
    case "feedback":
      return "Feedback Received";
    case "meeting":
      return "Meeting Scheduled";
    case "deliverable":
      return "Deliverables Sent";
    case "approval":
      return "Approval Received";
  }
}

function meetingIcon(type: Meeting["type"]) {
  switch (type) {
    case "Video Call":
      return <Video className="h-4 w-4 text-blue-500" />;
    case "In Person":
      return <Users className="h-4 w-4 text-pink-500" />;
    case "Phone Call":
      return <Phone className="h-4 w-4 text-amber-500" />;
  }
}

type SortKey = "name" | "company" | "contractValue" | "lastActivity" | "activeProjects";

export default function AdminClients() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Interactive roster state
  const [clientsList, setClientsList] = useState<Client[]>(INITIAL_CLIENTS);
  const [activityList, setActivityList] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const [meetingsList, setMeetingsList] = useState<Meeting[]>(INITIAL_MEETINGS);

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("name");
  
  // Detail Panel State
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // CRUD Dialog States
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  // Selection references
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  // Form Field States
  const [formName, setFormName] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formStatus, setFormStatus] = useState<ClientStatus>("Active");
  const [formActiveProjects, setFormActiveProjects] = useState(0);
  const [formCompletedProjects, setFormCompletedProjects] = useState(0);
  const [formContractValue, setFormContractValue] = useState(0);
  const [formRevenue, setFormRevenue] = useState(0);

  // Live note logging inside side panel
  const [noteMessage, setNoteMessage] = useState("");
  const [noteType, setNoteType] = useState<string>("Email");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const companies = useMemo(
    () => [...new Set(clientsList.map((c) => c.company))].sort(),
    [clientsList],
  );

  const stats = useMemo(
    () => ({
      total: clientsList.length,
      active: clientsList.filter((c) => c.status === "Active").length,
      ongoing: clientsList.reduce((sum, c) => sum + c.activeProjects, 0),
      completed: clientsList.reduce((sum, c) => sum + c.completedProjects, 0),
      revenue: clientsList.reduce((sum, c) => sum + c.revenue, 0),
    }),
    [clientsList],
  );

  const filteredClients = useMemo(() => {
    let list = [...clientsList];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((c) => c.status === statusFilter);
    }

    if (companyFilter !== "all") {
      list = list.filter((c) => c.company === companyFilter);
    }

    list.sort((a, b) => {
      switch (sortBy) {
        case "company":
          return a.company.localeCompare(b.company);
        case "contractValue":
          return b.contractValue - a.contractValue;
        case "activeProjects":
          return b.activeProjects - a.activeProjects;
        case "lastActivity":
          return a.lastActivity.localeCompare(b.lastActivity);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return list;
  }, [clientsList, search, statusFilter, companyFilter, sortBy]);

  const openProfile = (client: Client) => {
    setSelectedClient(client);
    setProfileOpen(true);
  };

  // Helper: Get Initials
  const getInitials = (co: string) => {
    return co.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  };

  // CRUD handlers
  const handleOpenAdd = () => {
    setFormName("");
    setFormCompany("");
    setFormEmail("");
    setFormPhone("");
    setFormStatus("Active");
    setFormActiveProjects(0);
    setFormCompletedProjects(0);
    setFormContractValue(0);
    setFormRevenue(0);
    setAddOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCompany.trim()) {
      toast.error("Contact Person and Company Name are required.");
      return;
    }

    const emailStr = formEmail.trim() || `${formName.toLowerCase().replace(/\s+/g, ".")}@${formCompany.toLowerCase().replace(/\s+/g, "")}.com`;
    const phoneStr = formPhone.trim() || "+1 (555) 010-0000";

    const newClient: Client = {
      id: Math.random().toString(36).substr(2, 9),
      name: formName,
      company: formCompany,
      email: emailStr,
      phone: phoneStr,
      status: formStatus,
      activeProjects: Number(formActiveProjects),
      completedProjects: Number(formCompletedProjects),
      lastActivity: "Just added",
      contractValue: Number(formContractValue),
      revenue: Number(formRevenue),
      logoGradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
      initials: getInitials(formCompany),
      recentInteractions: [
        { type: "System", message: "Client added to CRM Roster", time: "Just now" }
      ]
    };

    setClientsList([newClient, ...clientsList]);
    setAddOpen(false);
    toast.success(`Client ${formCompany} has been created successfully!`);

    // Log Activity
    const newAct: ActivityItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: "project",
      client: formCompany,
      title: `New client roster onboarded: ${formCompany}`,
      time: "Just now"
    };
    setActivityList([newAct, ...activityList]);
  };

  const handleOpenEdit = (client: Client) => {
    setClientToEdit(client);
    setFormName(client.name);
    setFormCompany(client.company);
    setFormEmail(client.email);
    setFormPhone(client.phone);
    setFormStatus(client.status);
    setFormActiveProjects(client.activeProjects);
    setFormCompletedProjects(client.completedProjects);
    setFormContractValue(client.contractValue);
    setFormRevenue(client.revenue);
    setEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientToEdit) return;

    if (!formName.trim() || !formCompany.trim()) {
      toast.error("Contact Person and Company Name are required.");
      return;
    }

    const updated = clientsList.map((c) => {
      if (c.id === clientToEdit.id) {
        return {
          ...c,
          name: formName,
          company: formCompany,
          email: formEmail,
          phone: formPhone,
          status: formStatus,
          activeProjects: Number(formActiveProjects),
          completedProjects: Number(formCompletedProjects),
          contractValue: Number(formContractValue),
          revenue: Number(formRevenue),
          initials: getInitials(formCompany),
        };
      }
      return c;
    });

    setClientsList(updated);

    // If active profile open is the edited client, sync it
    if (selectedClient && selectedClient.id === clientToEdit.id) {
      setSelectedClient({
        ...selectedClient,
        name: formName,
        company: formCompany,
        email: formEmail,
        phone: formPhone,
        status: formStatus,
        activeProjects: Number(formActiveProjects),
        completedProjects: Number(formCompletedProjects),
        contractValue: Number(formContractValue),
        revenue: Number(formRevenue),
        initials: getInitials(formCompany),
      });
    }

    setEditOpen(false);
    toast.success(`Client ${formCompany} details updated.`);

    // Log Activity
    const newAct: ActivityItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: "feedback",
      client: formCompany,
      title: `Client account information updated for ${formCompany}`,
      time: "Just now"
    };
    setActivityList([newAct, ...activityList]);
  };

  const handleTriggerDelete = (client: Client) => {
    setClientToDelete(client);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!clientToDelete) return;

    setClientsList(clientsList.filter((c) => c.id !== clientToDelete.id));

    if (selectedClient && selectedClient.id === clientToDelete.id) {
      setSelectedClient(null);
      setProfileOpen(false);
    }

    setDeleteOpen(false);
    toast.success(`Removed client ${clientToDelete.company} from system.`);

    // Log Activity
    const newAct: ActivityItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: "feedback",
      client: clientToDelete.company,
      title: `Client roster removal: ${clientToDelete.company} deleted`,
      time: "Just now"
    };
    setActivityList([newAct, ...activityList]);
    setClientToDelete(null);
  };

  // Copy clip board helper
  const handleCopyValue = (val: string, field: string) => {
    navigator.clipboard.writeText(val);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Log note from profile sheet
  const handleLogNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !noteMessage.trim()) return;

    const newInt = {
      type: noteType,
      message: noteMessage,
      time: "Just now",
    };

    const updated = clientsList.map((c) => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          lastActivity: "Just now",
          recentInteractions: [newInt, ...c.recentInteractions],
        };
      }
      return c;
    });

    setClientsList(updated);
    setSelectedClient({
      ...selectedClient,
      lastActivity: "Just now",
      recentInteractions: [newInt, ...selectedClient.recentInteractions],
    });

    // Map note type to Activity type
    let actType: ActivityItem["type"] = "feedback";
    if (noteType === "Email") actType = "project";
    else if (noteType === "Call") actType = "meeting";
    else if (noteType === "Meeting") actType = "meeting";
    else if (noteType === "Feedback") actType = "feedback";
    else if (noteType === "Approval") actType = "approval";
    else if (noteType === "Deliverable") actType = "deliverable";

    const newAct: ActivityItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: actType,
      client: selectedClient.company,
      title: `${noteType} logged: "${noteMessage.length > 32 ? noteMessage.substr(0, 32) + "..." : noteMessage}"`,
      time: "Just now"
    };
    setActivityList([newAct, ...activityList]);

    setNoteMessage("");
    toast.success("Interaction note saved successfully!");
  };

  // Direct status update in sidebar
  const handleDirectStatusChange = (newStatus: ClientStatus) => {
    if (!selectedClient) return;

    const updated = clientsList.map((c) => {
      if (c.id === selectedClient.id) {
        return { ...c, status: newStatus };
      }
      return c;
    });

    setClientsList(updated);
    setSelectedClient({ ...selectedClient, status: newStatus });
    toast.success(`Client status updated to ${newStatus}`);

    const newAct: ActivityItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: "approval",
      client: selectedClient.company,
      title: `Status set to ${newStatus} for ${selectedClient.company}`,
      time: "Just now"
    };
    setActivityList([newAct, ...activityList]);
  };

  // Upcoming meetings checkoff toggle (mark as done)
  const handleMeetingChecked = (meetId: string, clientName: string) => {
    setMeetingsList(meetingsList.filter((m) => m.id !== meetId));
    toast.success(`Meeting with ${clientName} marked as completed!`);

    const newAct: ActivityItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: "meeting",
      client: clientName,
      title: `Meeting concluded with ${clientName}`,
      time: "Just now"
    };
    setActivityList([newAct, ...activityList]);
  };

  const statCards = [
    { label: "Total Clients", value: stats.total, icon: Users, gradient: "from-[#FFD93D]/15 to-[#FF5DA2]/15", iconColor: "text-[#FF5DA2]", desc: "+3 this month" },
    { label: "Active Clients", value: stats.active, icon: TrendingUp, gradient: "from-[#22C55E]/15 to-[#00D4FF]/15", iconColor: "text-[#22C55E]", desc: "88% active rate" },
    { label: "Ongoing Projects", value: stats.ongoing, icon: FolderKanban, gradient: "from-[#8B5CF6]/15 to-[#FF5DA2]/15", iconColor: "text-[#8B5CF6]", desc: "+5 new briefs" },
    { label: "Completed Projects", value: stats.completed, icon: CheckCircle2, gradient: "from-[#00D4FF]/15 to-[#FFD93D]/15", iconColor: "text-[#00D4FF]", desc: "98% on-time rate" },
    { label: "Revenue Generated", value: formatCurrency(stats.revenue), icon: DollarSign, gradient: "from-[#FFD93D]/15 to-[#22C55E]/15", iconColor: "text-[#22C55E]", desc: "+15% YoY growth", isWide: true },
  ];

  return (
    <div className="relative space-y-6">
      {/* Background Decorative Blob Gradients */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-[#FFD93D]/5 to-[#FF5DA2]/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-gradient-to-tr from-[#00D4FF]/5 to-[#8B5CF6]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Toaster position="top-right" closeButton richColors />

      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-[#FF5DA2] animate-ping" />
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Live Pipeline System</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">CRM Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Track account health, log interactions, and coordinate billing across your roster
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleOpenAdd}
            className="h-12 rounded-2xl bg-gradient-to-r from-[#FFD93D] via-[#FF5DA2] to-[#8B5CF6] px-6 text-white font-bold shadow-lg hover:shadow-xl hover:brightness-105 border-0 transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-1.5" />
            Add Client
          </Button>
        </motion.div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-[28px] border border-white/20" />
            ))
          : statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[28px] border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)] transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-40 transition-opacity group-hover:opacity-60 duration-300`} />
                  <div className="relative flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{card.label}</p>
                      <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{card.value}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{card.desc}</p>
                    </div>
                    <div className={`rounded-2xl bg-white p-3 shadow-md border border-slate-100/50 group-hover:scale-110 transition-transform duration-300 ${card.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
      </div>

      {/* Toolbar / Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients by name, company, or email..."
              className="h-12 rounded-2xl border-slate-200/80 bg-white/50 pl-12 focus-visible:ring-[#FF5DA2]/30 focus:border-[#FF5DA2]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#FF5DA2] hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Filters:</span>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 w-[160px] rounded-2xl border-slate-200/80 bg-white/60 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 bg-white">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Prospect">Prospect</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>

            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="h-12 w-[180px] rounded-2xl border-slate-200/80 bg-white/60 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <SelectValue placeholder="Company" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 bg-white shadow-xl">
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map((co) => (
                  <SelectItem key={co} value={co}>
                    {co}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
              <SelectTrigger className="h-12 w-[180px] rounded-2xl border-slate-200/80 bg-white/60 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <ArrowUpDown className="h-4 w-4 text-slate-400" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 bg-white">
                <SelectItem value="name">Contact Person</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="contractValue">Contract Value</SelectItem>
                <SelectItem value="activeProjects">Active Projects</SelectItem>
                <SelectItem value="lastActivity">Last Activity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Main CRM Workspace Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left Side: Table Area */}
        <div className="xl:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]"
          >
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-white/20">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Client Directory</h2>
                <p className="text-xs text-slate-500">
                  {loading ? "Loading roster..." : `${filteredClients.length} match${filteredClients.length === 1 ? "" : "es"} found`}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {clientsList.filter(c => c.status === "Active").length} Active Accounts
                </span>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4 p-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-2xl border border-slate-50" />
                ))}
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-4 rounded-full bg-gradient-to-br from-[#FFD93D]/10 to-[#FF5DA2]/10 p-6 border border-[#FFD93D]/20"
                >
                  <UserPlus className="h-10 w-10 text-[#FF5DA2]" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900">No matching clients</h3>
                <p className="mt-2 max-w-sm text-slate-500 text-sm">
                  We couldn't find anyone matching your search filters. Adjust your query or add a brand new account.
                </p>
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="rounded-xl bg-white"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("all");
                      setCompanyFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Button
                    className="rounded-xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white border-0"
                    onClick={handleOpenAdd}
                  >
                    Add Client
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-100 hover:bg-transparent">
                      <TableHead className="px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Client Name</TableHead>
                      <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company</TableHead>
                      <TableHead className="hidden md:table-cell text-xs font-bold text-slate-400 uppercase tracking-wider">Email</TableHead>
                      <TableHead className="hidden lg:table-cell text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</TableHead>
                      <TableHead className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</TableHead>
                      <TableHead className="hidden sm:table-cell text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Active Projects</TableHead>
                      <TableHead className="hidden lg:table-cell text-xs font-bold text-slate-400 uppercase tracking-wider">Last Activity</TableHead>
                      <TableHead className="hidden md:table-cell text-xs font-bold text-slate-400 uppercase tracking-wider">Contract Value</TableHead>
                      <TableHead className="px-6 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredClients.map((client, index) => (
                        <motion.tr
                          key={client.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.02 }}
                          onClick={() => openProfile(client)}
                          className="group cursor-pointer border-slate-100/50 hover:bg-gradient-to-r hover:from-white/40 hover:to-white/80 transition-all duration-200 border-b last:border-0"
                        >
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${client.logoGradient} text-sm font-extrabold text-white shadow-md border border-white/20 group-hover:scale-105 transition-transform`}
                              >
                                {client.initials}
                              </div>
                              <div>
                                <span className="block font-bold text-slate-900 text-sm leading-tight">{client.name}</span>
                                <span className="block text-[11px] text-slate-400 font-medium md:hidden">{client.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-slate-700 text-sm">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="h-3.5 w-3.5 text-slate-400" />
                              {client.company}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-slate-500 text-sm">{client.email}</TableCell>
                          <TableCell className="hidden lg:table-cell text-slate-500 text-sm">{client.phone}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase flex items-center w-max gap-1 ${statusStyle(client.status)}`}>
                              {client.status === "Active" && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              )}
                              {client.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-center">
                            <span className="font-extrabold text-slate-900 bg-slate-100 rounded-xl px-2.5 py-1 text-xs border border-slate-200/50">
                              {client.activeProjects}
                            </span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-slate-400 text-xs font-semibold">{client.lastActivity}</TableCell>
                          <TableCell className="hidden md:table-cell font-bold text-slate-900 text-sm">
                            {formatCurrency(client.contractValue)}
                          </TableCell>
                          <TableCell className="px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200/50">
                                  <MoreHorizontal className="h-4 w-4 text-slate-600" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl border-slate-100 shadow-xl bg-white p-1 min-w-[150px]">
                                <DropdownMenuItem className="rounded-xl flex items-center gap-2 text-slate-700" onClick={() => openProfile(client)}>
                                  <Eye className="h-4 w-4 text-slate-400" /> View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl flex items-center gap-2 text-slate-700" onClick={() => handleOpenEdit(client)}>
                                  <Edit3 className="h-4 w-4 text-slate-400" /> Edit Client
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl flex items-center gap-2 text-slate-700" onClick={() => navigate("/admin/projects")}>
                                  <FolderKanban className="h-4 w-4 text-slate-400" /> View Projects
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="border-slate-100" />
                                <DropdownMenuItem
                                  onClick={() => handleTriggerDelete(client)}
                                  className="rounded-xl flex items-center gap-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                                >
                                  <Trash2 className="h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Side: Activity & Meetings */}
        <div className="space-y-6 xl:col-span-4">
          {/* Recent Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#FF5DA2]" />
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Recent Activity</h2>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-100 rounded-lg px-2 py-0.5 border border-slate-200/50">Feed</span>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-2xl border border-slate-50" />
                ))}
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {activityList.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      className="rounded-2xl border border-slate-100 bg-white/50 p-3 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-white p-2 border border-slate-100 shadow-xs shrink-0">{activityIcon(item.type)}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {activityLabel(item.type)}
                            </p>
                            <span className="text-[10px] font-semibold text-slate-400">{item.time}</span>
                          </div>
                          <p className="mt-0.5 text-xs font-bold text-slate-800 line-clamp-2 leading-tight">{item.title}</p>
                          <p className="text-[10px] text-slate-500 font-semibold mt-1">
                            Client: <span className="text-slate-900">{item.client}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Upcoming Meetings Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.04)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Upcoming Syncs</h2>
              </div>
              <span className="text-[10px] font-bold text-[#FF5DA2] uppercase tracking-wide bg-pink-50 rounded-lg px-2 py-0.5 border border-pink-200/30">Agenda</span>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-2xl border border-slate-50" />
                ))}
              </div>
            ) : meetingsList.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl bg-white/40">
                <CheckCircle2 className="h-7 w-7 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">All meetings caught up!</p>
                <p className="text-[10px] text-slate-400">Log new appointments in client profiles</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {meetingsList.map((meeting, index) => (
                    <motion.div
                      key={meeting.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ scale: 1.01 }}
                      className="rounded-2xl border border-slate-100 bg-gradient-to-br from-[#FFD93D]/5 via-white to-[#FF5DA2]/5 p-4 shadow-sm relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm">{meeting.client}</p>
                          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-semibold">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              {meeting.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              {meeting.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 shadow-xs border border-slate-100">
                            {meetingIcon(meeting.type)}
                            {meeting.type}
                          </div>
                          <button
                            onClick={() => handleMeetingChecked(meeting.id, meeting.client)}
                            className="text-[10px] font-bold text-emerald-600 hover:text-white hover:bg-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/50 transition-all cursor-pointer"
                          >
                            Mark Done
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Client Profile Side Panel */}
      <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
        <SheetContent className="w-full overflow-y-auto border-slate-200 bg-white/95 backdrop-blur-xl sm:max-w-md p-6">
          <AnimatePresence mode="wait">
            {selectedClient && (
              <motion.div
                key={selectedClient.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <SheetHeader className="pb-4 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br ${selectedClient.logoGradient} text-xl font-black text-white shadow-md border-2 border-white`}
                      >
                        {selectedClient.initials}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <SheetTitle className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
                        {selectedClient.company}
                      </SheetTitle>
                      <SheetDescription className="text-sm font-semibold text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-slate-400" />
                        <span>Contact Person: <strong className="text-slate-700">{selectedClient.name}</strong></span>
                      </SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                {/* Quick Info & Copy Triggers */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Email & Correspondence</span>
                    <button
                      onClick={() => handleCopyValue(selectedClient.email, "Email")}
                      className="text-[#FF5DA2] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === "Email" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copiedField === "Email" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                    <Mail className="h-4 w-4 text-[#FF5DA2] shrink-0" />
                    <span className="truncate">{selectedClient.email}</span>
                  </div>

                  <div className="h-px bg-slate-200/50 my-2" />

                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Direct Phone Line</span>
                    <button
                      onClick={() => handleCopyValue(selectedClient.phone, "Phone")}
                      className="text-[#FF5DA2] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === "Phone" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copiedField === "Phone" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                    <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                    <span>{selectedClient.phone}</span>
                  </div>
                </div>

                {/* Status Selection directly in details */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Change Status</Label>
                  <Select value={selectedClient.status} onValueChange={(val) => handleDirectStatusChange(val as ClientStatus)}>
                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 bg-white">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Prospect">Prospect</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Projects", value: selectedClient.activeProjects + selectedClient.completedProjects, sub: `${selectedClient.completedProjects} done`, color: "from-[#FFD93D]/10 to-[#FF5DA2]/10 text-slate-900 border-amber-200/50" },
                    { label: "Active", value: selectedClient.activeProjects, sub: "ongoing", color: "from-[#00D4FF]/10 to-[#8B5CF6]/10 text-slate-900 border-blue-200/50" },
                    { label: "Revenue", value: formatCurrency(selectedClient.revenue), sub: "aggregate", color: "from-[#22C55E]/10 to-[#00D4FF]/10 text-slate-900 border-emerald-200/50" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`rounded-2xl border bg-gradient-to-br ${stat.color} p-3.5 text-center flex flex-col justify-between`}
                    >
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-tight">{stat.label}</p>
                      <p className="mt-2 text-base font-black text-slate-900 tracking-tight leading-none">{stat.value}</p>
                      <p className="text-[9px] text-slate-400 font-semibold mt-1 leading-none">{stat.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Log Note Form */}
                <div className="rounded-2xl border border-dashed border-slate-200 p-4 bg-slate-50/20 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Log Interaction Note</h4>
                  <form onSubmit={handleLogNote} className="space-y-3">
                    <Textarea
                      placeholder="Type a summary of the meeting, call, or email notes..."
                      value={noteMessage}
                      onChange={(e) => setNoteMessage(e.target.value)}
                      className="min-h-[70px] rounded-xl bg-white border-slate-200 text-sm focus:ring-slate-300"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase mr-1">Type:</Label>
                        <Select value={noteType} onValueChange={setNoteType}>
                          <SelectTrigger className="h-8 w-[110px] rounded-lg text-xs border-slate-200 bg-white py-0 px-2.5">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100 bg-white">
                            <SelectItem value="Email">Email</SelectItem>
                            <SelectItem value="Call">Call</SelectItem>
                            <SelectItem value="Meeting">Meeting</SelectItem>
                            <SelectItem value="Feedback">Feedback</SelectItem>
                            <SelectItem value="Approval">Approval</SelectItem>
                            <SelectItem value="Deliverable">Deliverable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="submit"
                        disabled={!noteMessage.trim()}
                        className="h-8 rounded-lg bg-slate-900 text-white font-bold text-xs px-3 shadow-md hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                      >
                        Log Interaction
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Interaction Timeline */}
                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recent Interactions Timeline
                  </h3>
                  <div className="relative border-l-2 border-slate-100 pl-4 ml-2 space-y-4 max-h-[250px] overflow-y-auto pr-1">
                    {selectedClient.recentInteractions.map((interaction, i) => (
                      <div key={i} className="relative group/time">
                        {/* Timeline Node Point */}
                        <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 border-2 border-white ring-2 ring-slate-100 group-hover/time:bg-[#FF5DA2] group-hover/time:ring-pink-100 transition-all shrink-0" />
                        <div className="rounded-xl border border-slate-100/80 bg-white p-3 shadow-xs hover:shadow-sm hover:border-slate-200 transition-all duration-300">
                          <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                            <span className="text-[#8B5CF6] uppercase tracking-wide bg-purple-50 px-2 py-0.5 rounded-md">
                              {interaction.type}
                            </span>
                            <span className="text-slate-400 font-semibold">{interaction.time}</span>
                          </div>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">{interaction.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Panel Actions */}
                <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                  <Button
                    className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white font-bold border-0 shadow-md cursor-pointer"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/projects");
                    }}
                  >
                    <FolderKanban className="h-4 w-4 mr-1" />
                    View Projects
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 rounded-xl font-bold border-slate-200 cursor-pointer"
                    onClick={() => {
                      setProfileOpen(false);
                      handleOpenEdit(selectedClient);
                    }}
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>

      {/* Add Client Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="rounded-2xl border-slate-200 bg-white sm:max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-slate-900">Add New CRM Account</DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-medium">
              Create a new client profile in your agency roster. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="add-name" className="text-xs font-bold text-slate-600">Contact Person *</Label>
                <Input
                  id="add-name"
                  placeholder="e.g. Sarah Mitchell"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="add-company" className="text-xs font-bold text-slate-600">Company Name *</Label>
                <Input
                  id="add-company"
                  placeholder="e.g. Nike"
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="add-email" className="text-xs font-bold text-slate-600">Email Address</Label>
                <Input
                  id="add-email"
                  type="email"
                  placeholder="e.g. contact@nike.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="add-phone" className="text-xs font-bold text-slate-600">Phone Number</Label>
                <Input
                  id="add-phone"
                  placeholder="e.g. +1 (503) 555-0100"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5 col-span-1">
                <Label className="text-xs font-bold text-slate-600">Roster Status</Label>
                <Select value={formStatus} onValueChange={(v) => setFormStatus(v as ClientStatus)}>
                  <SelectTrigger className="rounded-xl border-slate-200 h-10 text-xs bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 bg-white">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label htmlFor="add-active-projects" className="text-xs font-bold text-slate-600">Active Projs</Label>
                <Input
                  id="add-active-projects"
                  type="number"
                  min="0"
                  value={formActiveProjects}
                  onChange={(e) => setFormActiveProjects(Math.max(0, parseInt(e.target.value) || 0))}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label htmlFor="add-completed-projects" className="text-xs font-bold text-slate-600">Done Projs</Label>
                <Input
                  id="add-completed-projects"
                  type="number"
                  min="0"
                  value={formCompletedProjects}
                  onChange={(e) => setFormCompletedProjects(Math.max(0, parseInt(e.target.value) || 0))}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="add-contract" className="text-xs font-bold text-slate-600">Contract Value ($)</Label>
                <Input
                  id="add-contract"
                  type="number"
                  min="0"
                  step="1000"
                  value={formContractValue}
                  onChange={(e) => setFormContractValue(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="add-revenue" className="text-xs font-bold text-slate-600">Revenue Generated ($)</Label>
                <Input
                  id="add-revenue"
                  type="number"
                  min="0"
                  step="1000"
                  value={formRevenue}
                  onChange={(e) => setFormRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
            </div>

            <DialogFooter className="pt-2 border-t border-slate-100 flex flex-row gap-2 justify-end">
              <Button type="button" variant="outline" className="rounded-xl h-10 text-sm font-semibold cursor-pointer" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-10 bg-[#FF5DA2] hover:bg-[#FF5DA2]/90 text-white font-bold text-sm px-4 cursor-pointer">
                Onboard Client
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="rounded-2xl border-slate-200 bg-white sm:max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-slate-900">Edit Client Account</DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-medium">
              Update details for {formCompany}. Modify contact information, project tallies, or valuation metrics.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-name" className="text-xs font-bold text-slate-600">Contact Person *</Label>
                <Input
                  id="edit-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-company" className="text-xs font-bold text-slate-600">Company Name *</Label>
                <Input
                  id="edit-company"
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-email" className="text-xs font-bold text-slate-600">Email Address</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-phone" className="text-xs font-bold text-slate-600">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5 col-span-1">
                <Label className="text-xs font-bold text-slate-600">Roster Status</Label>
                <Select value={formStatus} onValueChange={(v) => setFormStatus(v as ClientStatus)}>
                  <SelectTrigger className="rounded-xl border-slate-200 h-10 text-xs bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 bg-white">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label htmlFor="edit-active-projects" className="text-xs font-bold text-slate-600">Active Projs</Label>
                <Input
                  id="edit-active-projects"
                  type="number"
                  min="0"
                  value={formActiveProjects}
                  onChange={(e) => setFormActiveProjects(Math.max(0, parseInt(e.target.value) || 0))}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label htmlFor="edit-completed-projects" className="text-xs font-bold text-slate-600">Done Projs</Label>
                <Input
                  id="edit-completed-projects"
                  type="number"
                  min="0"
                  value={formCompletedProjects}
                  onChange={(e) => setFormCompletedProjects(Math.max(0, parseInt(e.target.value) || 0))}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-contract" className="text-xs font-bold text-slate-600">Contract Value ($)</Label>
                <Input
                  id="edit-contract"
                  type="number"
                  min="0"
                  value={formContractValue}
                  onChange={(e) => setFormContractValue(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-revenue" className="text-xs font-bold text-slate-600">Revenue Generated ($)</Label>
                <Input
                  id="edit-revenue"
                  type="number"
                  min="0"
                  value={formRevenue}
                  onChange={(e) => setFormRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="rounded-xl border-slate-200 h-10 text-sm"
                />
              </div>
            </div>

            <DialogFooter className="pt-2 border-t border-slate-100 flex flex-row gap-2 justify-end">
              <Button type="button" variant="outline" className="rounded-xl h-10 text-sm font-semibold cursor-pointer" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-10 bg-[#FF5DA2] hover:bg-[#FF5DA2]/90 text-white font-bold text-sm px-4 cursor-pointer">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Client Alert Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="rounded-2xl border-slate-200 bg-white p-6 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-rose-500" />
              Remove Client Account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-500 font-medium">
              Are you sure you want to delete <strong className="text-slate-800">{clientToDelete?.company}</strong>?
              This action will remove their billing history and ongoing projects from this roster. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-2 mt-4 justify-end">
            <AlertDialogCancel className="rounded-xl h-10 text-sm font-semibold border-slate-200 cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="rounded-xl h-10 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-4 cursor-pointer animate-none"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
