import { User } from "@/@types/user";
import { apiInstance } from "./api";
import { Status } from "@/@types/status";

export const searchApi = {
  async searchSuggestedUser(): Promise<User[]> {
    const res = await apiInstance.get<{ data: User[] }>(
      `/api/search/suggested/user`,
    );

    return res.data.data;
  },

  async searchUser(searchQuery: string): Promise<User[]> {
    const res = await apiInstance.get<{ data: User[] }>(
      `/api/search/user?searchQuery=${searchQuery}`,
    );

    return res.data.data;
  },

  async searchStatuses(searchQuery: string): Promise<Status[]> {
    const res = await apiInstance.get<{ data: Status[] }>(
      `/api/search/status?searchQuery=${searchQuery}`,
    );

    return res.data.data;
  },
};
