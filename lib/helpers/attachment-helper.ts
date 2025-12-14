import { AttachmentInput } from "@/@types/status";

export const convertFileToAttachmentInput = (file: File): AttachmentInput => {
  return {
    tempId: crypto.randomUUID(),
    type: "new",
    file: file,
    previewUrl: URL.createObjectURL(file),
  };
};
