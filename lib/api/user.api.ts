import { apiInstance } from "./api";

export const userApi = {
  async follow(userId: number): Promise<void> {
    await apiInstance.post<void>(`/api/user/follow/${userId}`);
  },

  async unfollow(userId: number): Promise<void> {
    await apiInstance.delete<void>(`/api/user/unfollow/${userId}`);
  },
};
