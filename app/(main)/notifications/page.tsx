"use client";

import NotificationCard from "@/app/(main)/notifications/components/cards/notification-card";
import { notificationnApi } from "@/lib/api/notification.api";
import { groupNotifications } from "@/lib/helpers/notification-helper";
import {
  setNotifications,
  clearUnread,
} from "@/store/slices/notification-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Loader from "@/components/defaults/loader";

function Notifications() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((s) => s.notification.notifications);

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationnApi.getAllNotifications,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setNotifications(data));
      dispatch(clearUnread());
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading) return <Loader size={50} />;

  const grouped = groupNotifications(notifications);

  return (
    <>
      {grouped.map((group, idx) => (
        <NotificationCard key={idx} group={group} />
      ))}
      {grouped.length === 0 && (
        <p className="text-center text-neutral-400 mt-16">
          No notifications yet.
        </p>
      )}
    </>
  );
}

export default Notifications;
