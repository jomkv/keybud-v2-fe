import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import React from "react";

function Messages() {
  return (
    <>
      <div className="flex justify-between items-end p-3">
        <p className="font-semibold text-3xl">Messages</p>
        <Button size="icon" variant="ghost">
          <Settings style={{ width: "90%", height: "90%" }} />
        </Button>
      </div>
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
    </>
  );
}

export default Messages;
