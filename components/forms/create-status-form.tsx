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
import { AttachmentInput, CreateStatus, Status } from "@/@types/status";
import { toast } from "sonner";
import { useRef, useState } from "react";
import AttachmentFormField from "@/components/form-fields/attachment-form-field";

interface CreateStatusFormProps {
  submitForm: (values: CreateStatus) => Promise<Status>;
  closeModal: () => void;
  parentId?: number;
}

export default function CreateStatusForm({
  submitForm,
  closeModal,
  parentId,
}: CreateStatusFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<AttachmentInput[]>([]);

  const formSchema = z.object({
    title: parentId
      ? z.string().optional()
      : z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    attachments: z
      .any()
      .refine(
        (files) => !files || (Array.isArray(files) && files.length <= 10),
        "Maximum of 4 attachments."
      ),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      attachments: [],
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const formValues = {
        ...form.getValues(),
        attachments,
        parentId: parentId,
      };

      await submitForm(formValues);

      closeModal();
      toast.success(`${parentId ? "Comment" : "Post"} created`);
      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
        id="create-status-form"
      >
        {!parentId && (
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
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{parentId ? "Reply" : "Description"}</FormLabel>
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
