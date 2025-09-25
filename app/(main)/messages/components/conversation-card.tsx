import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

function ConversationCard() {
  return (
    <div className="flex justify-between p-3 cursor-pointer hover:bg-neutral-800">
      <div className="flex gap-2">
        <div className="w-12 h-12">
          <img
            src="/assets/user_icon.png"
            className="rounded-full w-full h-full"
          />
        </div>

        <div className="flex-1">
          <p className="font-bold text-lg">@johndoe</p>
          <p className="font-light">most recent message</p>
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full hover:bg-purple-500"
      >
        <Ellipsis />
      </Button>
    </div>
  );
}

export default ConversationCard;
