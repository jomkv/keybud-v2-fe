import { StatusAttachments } from "@/components/cards/status-card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Repeat2, Star, Share } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommentForm from "@/app/(main)/status/[id]/components/forms/comment-form";
import { StatusPayload } from "@/@types/status";
import { formatDetailedDate } from "@/lib/utils";
import StatusSettingsButton from "@/components/buttons/status-settings-button";
import { useUser } from "@/hooks/use-user";
import FollowUserButton from "../buttons/follow-user-button";
import StarButton from "@/components/buttons/star-button";
import RepostButton from "@/components/buttons/repost-button";
import CommentButton from "@/components/buttons/comment-button";

interface StatusSectionProps {
  status: StatusPayload;
}

function StatusSection({ status }: StatusSectionProps) {
  const user = useUser();

  return (
    <div className="flex flex-col p-4 gap-2">
      {/* Header  */}
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/user_icon.png"
            className="rounded-full w-12 h-12 mt-3"
          />
          <Link href={`/${status.user.username}`}>
            <p className="font-semibold text-lg hover:underline">
              @{status.user.username}
            </p>
          </Link>
        </div>

        <div>
          <FollowUserButton
            userId={status.userId}
            isFollowing={status.isFollowing}
          />

          <StatusSettingsButton status={status} />
        </div>
      </div>

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
