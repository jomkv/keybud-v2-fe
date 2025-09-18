import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreatePostForm from "@/components/forms/create-post-form";

export default function CreatePostModal() {
  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle>Create Post</DialogTitle>
      </DialogHeader>
      <CreatePostForm />
      <DialogFooter>
        <Button type="submit" form="create-post-form">
          Submit
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
