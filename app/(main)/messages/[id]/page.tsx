"use client";

import { type Message } from "@/@types/conversation";
import MessageBubbleIncoming from "@/app/(main)/messages/[id]/components/bubbles/message-bubble-incoming";
import MessageBubbleOutgoing from "@/app/(main)/messages/[id]/components/bubbles/message-bubble-outgoing";
import SendMessageForm from "@/app/(main)/messages/[id]/components/forms/send-message-form";
import MessageHeader from "@/app/(main)/messages/[id]/components/headers/message-header";
import Loader from "@/components/defaults/loader";
import { useMessageSocket } from "@/components/providers/message-socket-provider";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { conversationApi } from "@/lib/api/conversation.api";
import { getRecipientUsername } from "@/lib/utils";
import {
  MESSAGE_EVENT_NAMES,
  NewMessagePayload,
} from "@jomkv/keybud-v2-contracts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function Message() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();
  const user = useUser();
  const messagesRef = useRef<null | HTMLDivElement>(null);
  const messageSocket = useMessageSocket();

  const { isLoading, isSuccess, data, refetch, isPlaceholderData } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () => conversationApi.getConversation(Number(id), isInitialLoad),
    placeholderData: keepPreviousData,
  });

  const handleLoadMore = async () => {
    const res = await refetch();

    if (res.data?.messages) {
      setMessages((prevMessages) => [...prevMessages, ...res.data.messages]);

      if (res.data.messages.length === 0) {
        setHasMore(false);
      }
    }
  };

  const appendNewMessage = async (newMessagePayload: NewMessagePayload) => {
    const newMessage: Message = {
      ...newMessagePayload,
      createdAt: String(newMessagePayload.createdAt),
      readAt: newMessagePayload.readAt
        ? String(newMessagePayload.readAt)
        : null,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  useEffect(() => {
    if (isInitialLoad && isSuccess && data) {
      setMessages(data?.messages);
      setIsInitialLoad(false);

      if (data?.messages.length < 15) {
        setHasMore(false);
      }
    }
  }, [isSuccess, data, isInitialLoad]);

  useLayoutEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight; // jump, no smooth
  }, [messages]);

  useEffect(() => {
    const handleNewMessage = (data: NewMessagePayload) => {
      appendNewMessage(data);
    };

    messageSocket.on(MESSAGE_EVENT_NAMES.NEW_MESSAGE, handleNewMessage);

    return () => {
      messageSocket.off(MESSAGE_EVENT_NAMES.NEW_MESSAGE, handleNewMessage);
      messageSocket.disconnect();
    };
  }, []);

  if (isLoading) return <Loader size={50} />;

  return (
    <>
      {/* Sticky Header */}
      {isSuccess && data && (
        <MessageHeader
          name={
            data.conversation.name ||
            getRecipientUsername(
              data.conversation.members,
              user?.id as number,
            ) ||
            ""
          }
        />
      )}

      {/* Messages */}
      <div
        ref={messagesRef}
        className="flex-1 p-3 flex flex-col-reverse gap-2 min-h-0"
      >
        {messages.map((message, index) => {
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

        {hasMore && (
          <Button onClick={handleLoadMore} disabled={isLoading}>
            load more BRUHH
          </Button>
        )}
      </div>

      {/* Sticky Bottom Form */}
      {data && <SendMessageForm conversationId={data.conversation.id} />}
    </>
  );
}

export default Message;
