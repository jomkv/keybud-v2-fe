import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { StatusPayload } from "@/@types/status";
import CreateStatusModal from "../modals/create-status-modal";

interface CommentButtonProps {
  status: StatusPayload;
  showCount?: boolean;
  isStatusPage?: boolean;
}

function CommentButton({
  status,
  showCount = true,
  isStatusPage = false,
}: CommentButtonProps) {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="ghost"
        className="p-1"
        onClick={() => setIsCommentOpen(true)}
      >
        <Icon icon="ph:chat-bold" /> {showCount ? status._count.comments : ""}
      </Button>
      <CreateStatusModal
        open={isCommentOpen}
        setOpen={setIsCommentOpen}
        parentStatus={status}
      />
    </>
  );
}

export default CommentButton;
