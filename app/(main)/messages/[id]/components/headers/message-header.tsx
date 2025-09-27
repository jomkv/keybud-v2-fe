import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

function MessageHeader() {
  return (
    <div className="sticky top-0 z-10 flex justify-start items-center p-3 gap-4 transition-all duration-200 backdrop-blur-sm bg-black/80 border-b border-neutral-700/50">
      <Button size="icon" variant="ghost" className="rounded-full">
        <ArrowLeft style={{ width: "90%", height: "90%" }} />
      </Button>
      <div className="flex items-center gap-1">
        <img src="/assets/user_icon.png" className="rounded-full w-8 h-8" />
        <p className="font-semibold text-xl">@woozy</p>
      </div>
    </div>
  );
}

export default MessageHeader;
