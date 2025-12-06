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

interface ConfirmModalProps {
  title?: string;
  description: string;
  handleConfirm: () => void;
  isConfirming: boolean;
}

export function ConfirmModal({
  title,
  description,
  handleConfirm,
  isConfirming,
}: ConfirmModalProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        {title && <DialogTitle>{title}</DialogTitle>}

        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" onClick={handleConfirm} disabled={isConfirming}>
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
