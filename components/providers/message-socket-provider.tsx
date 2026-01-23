"use client";
import { createContext, useContext, useEffect, useRef } from "react";
import { messageSocket } from "@/app/socket";
import { MESSAGE_EVENT_NAMES } from "@jomkv/keybud-v2-contracts";
import { useUser } from "@/hooks/use-user";

type MessageSocketCtx = { socket: typeof messageSocket };
const MessageSocketContext = createContext<MessageSocketCtx | null>(null);

export function MessageSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const connected = useRef(false);

  useEffect(() => {
    if (!user?.id || connected.current) return;
    connected.current = true;

    messageSocket.connect();
    const handleConnect = () => {
      messageSocket.emit(MESSAGE_EVENT_NAMES.SUBSCRIBE, { userId: user.id });
    };

    messageSocket.on("connect", handleConnect);
    return () => {
      messageSocket.off("connect", handleConnect);
      messageSocket.disconnect();
      connected.current = false;
    };
  }, [user?.id]);

  return (
    <MessageSocketContext.Provider value={{ socket: messageSocket }}>
      {children}
    </MessageSocketContext.Provider>
  );
}

export function useMessageSocket() {
  const ctx = useContext(MessageSocketContext);
  if (!ctx) throw new Error("MessageSocketProvider missing");
  return ctx.socket;
}
