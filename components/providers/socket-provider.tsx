"use client";
import { createContext, useContext, useEffect, useRef } from "react";
import { messageSocket, notificationSocket } from "@/app/socket";
import {
  DeleteNotificationPayload,
  MESSAGE_EVENT_NAMES,
  NewNotificationPayload,
  NOTIFICATION_EVENT_NAMES,
} from "@jomkv/keybud-v2-contracts";
import { useUser } from "@/hooks/use-user";
import { useAppDispatch } from "@/store/hooks";
import {
  addNotification,
  removeNotification,
} from "@/store/slices/notification-slice";

type SocketCtx = {
  messageSocket: typeof messageSocket;
  notificationSocket: typeof notificationSocket;
};
const SocketContext = createContext<SocketCtx | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("DEBUG:", user?.id);
  }, [user?.id]);

  useEffect(() => {
    const handleNew = (data: NewNotificationPayload) => {
      dispatch(addNotification(data));
    };
    const handleDelete = (data: DeleteNotificationPayload) => {
      dispatch(removeNotification(data.notificationId));
    };

    notificationSocket.on(NOTIFICATION_EVENT_NAMES.NEW_NOTIFICATION, handleNew);
    notificationSocket.on(
      NOTIFICATION_EVENT_NAMES.DELETE_NOTIFACTION,
      handleDelete,
    );

    return () => {
      notificationSocket.off(
        NOTIFICATION_EVENT_NAMES.NEW_NOTIFICATION,
        handleNew,
      );
      notificationSocket.off(
        NOTIFICATION_EVENT_NAMES.DELETE_NOTIFACTION,
        handleDelete,
      );
    };
  }, [dispatch]);

  useEffect(() => {
    if (!user?.id) return;

    const messageHandleConnect = () => {
      messageSocket.emit(MESSAGE_EVENT_NAMES.SUBSCRIBE, { userId: user.id });
    };

    const notificationHandleConnect = () => {
      notificationSocket.emit(NOTIFICATION_EVENT_NAMES.SUBSCRIBE, {
        userId: user.id,
      });
    };

    messageSocket.connect();
    notificationSocket.connect();

    notificationSocket.on("connect", notificationHandleConnect);
    messageSocket.on("connect", messageHandleConnect);

    // If already connected at mount time, subscribe immediately
    if (messageSocket.connected) messageHandleConnect();
    if (notificationSocket.connected) notificationHandleConnect();

    return () => {
      messageSocket.off("connect", messageHandleConnect);
      messageSocket.disconnect();
      notificationSocket.off("connect", notificationHandleConnect);
      notificationSocket.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider
      value={{
        messageSocket: messageSocket,
        notificationSocket: notificationSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useMessageSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("SocketProvider missing");
  if (!ctx.messageSocket) throw new Error("MessageSocketProvider missing");
  return ctx.messageSocket;
}

export function useNotificationSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("SocketProvider missing");
  if (!ctx.notificationSocket)
    throw new Error("NotificationSocketProvider missing");
  return ctx.notificationSocket;
}
