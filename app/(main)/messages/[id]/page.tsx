"use client";

import { type Message } from "@/@types/conversation";
import MessageBubbleIncoming from "@/app/(main)/messages/[id]/components/bubbles/message-bubble-incoming";
import MessageBubbleOutgoing from "@/app/(main)/messages/[id]/components/bubbles/message-bubble-outgoing";
import SendMessageForm from "@/app/(main)/messages/[id]/components/forms/send-message-form";
import MessageHeader from "@/app/(main)/messages/[id]/components/headers/message-header";
import Loader from "@/components/defaults/loader";
import { useUser } from "@/hooks/use-user";
import { conversationApi } from "@/lib/api/conversation.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Message() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { id } = useParams<{ id: string }>();
  const user = useUser();

  const {
    isLoading,
    isSuccess,
    data: conversation,
  } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () =>
      conversationApi.getConversation(id as unknown as number, true),
  });

  useEffect(() => {
    if (isSuccess && conversation) {
      setMessages(conversation?.messages);
    }
  }, [isSuccess]);

  if (isLoading) return <Loader size={50} />;

  return (
    <>
      {/* Sticky Header */}
      <MessageHeader />

      {/* Messages */}
      <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto min-h-0">
        {messages.map((message, index) => {
          console.log(message.senderId);

          if (message.senderId === user?.id) {
            return (
              <MessageBubbleOutgoing key={index} message={message.content} />
            );
          } else {
            return (
              <MessageBubbleIncoming key={index} message={message.content} />
            );
          }
        })}
      </div>

      {/* Sticky Bottom Form */}
      <SendMessageForm />
    </>
  );
}

export default Message;
