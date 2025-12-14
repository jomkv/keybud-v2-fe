import { User } from "./user";

export interface S3Attachment {
  id: number;
  statusId: number;
  key: string;
  createdAt: string;
  signedUrl: string;
}

export interface AttachmentInput {
  type: "new" | "old" | "removed";
  tempId?: string; // uuid
  id?: number;
  file?: File;
  previewUrl?: string;
}

export interface Status {
  id: number;
  userId: number;
  parentId?: number;
  title?: string;
  description: string;
  createdAt: string;
  edittedAt?: string;
  attachments: S3Attachment[];
}

export interface StatusPayload extends Status {
  user: Omit<User, "googleId">;
  _count: {
    stars: number;
    reposts: number;
    comments: number;
  };
}

export type CreateStatus = Omit<
  Status,
  "id" | "userId" | "createdAt" | "edittedAt" | "attachments"
> & {
  attachments?: AttachmentInput[];
};

export type EditStatus = Omit<
  Status,
  "userId" | "createdAt" | "edittedAt" | "attachments"
> & {
  attachments?: AttachmentInput[];
};

export type EditStatus = Partial<CreateStatus>;
