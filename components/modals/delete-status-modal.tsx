import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { statusApi } from "@/lib/api/status.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteStatusModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  statusId: number;
}

export function DeleteStatusModal({
  open,
  setOpen,
  statusId,
}: DeleteStatusModalProps) {
  const queryClient = useQueryClient();

  const deleteStatus = useMutation({
    mutationFn: statusApi.deleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["status", statusId],
      });
    },
  });

  const handleDelete = async () => {
    try {
      await deleteStatus.mutateAsync(statusId);

      setOpen(false);
      toast.success("Post deleted");
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete "{statusId}"</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleDelete}
            disabled={deleteStatus.isPending}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
