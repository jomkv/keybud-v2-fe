import { StatusAttachments } from "@/components/cards/status-card";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Link from "next/link";
import React from "react";
import { StatusPayload } from "@/@types/status";
import { formatDetailedDate } from "@/lib/utils";
import StatusSettingsButton from "@/components/buttons/status-settings-button";
import FollowUserButton from "../buttons/follow-user-button";
import StarButton from "@/components/buttons/star-button";
import RepostButton from "@/components/buttons/repost-button";
import CommentButton from "@/components/buttons/comment-button";
import StatusHeader from "../headers/status-header";

interface StatusSectionProps {
  status: StatusPayload;
}

function StatusSection({ status }: StatusSectionProps) {
  return (
    <div className="flex flex-col p-4 gap-2">
      {/* Header  */}
      <StatusHeader status={status} />

      {/* Title */}
      <p className="text-xl font-bold">{status.title}</p>

      {/* Description */}
      <div
        className="text-lg"
        dangerouslySetInnerHTML={{ __html: status.description }}
      />

      {/* Assets (img, vid, audio) */}
      <StatusAttachments attachments={status.attachments} />

      {/* Timestamp */}
      <div className="font-light text-gray-400">
        {formatDetailedDate(status.createdAt)}
      </div>

      {/* Footer */}
      <div className="flex justify-between border-y-[1px] border-neutral-700 py-2">
        <CommentButton status={status} />
        <RepostButton
          statusId={status.id}
          isReposted={status.isReposted}
          count={status._count.reposts}
        />
        <StarButton
          statusId={status.id}
          isStarred={status.isStarred}
          count={status._count.stars}
          isStatusPage={true}
        />
        <Button size="icon" variant="ghost">
          <Share style={{ width: "60%", height: "60%" }} />
        </Button>
      </div>

      {/* Comment Form */}
      {/* <CommentForm /> */}
    </div>
  );
}

export default StatusSection;
