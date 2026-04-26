import { Icon } from "@iconify/react";
import React from "react";
import {
  GroupedNotification,
  formatSenderText,
} from "@/lib/helpers/notification-helper";
import { formatDate } from "@/lib/utils";

const notifTypeMap: Record<string, { icon: string; message: string }> = {
  STATUS_STAR: { icon: "ph:star-fill", message: "starred your post" },
  STATUS_REPOST: {
    icon: "ph:arrows-left-right-bold",
    message: "reposted your post",
  },
  STATUS_COMMENT: {
    icon: "ph:chat-centered-text-fill",
    message: "commented on your post",
  },
  USER_FOLLOW: { icon: "ph:user-plus-fill", message: "followed you" },
};

interface NotificationCardProps {
  group: GroupedNotification;
}

function NotificationCard({ group }: NotificationCardProps) {
  const typeConfig = notifTypeMap[group.type];

  return (
    <div className="flex p-4 gap-3 border-b border-neutral-800">
      <Icon icon={typeConfig.icon} className="w-7 h-7 mt-1 shrink-0" />
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          {group.senders.slice(0, 5).map((sender) => (
            <img
              key={sender.userId}
              src="/assets/user_icon.png"
              className="rounded-full w-9 h-9"
            />
          ))}
        </div>
        <p className="text-base">
          <span className="font-bold">{formatSenderText(group.senders)}</span>{" "}
          {typeConfig.message}
        </p>
        {group.type !== "USER_FOLLOW" && group.status && (
          <div
            className="text-sm text-neutral-400 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: group.status.description }}
          />
        )}
        {group.type === "USER_FOLLOW" &&
          group.senders.length === 1 &&
          group.senders[0].bio && (
            <p className="text-sm text-neutral-400">{group.senders[0].bio}</p>
          )}
        <p className="text-xs text-neutral-500">
          {formatDate(group.latestCreatedAt.toISOString())}
        </p>
      </div>
    </div>
  );
}

export default NotificationCard;
