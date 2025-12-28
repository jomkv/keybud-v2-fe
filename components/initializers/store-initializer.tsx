"use client";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/user-slice";
import { UserPayload } from "@/@types/user";

interface StoreInitializerProps {
  user: UserPayload | null;
}

export default function StoreInitializer({ user }: StoreInitializerProps) {
  const dispatch = useDispatch();
  const initialized = useRef<boolean>(false);
  const lastUserRef = useRef<UserPayload>(user);

  // Sync state if it's the first load OR if the user object changed
  if (!initialized.current || lastUserRef.current?.id !== user?.id) {
    dispatch(setUser(user));
    initialized.current = true;
    lastUserRef.current = user;
  }

  return null; // This component renders nothing, it just manages state
}
