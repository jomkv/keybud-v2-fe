"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;

function CommentForm() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("==Getting values from form==");
    console.log(values);
    console.log("Success: Values retrieved from form");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
        id="comment-form"
      >
        {isActive && (
          <p>
            Replying to <span>@woozy</span>
          </p>
        )}
        {!isActive ? (
          <Input
            type="text"
            placeholder="Type your comment here..."
            className="border-none"
            onFocus={() => setIsActive(true)}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextInput
                      {...field}
                      throttleDelay={0}
                      className={cn(
                        "h-full min-h-56 w-full min-w-0 rounded-xl",
                        {
                          "border-destructive focus-within:border-destructive":
                            form.formState.errors.comment,
                        }
                      )}
                      editorContentClassName="overflow-auto h-full flex grow"
                      output="html"
                      placeholder="Type your comment here..."
                      editable={true}
                      editorClassName="focus:outline-hidden px-5 py-4 h-full grow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="font-bold">Comment</Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}

export default CommentForm;
