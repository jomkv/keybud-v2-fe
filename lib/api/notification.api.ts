import { apiInstance } from "./api";
import { NewNotificationPayload } from "@jomkv/keybud-v2-contracts";

export const notificationnApi = {
  async getAllNotifications(): Promise<NewNotificationPayload[]> {
    const res = await apiInstance.get<{ data: NewNotificationPayload[] }>(
      "/api/notification",
    );

    return res.data.data;
  },
};
