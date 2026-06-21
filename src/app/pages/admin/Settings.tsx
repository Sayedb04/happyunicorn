import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Bell,
  Save,
  RotateCcw,
  Edit,
  Key,
  Check,
  Info,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  Users
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Toaster } from "../../components/ui/sonner";
import { toast } from "sonner";

const AVATAR_GRADIENTS = [
  "from-[#FFD93D] to-[#FF5DA2]",
  "from-[#00D4FF] to-[#8B5CF6]",
  "from-[#22C55E] to-[#00D4FF]",
  "from-[#8B5CF6] to-[#FF5DA2]",
  "from-slate-700 to-slate-900"
];

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);

  // State: Profile
  const [profName] = useState("Sarah Mitchell");
  const [profEmail] = useState("sarah.mitchell@happyunicorn.io");
  const [profRole] = useState("Administrator");
  const [profAvatarGrad, setProfAvatarGrad] = useState(AVATAR_GRADIENTS[0]);

  // Dialog controllers
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  // Password fields
  const [passCurrent, setPassCurrent] = useState("");
  const [passNew, setPassNew] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  // State: Notifications
  const [projUpdates, setProjUpdates] = useState(true);
  const [clientFeedback, setClientFeedback] = useState(true);
  const [approvalNotif, setApprovalNotif] = useState(true);
  const [deliveryNotif, setDeliveryNotif] = useState(true);

  // State: Account Summary
  const [accountSummary] = useState({
    totalProjects: 28,
    activeProjects: 5,
    totalClients: 12,
    memberSince: "June 2024"
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);


  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passCurrent || !passNew) {
      toast.error("Please fill in current and new password.");
      return;
    }
    if (passNew !== passConfirm) {
      toast.error("New passwords do not match.");
      return;
    }
    toast.success("Password changed successfully.");
    setChangePasswordOpen(false);
    setPassCurrent("");
    setPassNew("");
    setPassConfirm("");
  };

  const handleSaveChangesAll = () => {
    toast.success("Settings saved successfully.");
  };

  const handleResetSettings = () => {
    setProjUpdates(true);
    setClientFeedback(true);
    setApprovalNotif(true);
    setDeliveryNotif(true);
    toast.success("Preferences reset to defaults.");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-100 animate-pulse rounded-2xl" />
          <div className="h-64 bg-slate-100 animate-pulse rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto space-y-6 py-4">
      {/* Background blurs */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] bg-gradient-to-br from-[#00D4FF]/5 to-[#8B5CF6]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] bg-gradient-to-tr from-[#FFD93D]/5 to-[#FF5DA2]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <Toaster position="top-right" richColors />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Manage your personal profile identity, notification triggers, and check your workspace account activity summary.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Profile & Account Summary */}
        <div className="md:col-span-6 space-y-6">
          
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6"
          >
            <div className="flex items-center gap-2 border-b border-slate-100/60 pb-3">
              <User className="h-5 w-5 text-[#FF5DA2]" />
              <h2 className="text-base font-bold text-slate-800">Profile</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${profAvatarGrad} text-xl font-black text-white shadow-sm border-2 border-white`}>
                  {profName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
                <button
                  onClick={() => {
                    const currentIdx = AVATAR_GRADIENTS.indexOf(profAvatarGrad);
                    const nextIdx = (currentIdx + 1) % AVATAR_GRADIENTS.length;
                    setProfAvatarGrad(AVATAR_GRADIENTS[nextIdx]);
                    toast.success("Avatar gradient cycled!");
                  }}
                  className="absolute -bottom-1 -right-1 rounded-lg bg-slate-900 border border-slate-700 p-1.5 text-white shadow-xs hover:bg-slate-850 transition-all cursor-pointer"
                  title="Cycle color gradient"
                >
                  <Sparkles className="h-3 w-3" />
                </button>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-800 truncate">{profName}</h3>
                  <Badge className="bg-pink-50 border border-pink-100 text-[#FF5DA2] text-[9px] font-bold px-2 py-0.5 shrink-0">
                    {profRole}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 truncate">{profEmail}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button onClick={() => setChangePasswordOpen(true)} size="sm" className="rounded-xl h-9 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 border-0 shadow-sm transition-all cursor-pointer">
                Change Password
              </Button>
            </div>
          </motion.div>

          {/* Account Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4"
          >
            <div className="flex items-center gap-2 border-b border-slate-100/60 pb-3">
              <BarChart3 className="h-5 w-5 text-[#FF5DA2]" />
              <h2 className="text-base font-bold text-slate-800">Account Summary</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/50 border border-slate-100 p-3 flex items-center gap-2.5">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-500 shrink-0">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Total Projects</span>
                  <strong className="block text-slate-800 text-sm mt-0.5">{accountSummary.totalProjects}</strong>
                </div>
              </div>

              <div className="rounded-xl bg-white/50 border border-slate-100 p-3 flex items-center gap-2.5">
                <div className="rounded-lg bg-green-50 p-2 text-emerald-500 shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Active Projects</span>
                  <strong className="block text-slate-800 text-sm mt-0.5">{accountSummary.activeProjects}</strong>
                </div>
              </div>

              <div className="rounded-xl bg-white/50 border border-slate-100 p-3 flex items-center gap-2.5">
                <div className="rounded-lg bg-purple-50 p-2 text-purple-500 shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Total Clients</span>
                  <strong className="block text-slate-800 text-sm mt-0.5">{accountSummary.totalClients}</strong>
                </div>
              </div>

              <div className="rounded-xl bg-white/50 border border-slate-100 p-3 flex items-center gap-2.5">
                <div className="rounded-lg bg-orange-50 p-2 text-amber-500 shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Member Since</span>
                  <strong className="block text-slate-800 text-[11px] font-bold mt-0.5">{accountSummary.memberSince}</strong>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Notifications & Actions */}
        <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
          
          {/* Notifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4 flex-1"
          >
            <div className="flex items-center gap-2 border-b border-slate-100/60 pb-3">
              <Bell className="h-5 w-5 text-[#FF5DA2]" />
              <h2 className="text-base font-bold text-slate-800">Notifications</h2>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { state: projUpdates, set: setProjUpdates, label: "Project Updates", desc: "Get alerts when asset versions or reviews are uploaded." },
                { state: clientFeedback, set: setClientFeedback, label: "Client Feedback Alerts", desc: "Receive alerts when a client comments on revisions." },
                { state: approvalNotif, set: setApprovalNotif, label: "Approval Notifications", desc: "Get flagged immediately when client approves deliverable items." },
                { state: deliveryNotif, set: setDeliveryNotif, label: "Delivery Notifications", desc: "Receive logs when deliverables are exported and sent." }
              ].map((toggle, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-white/60 p-3 border border-slate-100/50 hover:border-[#FF5DA2]/20 transition-all">
                  <div className="space-y-0.5 pr-2">
                    <Label className="text-xs font-bold text-slate-800">{toggle.label}</Label>
                    <span className="block text-[9px] text-slate-450 leading-relaxed">{toggle.desc}</span>
                  </div>
                  <Switch checked={toggle.state} onCheckedChange={(v) => {
                    toggle.set(v);
                    toast.info(`${toggle.label} toggled ${v ? "ON" : "OFF"}`);
                  }} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-end gap-2 shrink-0 pt-2"
          >
            <Button onClick={handleResetSettings} variant="outline" className="rounded-xl h-10 border-slate-200 font-bold text-xs px-4 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Changes
            </Button>
            <Button onClick={handleSaveChangesAll} className="rounded-xl h-10 bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] hover:brightness-105 text-white font-bold text-xs px-5 border-0 shadow-sm transition-all cursor-pointer">
              <Save className="h-3.5 w-3.5 mr-1" /> Save Changes
            </Button>
          </motion.div>

        </div>

      </div>


      {/* Dialog: Change Password */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="rounded-2xl border-slate-200 bg-white p-6 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900">Change Password</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">Configure a secure passphrase to safeguard your session.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="pass-curr" className="text-xs font-bold text-slate-600">Current Password</Label>
              <Input id="pass-curr" type="password" value={passCurrent} onChange={(e) => setPassCurrent(e.target.value)} className="rounded-xl border-slate-200 text-sm bg-white" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pass-new" className="text-xs font-bold text-slate-600">New Password</Label>
              <Input id="pass-new" type="password" value={passNew} onChange={(e) => setPassNew(e.target.value)} className="rounded-xl border-slate-200 text-sm bg-white" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pass-conf" className="text-xs font-bold text-slate-600">Confirm New Password</Label>
              <Input id="pass-conf" type="password" value={passConfirm} onChange={(e) => setPassConfirm(e.target.value)} className="rounded-xl border-slate-200 text-sm bg-white" required />
            </div>
            <DialogFooter className="pt-2 border-t border-slate-100 flex gap-2 justify-end">
              <Button type="button" variant="outline" className="rounded-xl h-10 font-bold text-xs border-slate-200 bg-white hover:bg-slate-50" onClick={() => setChangePasswordOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-10 bg-[#FF5DA2] hover:bg-[#FF5DA2]/90 text-white font-bold text-xs px-4 border-0 shadow-xs">
                Update Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
