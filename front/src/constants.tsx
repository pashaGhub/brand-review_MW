interface IROUTES {
  publicHome: string;
  login: string;
  register: string;
  AMainPanel: string;
  ACreateSection: string;
}

export const ROUTES: IROUTES = {
  publicHome: "/",
  login: "/login",
  register: "/register",
  AMainPanel: "/admin/sections-panel",
  ACreateSection: "/admin/section-editor",
};
