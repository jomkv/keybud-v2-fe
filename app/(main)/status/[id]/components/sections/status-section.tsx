import { StatusAttachments } from "@/components/cards/status-card";
import { Button } from "@/components/ui/button";
import { Ellipsis, MessageSquare, Repeat2, Star, Share } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommentForm from "@/app/(main)/status/[id]/components/forms/comment-form";
import { StatusPayload } from "@/@types/status";
import { formatDate, formatDetailedDate } from "@/lib/utils";

interface StatusSectionProps {
  status: StatusPayload;
}

function StatusSection({ status }: StatusSectionProps) {
  return (
    <div className="flex flex-col p-4 gap-2">
      {/* Header  */}
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/user_icon.png"
            className="rounded-full w-12 h-12 mt-3"
          />
          <Link href="/johndoe">
            <p className="font-semibold text-lg hover:underline">
              @{status.user.username}
            </p>
          </Link>
        </div>

        <div>
          <Button className="rounded-full text-md font-semibold" size="sm">
            Follow
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Ellipsis />
          </Button>
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
        <Button size="icon" variant="ghost">
          <MessageSquare style={{ width: "60%", height: "60%" }} />
        </Button>
        <Button size="icon" variant="ghost">
          <Repeat2 style={{ width: "60%", height: "60%" }} />
        </Button>
        <Button size="icon" variant="ghost">
          <Star style={{ width: "60%", height: "60%" }} />
        </Button>
        <Button size="icon" variant="ghost">
          <Share style={{ width: "60%", height: "60%" }} />
        </Button>
      </div>

      {/* Comment Form */}
      <CommentForm />
    </div>
  );
}

export default StatusSection;
