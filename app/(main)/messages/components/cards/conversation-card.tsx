"use client";

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Conversation } from "@/@types/conversation";
import Link from "next/link";
import { getRecipientUsername } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";

interface ConversationCardProps {
  conversation: Conversation;
}

function ConversationCard({ conversation }: ConversationCardProps) {
  const user = useUser();

  return (
    <Link
      href={`/messages/${conversation.id}`}
      className="flex justify-between p-3 cursor-pointer hover:bg-neutral-800 group transition-all"
    >
      <div className="flex gap-2">
        <div className="w-12 h-12">
          <img
            src="/assets/user_icon.png"
            className="rounded-full w-full h-full"
          />
        </div>

        <div className="flex-1">
          <p className="font-bold text-lg">
            {conversation.name ||
              getRecipientUsername(conversation.members, user?.id as number)}
          </p>
          <p className="font-light">{conversation.messages[0]?.content}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-purple-400/50 hover:text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Delete Conversation</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
}

export default ConversationCard;
