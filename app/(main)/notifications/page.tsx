"use client";

import NotificationCard from "@/app/(main)/notifications/components/cards/notification-card";
import { useNotificationSocket } from "@/components/providers/socket-provider";
import { notificationnApi } from "@/lib/api/notification.api";
import {
  DeleteNotificationPayload,
  NewNotificationPayload,
  NOTIFICATION_EVENT_NAMES,
} from "@jomkv/keybud-v2-contracts";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

function Notifications() {
  const notificationSocket = useNotificationSocket();

  const {
    isLoading,
    isSuccess,
    isError,
    data: notifications,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationnApi.getAllNotifications,
  });

  useEffect(() => {
    const handleNewNotification = (data: NewNotificationPayload) => {
      console.log(data);
    };

    const handleDeleteNotification = (data: DeleteNotificationPayload) => {
      console.log(data);
    };

    notificationSocket.on(
      NOTIFICATION_EVENT_NAMES.NEW_NOTIFICATION,
      handleNewNotification,
    );

    notificationSocket.on(
      NOTIFICATION_EVENT_NAMES.DELETE_NOTIFACTION,
      handleDeleteNotification,
    );

    return () => {
      notificationSocket.off(
        NOTIFICATION_EVENT_NAMES.NEW_NOTIFICATION,
        handleNewNotification,
      );

      notificationSocket.off(
        NOTIFICATION_EVENT_NAMES.DELETE_NOTIFACTION,
        handleDeleteNotification,
      );
    };
  }, []);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <>
      {isSuccess &&
        notifications &&
        notifications.map((notif, idx) => (
          <NotificationCard payload={notif} key={idx} />
        ))}
    </>
  );
}

export default Notifications;
