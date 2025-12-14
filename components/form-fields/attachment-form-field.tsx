"use client";

import React, { useState, type RefObject } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AttachmentInput } from "@/@types/status";
import { type Control } from "react-hook-form";
import { toast } from "sonner";
import { convertFileToAttachmentInput } from "@/lib/helpers/attachment-helper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface AttachmentFormFieldProps {
  control: Control<any>;
  name: string;
  value: AttachmentInput[];
  setValue: React.Dispatch<React.SetStateAction<AttachmentInput[]>>;
  inputRef: RefObject<HTMLInputElement | null>;
}

function AttachmentFormField({
  control,
  name,
  value,
  setValue,
  inputRef,
}: AttachmentFormFieldProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const visibleValueLength = value.filter(
    (val) => val.type !== "removed"
  ).length;

  const selectFiles = () => {
    inputRef.current?.click();
  };

  const updateAttachments = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    if (visibleValueLength + files.length > 4) {
      toast.warning("You can only upload a maximum of 4 images.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      if (file.type.split("/")[0] !== "image") {
        toast.warning("A non-image file was selected.");
        continue;
      }

      if (file.size > 10485760) {
        toast.warning("Attachment size too large, maximum is 10MB.");
        continue;
      }

      setValue((prev) => [...prev, convertFileToAttachmentInput(file)]);
    }
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    updateAttachments(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    updateAttachments(files);
  };

  const handleUploadDelete = (attachmentInp: AttachmentInput) => {
    if (attachmentInp.type === "removed") {
      return;
    }

    if (attachmentInp.type === "old" && attachmentInp.id !== undefined) {
      setValue((prev) =>
        prev.map((att) =>
          att.id === attachmentInp.id ? { ...att, type: "removed" } : att
        )
      );
    }

    if (attachmentInp.type === "new" && attachmentInp.tempId !== undefined) {
      if (attachmentInp.previewUrl) {
        URL.revokeObjectURL(attachmentInp.previewUrl);
      }

      setValue((prev) =>
        prev.filter((att) => att.tempId !== attachmentInp.tempId)
      );
    }
  };

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Attachments</FormLabel>
            <FormControl>
              <div
                className={`w-full pt-5 pb-5 rounded-md flex flex-col items-center justify-center border border-input bg-transparent ${
                  visibleValueLength >= 4 ? "hidden" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isDragging ? (
                  <p className="m-4">Drop images here</p>
                ) : (
                  <>
                    <p className="m-4">
                      Drop images here or{" "}
                      <span
                        role="button"
                        className="text-[#8c53fe] font-bold"
                        onClick={selectFiles}
                      >
                        browse
                      </span>
                    </p>
                    <Input
                      type="file"
                      className="hidden"
                      multiple
                      ref={inputRef}
                      onChange={onFileSelect}
                    />
                  </>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-2">
        {value.map((attachmentInp, index) => {
          if (attachmentInp.type !== "removed") {
            return (
              <div key={index} className="h-[5rem] w-[5rem] relative">
                <img
                  src={attachmentInp.previewUrl}
                  alt={`Attachment #${index}`}
                  className="w-full h-full rounded-md object-contain bg-neutral-700"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() => handleUploadDelete(attachmentInp)}
                  className="absolute rounded-full top-0 right-0 mt-[0.2rem] mr-[0.2rem] h-6 w-6"
                >
                  <X />
                </Button>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default AttachmentFormField;
