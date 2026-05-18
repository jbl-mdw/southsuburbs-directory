export interface RuntimeDashboard {
  dashboard_key: string;
  dashboard_name: string;
  dashboard_type?: string;
  dashboard_scope?: string;
  status?: string;
}

export interface RuntimeDashboardTab {
  dashboard_key: string;
  tab_key: string;
  tab_label: string;
  sort_order?: number;
  status?: string;
}

export interface RuntimeDashboardWidget {
  dashboard_key: string;
  tab_key: string;
  widget_key: string;
  widget_title: string;
  widget_type_key: string;
  metric_key?: string;
  source_collection?: string;
  refresh_seconds?: number;
  status?: string;
}
