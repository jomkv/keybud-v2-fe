export type Page =
  | "home"
  | "messages"
  | "notifications"
  | "search"
  | "profile"
  | "settings"
  | "status";

export interface NavigationState {
  currentPage: Page;
}
