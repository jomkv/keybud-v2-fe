import { StatusPayload } from "@/@types/status";
import StatusCard from "@/components/cards/status-card";
import React from "react";

interface CommentsSectionProps {
  comments: StatusPayload[];
}

function CommentsSection({ comments }: CommentsSectionProps) {
  return (
    <>
      {comments.map((comment, index) => (
        <StatusCard status={comment} key={index} />
      ))}
    </>
  );
}

export default CommentsSection;
