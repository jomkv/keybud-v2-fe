import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import React from "react";

function SendMessageForm() {
  return (
    <form className="sticky bottom-0 px-3 py-2 bg-black">
      <div className="flex gap-2 items-center bg-neutral-800 rounded-full">
        <Input
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4"
        />
        <Button size="icon" variant="ghost" className="rounded-full">
          <SendHorizonal size={18} />
        </Button>
      </div>
    </form>
  );
}

export default SendMessageForm;
