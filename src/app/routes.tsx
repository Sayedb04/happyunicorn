import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminTimeline from "./pages/admin/Timeline";
import AdminVersions from "./pages/admin/Versions";
import AdminReviews from "./pages/admin/Reviews";
import AdminCutdowns from "./pages/admin/Cutdowns";
import AdminMotionGraphics from "./pages/admin/MotionGraphics";
import AdminVFX from "./pages/admin/VFX";
import AdminDI from "./pages/admin/DI";
import AdminSound from "./pages/admin/Sound";
import AdminLanguages from "./pages/admin/Languages";
import AdminApprovals from "./pages/admin/Approvals";
import AdminDeliverables from "./pages/admin/Deliverables";
import AdminActivity from "./pages/admin/Activity";
import AdminClients from "./pages/admin/Clients";
import AdminSettings from "./pages/admin/Settings";
import ClientDashboard from "./pages/client/Dashboard";
import AdminLayout from "./components/layouts/AdminLayout";
import ClientLayout from "./components/layouts/ClientLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "projects", Component: AdminProjects },
      { path: "timeline", Component: AdminTimeline },
      { path: "versions", Component: AdminVersions },
      { path: "reviews", Component: AdminReviews },
      { path: "cutdowns", Component: AdminCutdowns },
      { path: "motion-graphics", Component: AdminMotionGraphics },
      { path: "vfx", Component: AdminVFX },
      { path: "di", Component: AdminDI },
      { path: "sound", Component: AdminSound },
      { path: "languages", Component: AdminLanguages },
      { path: "approvals", Component: AdminApprovals },
      { path: "deliverables", Component: AdminDeliverables },
      { path: "activity", Component: AdminActivity },
      { path: "clients", Component: AdminClients },
      { path: "settings", Component: AdminSettings },
    ],
  },
  {
    path: "/client",
    Component: ClientLayout,
    children: [
      { index: true, Component: ClientDashboard },
    ],
  },
]);
