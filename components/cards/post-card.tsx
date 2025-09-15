import React from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis, MessageSquare, Repeat2, Star } from "lucide-react";

function PostCard() {
  return (
    <div className="flex p-4 gap-2">
      <img src="/assets/user_icon.png" className="rounded-full w-12 h-12" />
      <div className="flex-1 flex flex-col">
        {/* Header (username, date, settings btn) */}
        <div className="flex justify-between">
          <div className="flex gap-2  items-center">
            <p className="font-semibold text-lg">@woozy</p>
            <p className="font-light text-gray-400">·</p>
            <p className="font-light text-gray-400">Sep 14</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Ellipsis />
          </Button>
        </div>

        {/* Description */}
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          corporis quaerat vel dolore quidem reiciendis ipsum cupiditate at,
          quibusdam ipsam explicabo nostrum perferendis laborum officia nulla
          voluptatibus ut consequatur aliquam! Quibusdam ipsam explicabo nostrum
          perferendis laborum officia nulla voluptatibus ut consequatur aliquam!
        </p>

        {/* Assets (img, vid, audio) */}

        {/* Footer */}
        <div className="flex gap-5">
          {/* Comment */}

          <Button variant="ghost" className="p-1">
            <MessageSquare /> 10
          </Button>

          <Button variant="ghost" className="p-1">
            <Repeat2 /> 42
          </Button>

          <Button variant="ghost" className="p-1">
            <Star /> 106
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
