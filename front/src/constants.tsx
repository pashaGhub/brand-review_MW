interface IROUTES {
  publicHome: string;
  login: string;
  register: string;
  overview: string;
  AMainPanel: string;
  ACreateSection: string;
}

export const ROUTES: IROUTES = {
  publicHome: "/",
  login: "/login",
  register: "/register",
  overview: "/overview-content",
  AMainPanel: "/admin/",
  ACreateSection: "/admin/section-editor",
};
