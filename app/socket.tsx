"use client";

import { io, Socket } from "socket.io-client";
import {
  AuthClientToServerEvents,
  AuthServerToClientEvents,
  MessageClientToServerEvents,
  MessageServerToClientEvents,
  NotificationClientToServerEvents,
  NotificationServerToClientEvents,
} from "@jomkv/keybud-v2-contracts";

export const authSocket: Socket<
  AuthServerToClientEvents,
  AuthClientToServerEvents
> = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
  autoConnect: false,
  transports: ["websocket"],
});

export const messageSocket: Socket<
  MessageServerToClientEvents,
  MessageClientToServerEvents
> = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/message`, {
  autoConnect: false,
  transports: ["websocket"],
});

export const notificationSocket: Socket<
  NotificationServerToClientEvents,
  NotificationClientToServerEvents
> = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification`, {
  autoConnect: false,
  transports: ["websocket"],
});
