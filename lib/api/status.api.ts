import { CreateStatus, Status, StatusPayload } from "@/@types/status";
import { apiInstance } from "./api";

export const statusApi = {
  async getAllStatus(): Promise<StatusPayload[]> {
    const res = await apiInstance.get<{ data: StatusPayload[] }>("/api/status");

    return res.data.data;
  },

  async createStatus(status: CreateStatus): Promise<Status> {
    const statusFormData = new FormData();

    if (status.title) {
      statusFormData.append("title", status.title);
    }

    if (status.description) {
      statusFormData.append("description", status.description);
    }

    if (status.parentId) {
      statusFormData.append("parentId", status.parentId.toString());
    }

    if (status.attachments && status.attachments.length > 0) {
      status.attachments.forEach((file, index) => {
        statusFormData.append("attachments", file);
      });
    }

    const res = await apiInstance.post<Status>("/api/status", statusFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};
