import { runtimeGet } from "@/lib/runtime/runtime-directus";

import {
  RuntimeDashboard,
  RuntimeDashboardTab,
  RuntimeDashboardWidget,
} from "./types";

export async function fetchDashboard(
  dashboardKey: string
): Promise<RuntimeDashboard | null> {
  const response = (await runtimeGet("runtime_dashboards", {
    filter: {
      dashboard_key: {
        _eq: dashboardKey,
      },
    },
    limit: 1,
  })) as RuntimeDashboard[];

  return response?.[0] || null;
}

export async function fetchDashboardTabs(
  dashboardKey: string
): Promise<RuntimeDashboardTab[]> {
  return (await runtimeGet("runtime_dashboard_tabs", {
    filter: {
      dashboard_key: {
        _eq: dashboardKey,
      },
      status: {
        _eq: "active",
      },
    },
    sort: ["sort_order"],
  })) as RuntimeDashboardTab[];
}

export async function fetchDashboardWidgets(
  dashboardKey: string
): Promise<RuntimeDashboardWidget[]> {
  return (await runtimeGet("runtime_dashboard_widgets", {
    filter: {
      dashboard_key: {
        _eq: dashboardKey,
      },
      status: {
        _eq: "active",
      },
    },
  })) as RuntimeDashboardWidget[];
}
