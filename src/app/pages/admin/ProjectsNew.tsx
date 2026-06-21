import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

type NewProjectFormData = {
  client: string;
  agency: string;
  director: string;
  producer: string;
  editor: string;
  dop: string;
  startdate: string;
  enddate: string;
  versions: string;
  cutdowns: string;
};

const getQuery = (search: string) => {
  const params = new URLSearchParams(search);
  const out: Record<string, string> = {};
  params.forEach((v, k) => {
    out[k] = v;
  });
  return out;
};

export default function AdminProjectsNew() {
  const navigate = useNavigate();
  const location = useLocation();

  const initial = useMemo(() => {
    const q = getQuery(location.search);
    return {
      client: q.client ?? "",
      agency: q.agency ?? "",
      director: q.director ?? "",
      producer: q.producer ?? "",
      editor: q.editor ?? "",
      dop: q.dop ?? "",
      startdate: q.startdate ?? "",
      enddate: q.enddate ?? "",
      versions: q.versions ?? "",
      cutdowns: q.cutdowns ?? "",
    } satisfies NewProjectFormData;
  }, [location.search]);

  const [form, setForm] = useState({
    ...initial,
    projectName: qSafe(location.search, "name"),
    notes: qSafe(location.search, "notes"),
  });

  function qSafe(search: string, key: string) {
    const params = new URLSearchParams(search);
    return params.get(key) ?? "";
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    setIsSubmitting(true);
    // Placeholder: actual create/upload logic would go here.
    await new Promise((r) => setTimeout(r, 400));
    setIsSubmitting(false);
    navigate("/admin/projects");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create / Upload New Project</h1>
        <p className="text-gray-600 mt-1">Pre-filled from the popup on Active Projects.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Project Name</Label>
            <Input
              value={form.projectName}
              onChange={(e) => setForm((s) => ({ ...s, projectName: e.target.value }))}
              placeholder="e.g. Nike Summer Campaign"
              className="rounded-2xl bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                ["Client", "client", form.client],
                ["Agency", "agency", form.agency],
                ["Director", "director", form.director],
                ["Producer", "producer", form.producer],
                ["Editor", "editor", form.editor],
                ["DOP", "dop", form.dop],
                ["Start Date", "startdate", form.startdate],
                ["End Date", "enddate", form.enddate],
              ] as const
            ).map(([label, key, value]) => {
              const k = key as keyof typeof form;
              const type = key.includes("date") ? "date" : "text";
              return (
                <div key={key} className="space-y-2">
                  <Label className="text-sm text-gray-700">{label}</Label>
                  <Input
                    type={type}
                    value={String(value)}
                    onChange={(e) => setForm((s) => ({ ...s, [k]: e.target.value } as any))}
                    className="rounded-2xl bg-white"
                  />
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Versions", "Cutdowns"].map((label) => {
              const key = label === "Versions" ? "versions" : "cutdowns";
              const k = key as keyof typeof form;
              return (
                <div key={key} className="space-y-2">
                  <Label className="text-sm text-gray-700">{label}</Label>
                  <Input
                    value={String(form[k])}
                    onChange={(e) => setForm((s) => ({ ...s, [k]: e.target.value } as any))}
                    placeholder={label === "Versions" ? "e.g. 1,2,3" : "e.g. 15s,30s"}
                    className="rounded-2xl bg-white"
                  />
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
              placeholder="Optional"
              className="rounded-2xl bg-white min-h-[110px]"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Upload</h2>
          <p className="text-sm text-gray-600">
            Placeholder uploader area. Hook this to your backend/storage as needed.
          </p>

          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Project Files</Label>
            <Input
              type="file"
              className="rounded-2xl bg-white"
              onChange={() => {
                // no-op placeholder
              }}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => navigate("/admin/projects")}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              onClick={handleCreate}
              disabled={isSubmitting}
              className="rounded-2xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white font-semibold hover:opacity-95"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

