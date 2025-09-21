export type Page =
  | "home"
  | "messages"
  | "notifications"
  | "search"
  | "profile"
  | "settings"
  | "post";

export interface NavigationState {
  currentPage: Page;
}
