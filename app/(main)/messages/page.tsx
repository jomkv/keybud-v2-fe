"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, SquarePen } from "lucide-react";
import React, { useState } from "react";
import ConversationCard from "@/app/(main)/messages/components/cards/conversation-card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { conversationApi } from "@/lib/api/conversation.api";
import Loader from "@/components/defaults/loader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NewMessageModal from "./components/modals/new-message-modal";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Messages() {
  const [enableNotifs, setEnableNotifs] = useState<boolean>(true);
  const [showNewMessage, setShowNewMessage] = useState<boolean>(false);

  const user = useUser();
  const router = useRouter();

  const {
    isLoading,
    isSuccess,
    data: conversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: conversationApi.getAllConversations,
  });

  const createConversation = useMutation({
    mutationFn: (memberIds: number[]) =>
      conversationApi.createConversation(memberIds),
  });

  const getExistingConversationId = (memberIds: number[]): number | null => {
    if (!conversations || conversations?.length == 0) return null;

    const idsSet = new Set(memberIds);

    // Check if member IDs are a complete match
    for (const conversation of conversations) {
      if (memberIds.length !== conversation.members.length) continue;

      const convoSet = new Set(conversation.members.map((m) => m.userId));

      if ([...idsSet].every((id) => convoSet.has(id))) {
        return conversation.id;
      }
    }

    return null;
  };

  const createNewConversation = async (memberIds: number[]): Promise<void> => {
    if (!conversations) return;

    memberIds = [...memberIds, user?.id as number];

    const existingConversationId = getExistingConversationId(memberIds);

    if (existingConversationId) {
      router.push(`/messages/${existingConversationId}`);
      return;
    }

    try {
      const newConvo = await createConversation.mutateAsync(memberIds);

      router.push(`/messages/${newConvo.id}`);
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
    }
  };

  if (isLoading) return <Loader size={50} />;

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-end p-3">
        <p className="font-semibold text-3xl">Messages</p>

        <div className="flex justify-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowNewMessage(true)}
              >
                <SquarePen style={{ width: "80%", height: "80%" }} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>New message</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Settings style={{ width: "80%", height: "80%" }} />
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
        {isSuccess && (
          <>
            {conversations.map((convo, index) => (
              <ConversationCard key={index} conversation={convo} />
            ))}
          </>
        )}
      </div>

      <NewMessageModal
        open={showNewMessage}
        setOpen={setShowNewMessage}
        handleCreate={createNewConversation}
      />
    </>
  );
}

export default Messages;
