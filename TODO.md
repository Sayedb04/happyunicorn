# TODO

- [ ] Audit `src/app/pages/admin/ProjectDetails.tsx` for missing required module functionality/components causing tabs not to render fully.
- [ ] Implement any missing components/imports (e.g., ensure no undefined references like `ProgressPill`).
- [ ] For each required tab/module (Overview, Timeline, Versions, Client Reviews, Cutdowns, Motion Graphics, VFX, DI, Sound, Languages, Approvals, Deliverables, Activity Feed):
  - [ ] Ensure tables/cards exist (no empty tabs).
  - [ ] Ensure progress indicators + status badges + tracking exist.
  - [ ] Ensure realistic production sample data exists (no placeholder/coming soon text).
  - [ ] Implement required buttons/controls with working state (approve/reject/revision request, export/preview/compare, filters where required).
- [ ] Run a build/typecheck to confirm Project Details renders without runtime/TS errors.
- [ ] Manually verify clicking a project card navigates to Project Details and all modules/tabs render correctly.

