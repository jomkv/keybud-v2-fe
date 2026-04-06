import { Icon } from "@iconify/react";
import type { NotificationType } from "@/@types/notification";
import React from "react";
import { NewNotificationPayload } from "@jomkv/keybud-v2-contracts";

const notifTypeMap: any = {
  STATUS_STAR: {
    icon: "ph:star-fill",
    message: "starred your post",
  },
  STATUS_REPOST: {
    icon: "ph:repeat",
    message: "reposted your post",
  },
  STATUS_COMMENT: {
    icon: "ph:chat-centered-text-fill",
    message: "commented on your post",
  },
  USER_FOLLOW: {
    icon: "ph:user-plus-fill",
    message: "followed you",
  },
};

interface NotificationCardProps {
  payload: NewNotificationPayload;
}

function NotificationCard({ payload }: NotificationCardProps) {
  return (
    <div className="flex p-4 gap-2">
      <Icon icon={notifTypeMap[payload.type].icon} className="ms-4 w-7 h-7" />
      <div className="flex-1 flex flex-col">
        {/* Icons */}
        <img src="/assets/user_icon.png" className="rounded-full w-10 h-10" />

        {/* Notification Description */}
        <p className="text-lg">
          <span className="font-bold">{payload.sender.username}</span>{" "}
          {notifTypeMap[payload.type].message}
        </p>

        {payload.type === "USER_FOLLOW" && (
          <p className="text-lg text-neutral-400 line-clamp-2">
            payload.sender.bio
          </p>
        )}

        {payload.type !== "USER_FOLLOW" && payload.status && (
          <div
            className="text-lg text-neutral-400 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: payload.status?.description }}
          />
        )}
      </div>
    </div>
  );
}

export default NotificationCard;
