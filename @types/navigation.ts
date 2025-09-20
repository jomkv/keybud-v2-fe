export type Page =
  | "home"
  | "messages"
  | "notifications"
  | "search"
  | "profile"
  | "settings";

export interface NavigationState {
  currentPage: Page;
}
