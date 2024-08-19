import {
  LayoutDashboard,
  CloudUpload,
  Files,
  ChartPie,
  Settings,
  Logs,
  Info,
} from "lucide-react";

export const DashboardLinks = [
  {
    label: "Overview",
    link: "/dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    label: "Upload",
    link: "/dashboard/upload",
    icon: CloudUpload,
  },
  {
    label: "Manage",
    link: "/dashboard/manage",
    icon: Files,
  },
  {
    label: "Analytics",
    link: "/dashboard/analytics",
    icon: ChartPie,
  },
  {
    label: "Settings",
    link: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Logs",
    link: "/dashboard/logs",
    icon: Logs,
  },
  {
    label: "Support",
    link: "/dashboard/support",
    icon: Info,
  },
];
