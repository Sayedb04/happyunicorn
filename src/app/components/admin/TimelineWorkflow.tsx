// @ts-nocheck
import React from "react";

// NOTE: Some parts of this repo use // @ts-nocheck and JSX in .tsx builds.
// This component is intentionally lightweight and purely presentational.


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

export default function TimelineWorkflow({
  project,
  stages,
  getStageIcon,
  getStageColor,
  pct,
}: {
  project: Project;
  stages: Stage[];
  getStageIcon: (status: Stage["status"]) => React.ReactNode;
  getStageColor: (status: Stage["status"]) => string;
  pct: (n: number) => string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Production Workflow</h2>
          <p className="text-sm text-gray-600">
            Stage progress, dependencies, ownership, and completion tracking for {project.name}
          </p>
        </div>
        <div className="hidden lg:block">
          <div className="px-4 py-2 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <p className="text-xs text-gray-500">Current Stage</p>
            <p className="text-sm font-semibold text-gray-900">{project.currentStage}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline</h3>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

              <div className="space-y-6">
                {stages.map((s, idx) => {
                  const color = getStageColor(s.status);
                  const icon = getStageIcon(s.status);
                  return (
                    <div key={s.key} className="relative pl-12">
                      <div className="absolute left-0 top-0">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center ${color}`}
                        >
                          {icon}
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <p className="text-sm text-gray-600">{s.name}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">{s.assignedTo}</span>
                            <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-50 border border-gray-100">
                              {s.status.replace("-", " ")}
                            </span>
                          </div>
                        </div>

                        <div className="min-w-[220px]">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Completion</span>
                            <span className="text-sm font-bold text-gray-900">{s.completion}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                            <div
                              className="h-full bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] rounded-full"
                              style={{ width: pct(s.completion) }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Est. {s.estimatedCompletion}% • Due {s.dueDate}
                          </p>
                        </div>
                      </div>

                      {s.dependencyKeys.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500">Depends on</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {s.dependencyKeys.map((dk) => (
                              <span
                                key={dk}
                                className="px-2.5 py-1 rounded-2xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-700"
                              >
                                {stages.find((x) => x.key === dk)?.name ?? dk}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {idx !== stages.length - 1 && <div className="h-2" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFD93D]/10 via-[#FF5DA2]/10 to-[#00D4FF]/10 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">At a glance</h3>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-gray-600">Overall completion</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{project.overallCompletion}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Recent activity</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{project.recentActivitySummary}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">Ownership</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from(new Set(stages.map((s) => s.assignedTo))).map((name) => (
                <span
                  key={name}
                  className="px-3 py-1.5 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-700"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

