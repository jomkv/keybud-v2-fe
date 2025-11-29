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
import { useMutation } from "@tanstack/react-query";
import { statusApi } from "@/lib/api/status.api";
import { Status } from "@/@types/status";

interface CreateStatusModalProps {
  closeModal: () => void;
}

export default function CreateStatusModal({
  closeModal,
}: CreateStatusModalProps) {
  const createStatus = useMutation({
    mutationFn: statusApi.createStatus,
  });

  const submitForm = async (values: any): Promise<Status> => {
    return await createStatus.mutateAsync(values);
  };

  return (
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle>Create Post</DialogTitle>
      </DialogHeader>
      <CreateStatusForm submitForm={submitForm} closeModal={closeModal} />
      <DialogFooter>
        <Button
          type="submit"
          form="create-status-form"
          disabled={createStatus.isPending}
        >
          Submit
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
