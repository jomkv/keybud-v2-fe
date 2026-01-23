"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { conversationApi } from "@/lib/api/conversation.api";
import { useMutation } from "@tanstack/react-query";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SendMessageFormProps {
  conversationId: number;
}

function SendMessageForm({ conversationId }: SendMessageFormProps) {
  const [messageValue, setMessageValue] = useState<string>("");

  const sendMessage = useMutation({
    mutationFn: () =>
      conversationApi.createMessage(messageValue, conversationId),
  });

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (messageValue.length === 0) return;

    try {
      await sendMessage.mutateAsync();
    } catch (error) {
      console.log(error);
      toast.warning("Something went wrong, please try again later");
    } finally {
      setMessageValue("");
    }
  };

  return (
    <form
      className="sticky bottom-0 px-3 py-2 bg-black"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2 items-center bg-neutral-800 rounded-full">
        <Input
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          type="submit"
          disabled={sendMessage.isPending}
        >
          <SendHorizonal size={18} />
        </Button>
      </div>
    </form>
  );
}

export default SendMessageForm;
