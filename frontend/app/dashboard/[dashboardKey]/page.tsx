import {
  fetchDashboard,
  fetchDashboardTabs,
  fetchDashboardWidgets,
} from "@/lib/runtime/directus";

export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    dashboardKey: string;
  };
};

export default async function DashboardPage({ params }: PageProps) {
  const dashboardKey = params.dashboardKey;

  const dashboard = await fetchDashboard(dashboardKey);

  if (!dashboard) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-bold">Dashboard Not Found</h1>

        <p className="mt-4 text-slate-400">
          No runtime dashboard exists for:
        </p>

        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
          {dashboardKey}
        </div>
      </main>
    );
  }

  const tabs = await fetchDashboardTabs(dashboardKey);

  const widgets = await fetchDashboardWidgets(dashboardKey);

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wide text-slate-500">
            LGR Runtime Operating System
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {dashboard.dashboard_name}
          </h1>

          <p className="mt-2 text-slate-400">
            {dashboard.dashboard_type} · {dashboard.dashboard_scope}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <div
              key={tab.tab_key}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
            >
              {tab.tab_label}
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {widgets.map((widget) => (
            <div
              key={widget.widget_key}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
            >
              <div className="mb-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {widget.widget_type_key}
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  {widget.widget_title}
                </h2>
              </div>

              <div className="space-y-2 rounded-xl bg-slate-950 p-4 text-sm text-slate-400">
                <p>
                  <span className="text-slate-500">Widget Key:</span>{" "}
                  {widget.widget_key}
                </p>

                <p>
                  <span className="text-slate-500">Metric:</span>{" "}
                  {widget.metric_key || "None"}
                </p>

                <p>
                  <span className="text-slate-500">Source:</span>{" "}
                  {widget.source_collection || "None"}
                </p>

                <p>
                  <span className="text-slate-500">Refresh:</span>{" "}
                  {widget.refresh_seconds || 0}s
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
