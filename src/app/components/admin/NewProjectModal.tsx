import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export type NewProjectFormData = {
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

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-gray-700">{label}</Label>
      <Input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-2xl bg-white"
      />
    </div>
  );
};

export default function NewProjectModal({
  open,
  onOpenChange,
  onOk,
  initialValues,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onOk: (data: NewProjectFormData) => void;
  initialValues?: Partial<NewProjectFormData>;
}) {
  const [form, setForm] = useState<NewProjectFormData>({
    client: "",
    agency: "",
    director: "",
    producer: "",
    editor: "",
    dop: "",
    startdate: "",
    enddate: "",
    versions: "",
    cutdowns: "",
    ...initialValues,
  });

  const mergedInitialValues = useMemo(
    () => ({
      client: "",
      agency: "",
      director: "",
      producer: "",
      editor: "",
      dop: "",
      startdate: "",
      enddate: "",
      versions: "",
      cutdowns: "",
      ...initialValues,
    }),
    [initialValues]
  );

  // When dialog opens, reset to initial values so re-opening is predictable.
  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (next) setForm(mergedInitialValues);
  };

  const handleOk = () => {
    onOk(form);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl rounded-3xl p-0 overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2]">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">New Project</DialogTitle>
          </DialogHeader>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Client" value={form.client} onChange={(v) => setForm((s) => ({ ...s, client: v }))} placeholder="e.g. Nike" />
            <Field label="Agency" value={form.agency} onChange={(v) => setForm((s) => ({ ...s, agency: v }))} placeholder="e.g. Wieden+Kennedy" />
            <Field label="Director" value={form.director} onChange={(v) => setForm((s) => ({ ...s, director: v }))} placeholder="Director name" />
            <Field label="Producer" value={form.producer} onChange={(v) => setForm((s) => ({ ...s, producer: v }))} placeholder="Producer name" />
            <Field label="Editor" value={form.editor} onChange={(v) => setForm((s) => ({ ...s, editor: v }))} placeholder="Editor name" />
            <Field label="DOP" value={form.dop} onChange={(v) => setForm((s) => ({ ...s, dop: v }))} placeholder="Director of Photography" />

            <Field label="Start Date" value={form.startdate} onChange={(v) => setForm((s) => ({ ...s, startdate: v }))} type="date" />
            <Field label="End Date" value={form.enddate} onChange={(v) => setForm((s) => ({ ...s, enddate: v }))} type="date" />

            <Field label="Versions" value={form.versions} onChange={(v) => setForm((s) => ({ ...s, versions: v }))} placeholder="e.g. 1,2,3" />
            <Field label="Cutdowns" value={form.cutdowns} onChange={(v) => setForm((s) => ({ ...s, cutdowns: v }))} placeholder="e.g. 15s,30s" />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleOk}
              className="rounded-2xl bg-gradient-to-r from-[#FFD93D] to-[#FF5DA2] text-white font-semibold hover:opacity-95"
            >
              OK
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

