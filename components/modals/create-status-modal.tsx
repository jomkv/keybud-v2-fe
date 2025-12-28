import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateStatusForm from "@/components/forms/create-status-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusApi } from "@/lib/api/status.api";
import { CreateStatus, Status, StatusPayload } from "@/@types/status";
import StatusCard from "../cards/status-card";

interface CreateStatusModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  parentStatus?: StatusPayload;
}

export default function CreateStatusModal({
  open,
  setOpen,
  parentStatus,
}: CreateStatusModalProps) {
  const queryClient = useQueryClient();

  const createStatus = useMutation({
    mutationFn: statusApi.createStatus,
    onSuccess: () => {
      // Invalidate and refetch status queries
      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });

      if (parentStatus) {
        queryClient.invalidateQueries({
          queryKey: ["status", parentStatus.id],
        });
      }
    },
  });

  const submitForm = async (values: CreateStatus): Promise<Status> => {
    return await createStatus.mutateAsync(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            {parentStatus ? "Reply to Post" : "Create Post"}{" "}
          </DialogTitle>
        </DialogHeader>
        {parentStatus && <StatusCard isPreview={true} status={parentStatus} />}
        <CreateStatusForm
          submitForm={submitForm}
          closeModal={() => setOpen(false)}
          parentId={parentStatus?.id}
        />
        <DialogFooter>
          <Button
            type="submit"
            form="create-status-form"
            disabled={createStatus.isPending}
          >
            Submit
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
