import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateStatusForm from "@/app/(main)/components/forms/create-status-form";

export default function CreateStatusModal() {
  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle>Create Post</DialogTitle>
      </DialogHeader>
      <CreateStatusForm />
      <DialogFooter>
        <Button type="submit" form="create-status-form">
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
