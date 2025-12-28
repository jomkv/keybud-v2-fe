"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { S3Attachment, StatusPayload } from "@/@types/status";
import { cn, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import StatusSettingsButton from "../buttons/status-settings-button";
import StarButton from "../buttons/star-button";
import RepostButton from "../buttons/repost-button";
import CommentButton from "../buttons/comment-button";
interface StatusCardProps {
  status: StatusPayload;
  isPreview?: boolean;
}

export function StatusAttachments({
  attachments,
}: {
  attachments: S3Attachment[];
}) {
  if (attachments.length === 1) {
    return (
      <div className="w-full aspect-square my-2 overflow-hidden rounded-lg bg-neutral-800 flex items-center justify-center">
        <img
          src={attachments[0].signedUrl}
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
    );
  } else if (attachments.length === 2) {
    return (
      <div className="w-full aspect-3/2 my-2 grid grid-cols-2 gap-1 overflow-hidden rounded-lg">
        {attachments.map((attachment, i) => (
          <img
            key={i}
            src={attachment.signedUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        ))}
      </div>
    );
  } else if (attachments.length === 3) {
    return (
      <div className="w-full aspect-square my-2 grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        {/* Left tall image */}
        <div className="row-span-2 col-span-1 relative overflow-hidden">
          <img
            src={attachments[0].signedUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        {/* Top right */}
        <div className="col-span-1 relative overflow-hidden">
          <img
            src={attachments[1].signedUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        {/* Bottom right */}
        <div className="col-span-1 relative overflow-hidden">
          <img
            src={attachments[2].signedUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    );
  } else if (attachments.length === 4) {
    return (
      <div className="w-full aspect-square my-2 grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        {attachments.map((attachment, i) => (
          <div
            key={i}
            className="relative w-full h-full aspect-square overflow-hidden"
          >
            <img
              src={attachment.signedUrl}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

function StatusCard({ status, isPreview = false }: StatusCardProps) {
  const router = useRouter();
  const user = useUser();

  const onBodyClick = () => {
    if (isPreview) return;

    router.push(`/status/${status.id}`);
  };

  return (
    <div className="flex p-4 gap-2">
      <img
        src="/assets/user_icon.png"
        className="rounded-full w-12 h-12 mt-3"
      />

      {/* Body */}
      <div className="flex-1 flex flex-col">
        {/* Header (username, date, settings btn) */}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center ">
            {isPreview ? (
              <p className="font-semibold text-lg">@{status.user.username}</p>
            ) : (
              <Link href={`/${user?.username}`}>
                <p className="font-semibold text-lg hover:underline">
                  @{status.user.username}
                </p>
              </Link>
            )}

            <p className="font-light text-gray-400">·</p>
            <p className="font-light text-gray-400">
              {formatDate(status.createdAt)}
            </p>
          </div>

          {!isPreview && <StatusSettingsButton status={status} />}
        </div>

        <div
          onClick={onBodyClick}
          className={cn(isPreview ? "" : "cursor-pointer")}
        >
          {/* Title */}
          <p className="text-xl font-bold line-clamp-1">{status.title}</p>

          {/* Description */}
          <div
            className="text-lg line-clamp-3"
            dangerouslySetInnerHTML={{ __html: status.description }}
          />

          {/* Assets (img, vid, audio) */}
          {!isPreview && <StatusAttachments attachments={status.attachments} />}
        </div>

        {/* Footer */}
        {!isPreview && (
          <div className="flex gap-5" onClick={(e) => e.stopPropagation()}>
            <StarButton
              statusId={status.id}
              isStarred={status.isStarred}
              count={status._count.stars}
            />

            <RepostButton
              statusId={status.id}
              isReposted={status.isReposted}
              count={status._count.reposts}
            />

            <CommentButton status={status} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusCard;
