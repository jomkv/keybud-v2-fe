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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusApi } from "@/lib/api/status.api";
import { Status, StatusPayload } from "@/@types/status";
import { Dialog } from "@radix-ui/react-dialog";
import EditStatusForm from "../forms/edit-status-form";

interface EditStatusModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  status: StatusPayload;
}

export default function EditStatusModal({
  open,
  setOpen,
  status,
}: EditStatusModalProps) {
  const queryClient = useQueryClient();

  const editStatus = useMutation({
    mutationFn: statusApi.editStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });
    },
  });

  const submitForm = async (values: any): Promise<Status> => {
    return await editStatus.mutateAsync(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <EditStatusForm
          status={status}
          submitForm={submitForm}
          closeModal={() => setOpen(false)}
        />
        <DialogFooter>
          <Button
            type="submit"
            form="edit-status-form"
            disabled={editStatus.isPending}
          >
            Save
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
