"use client";
import { createContext, useContext, useEffect, useRef } from "react";
import { messageSocket, notificationSocket } from "@/app/socket";
import {
  MESSAGE_EVENT_NAMES,
  NOTIFICATION_EVENT_NAMES,
} from "@jomkv/keybud-v2-contracts";
import { useUser } from "@/hooks/use-user";

type SocketCtx = {
  messageSocket: typeof messageSocket;
  notificationSocket: typeof notificationSocket;
};
const SocketContext = createContext<SocketCtx | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const messageSocketConnected = useRef(false);
  const notificationSocketConnected = useRef(false);

  useEffect(() => {
    console.log("DEBUG:", user?.id);
  }, [user?.id]);

  useEffect(() => {
    if (
      !user?.id ||
      (messageSocketConnected.current && notificationSocketConnected.current)
    )
      return;

    const messageHandleConnect = () => {
      messageSocketConnected.current = true;
      messageSocket.emit(MESSAGE_EVENT_NAMES.SUBSCRIBE, { userId: user.id });
    };

    const notificationHandleConnect = () => {
      notificationSocketConnected.current = true;
      notificationSocket.emit(NOTIFICATION_EVENT_NAMES.SUBSCRIBE, {
        userId: user.id,
      });
    };

    if (!messageSocketConnected.current) {
      messageSocket.connect();
    }

    if (!notificationSocketConnected.current) {
      notificationSocket.connect();
    }

    notificationSocket.on("connect", notificationHandleConnect);
    messageSocket.on("connect", messageHandleConnect);
    return () => {
      console.log("DEBUG2:", "disconnected");
      messageSocket.off("connect", messageHandleConnect);
      messageSocket.disconnect();
      notificationSocket.off("connect", notificationHandleConnect);
      notificationSocket.disconnect();
      messageSocketConnected.current = false;
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
