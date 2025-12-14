"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import RichTextInput from "@/components/inputs/rich-text-input";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AttachmentInput,
  S3Attachment,
  Status,
  StatusPayload,
} from "@/@types/status";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import AttachmentFormField from "../form-fields/attachment-form-field";

const formSchema = z.object({
  id: z.int(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  attachments: z
    .any()
    .refine(
      (files) => !files || (Array.isArray(files) && files.length <= 10),
      "Maximum of 4 attachments."
    ),
});

type FormValues = z.infer<typeof formSchema>;

interface EditStatusFormProps {
  submitForm: (values: any) => Promise<Status>;
  closeModal: () => void;
  status: StatusPayload;
}

const initializeAttachments = (
  attachments: S3Attachment[]
): AttachmentInput[] => {
  return attachments.map(
    (att): AttachmentInput => ({
      type: "old",
      id: att.id,
      previewUrl: att.signedUrl,
    })
  );
};

export default function EditStatusForm({
  submitForm,
  closeModal,
  status,
}: EditStatusFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<AttachmentInput[]>(
    initializeAttachments(status.attachments)
  );

  useEffect(() => {
    console.log(attachments);
  }, [attachments]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: status.id,
      title: status.title || "",
      description: status.description,
      attachments: [],
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const formValues = { ...form.getValues(), attachments };
      await submitForm(formValues);

      closeModal();
      toast.success("Post edited");
      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      toast.warning("Something went wrong, please try again later");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
        id="edit-status-form"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Title"
                  className={cn("w-full", {
                    "border-destructive focus-visible:ring-0":
                      form.formState.errors.title,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextInput
                  {...field}
                  throttleDelay={0}
                  className={cn("h-full min-h-56 w-full min-w-0 rounded-xl", {
                    "border-destructive focus-within:border-destructive":
                      form.formState.errors.description,
                  })}
                  editorContentClassName="overflow-auto h-full flex grow"
                  output="html"
                  placeholder="Type your description here..."
                  editable={true}
                  editorClassName="focus:outline-hidden px-5 py-4 h-full grow"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AttachmentFormField
          control={form.control}
          name="attachments"
          value={attachments}
          setValue={setAttachments}
          inputRef={fileInputRef}
        />
      </form>
    </Form>
  );
}
