import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminProjectsNew from "./pages/admin/ProjectsNew";
import AdminClients from "./pages/admin/Clients";
import AdminSettings from "./pages/admin/Settings";
import ProjectDetails from "./pages/admin/ProjectDetails";
import ClientDashboard from "./pages/client/Dashboard";
import ClientProjects from "./pages/client/Projects";
import ClientTimeline from "./pages/client/Timeline";
import ClientVersions from "./pages/client/Versions";
import ClientReviews from "./pages/client/Reviews";
import ClientApprovals from "./pages/client/Approvals";
import ClientDeliverables from "./pages/client/Deliverables";
import ClientActivity from "./pages/client/Activity";
import AdminLayout from "./components/layouts/AdminLayout";
import ClientLayout from "./components/layouts/ClientLayout";

export const router = createBrowserRouter(
  [
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
      { path: "projects/new", Component: AdminProjectsNew },
      { path: "projects/:projectId", Component: ProjectDetails },
      { path: "clients", Component: AdminClients },
      { path: "settings", Component: AdminSettings },
    ],
  },
  {
    path: "/client",
    Component: ClientLayout,
    children: [
      { index: true, Component: ClientDashboard },
      { path: "projects", Component: ClientProjects },
      { path: "timeline", Component: ClientTimeline },
      { path: "versions", Component: ClientVersions },
      { path: "reviews", Component: ClientReviews },
      { path: "approvals", Component: ClientApprovals },
      { path: "deliverables", Component: ClientDeliverables },
      { path: "activity", Component: ClientActivity },
    ],
  },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
