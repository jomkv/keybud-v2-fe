"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authSocket } from "@/app/socket";

export function useAuth() {
  const [isConnected, setIsConnected] = useState(false); // Tracks socket connection
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const router = useRouter();
  const hasSubscribed = useRef(false); // Tracks auth subscription

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      if (!hasSubscribed.current) {
        authSocket.emit("auth:subscribe", { sessionId: sessionIdRef.current });
        hasSubscribed.current = true;
      }
    };

    const handleAuthComplete = () => {
      router.push("/");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      hasSubscribed.current = false;
    };

    // Set up event listeners
    authSocket.on("connect", handleConnect);
    authSocket.on("auth:complete", handleAuthComplete);
    authSocket.on("disconnect", handleDisconnect);

    // Connect if not already connected
    if (!authSocket.connected) {
      authSocket.connect();
    } else {
      handleConnect();
    }

    return () => {
      authSocket.off("connect", handleConnect);
      authSocket.off("auth:complete", handleAuthComplete);
      authSocket.off("disconnect", handleDisconnect);
    };
  }, [router]);

  const getGoogleLoginUrl = () => {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google?session=${sessionIdRef.current}`;
  };

  return {
    isConnected,
    sessionId: sessionIdRef.current,
    googleLoginUrl: getGoogleLoginUrl(),
  };
}
