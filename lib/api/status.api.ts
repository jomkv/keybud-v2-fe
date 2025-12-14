import {
  CreateStatus,
  EditStatus,
  Status,
  StatusPayload,
} from "@/@types/status";
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
      status.attachments.forEach((attachmentInp, index) => {
        if (attachmentInp.type === "new" && attachmentInp.file !== undefined) {
          statusFormData.append("attachments", attachmentInp.file);
        }
      });
    }

    const res = await apiInstance.post<Status>("/api/status", statusFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async editStatus(status: EditStatus): Promise<Status> {
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
      status.attachments.forEach((att, index) => {
        if (att.type === "new" && att.file) {
          statusFormData.append("attachments", att.file);
        }
      });
    }

    const removedAttachmentIds =
      status.attachments
        ?.filter((att) => att.type === "removed" && att.id)
        .map((att) => att.id as number) || [];

    statusFormData.append(
      "removedAttachmentIds",
      removedAttachmentIds.toString()
    );

    const res = await apiInstance.patch<Status>(
      `/api/status/${status.id}`,
      statusFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  },

  async deleteStatus(statusId: number): Promise<void> {
    await apiInstance.delete<void>(`/api/status/${statusId}`);
  },
};
