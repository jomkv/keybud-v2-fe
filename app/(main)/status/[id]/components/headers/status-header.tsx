"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import FollowUserButton from "../buttons/follow-user-button";
import StatusSettingsButton from "@/components/buttons/status-settings-button";
import { StatusPayload } from "@/@types/status";

interface StatusHeaderProps {
  status: StatusPayload;
}

function StatusHeader({ status }: StatusHeaderProps) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="sticky top-0 z-10 flex justify-between pb-2 items-center transition-all duration-200 backdrop-blur-sm bg-black/80 border-b border-neutral-700/50">
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={handleClick}
        >
          <ArrowLeft style={{ width: "90%", height: "90%" }} />
        </Button>
        <div className="flex gap-2 items-center">
          <img
            src="/assets/user_icon.png"
            className="rounded-full w-12 h-12 mt-3"
          />
          <Link href={`/${status.user.username}`}>
            <p className="font-semibold text-lg hover:underline">
              @{status.user.username}
            </p>
          </Link>
        </div>
      </div>

      <div>
        <FollowUserButton
          userId={status.userId}
          isFollowing={status.isFollowing}
        />

        <StatusSettingsButton status={status} />
      </div>
    </div>
  );
}

export default StatusHeader;
