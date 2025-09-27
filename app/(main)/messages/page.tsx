"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import React, { useState } from "react";
import ConversationCard from "@/app/(main)/messages/components/cards/conversation-card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Messages() {
  const [enableNotifs, setEnableNotifs] = useState<boolean>(true);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-end p-3">
        <p className="font-semibold text-3xl">Messages</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Settings style={{ width: "90%", height: "90%" }} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={enableNotifs}
              onCheckedChange={setEnableNotifs}
            >
              Receive Email Notifications
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        {/* Search Input with Icon */}
        <div className="relative p-3">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <Input
            placeholder="Search Messages"
            className="pl-12 border-neutral-700 rounded-full text-white"
          />
        </div>

        {/* Conversations */}
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
      </div>
    </>
  );
}

export default Messages;
