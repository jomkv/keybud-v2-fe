"use client";

import { io } from "socket.io-client";

export const authSocket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`);
