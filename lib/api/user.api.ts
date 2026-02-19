import { UserProfileTab } from "@/@types/user";
import { apiInstance } from "./api";
import { StatusPayload } from "@/@types/status";

export const userApi = {
  async follow(userId: number): Promise<void> {
    await apiInstance.post<void>(`/api/user/follow/${userId}`);
  },

  async unfollow(userId: number): Promise<void> {
    await apiInstance.delete<void>(`/api/user/unfollow/${userId}`);
  },

  async getProfile(
    profileUsername: string,
    tab: UserProfileTab,
  ): Promise<StatusPayload[]> {
    return (
      await apiInstance.get<{ data: StatusPayload[] }>(
        `/api/user/profile/${profileUsername}?tab=${tab}`,
      )
    ).data.data;
  },
};
