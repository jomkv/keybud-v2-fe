import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusPayload } from "@/@types/status";
import { useState } from "react";
import { DeleteStatusModal } from "../modals/delete-status-modal";
import EditStatusModal from "../modals/edit-status-modal";
import { useUser } from "@/hooks/use-user";

interface StatusSettingsButtonProps {
  status: StatusPayload;
}

function StatusSettingsButton({ status }: StatusSettingsButtonProps) {
  const user = useUser();

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  return (
    <>
      {user?.id === status.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem>Pin</DropdownMenuItem>

            <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <DeleteStatusModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        statusId={status.id}
      />
      <EditStatusModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        status={status}
      />
    </>
  );
}

export default StatusSettingsButton;
