import { StatusAttachments } from "@/components/cards/status-card";
import { Button } from "@/components/ui/button";
import { Ellipsis, MessageSquare, Repeat2, Star, Share } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommentForm from "@/app/(main)/status/[id]/components/forms/comment-form";

function PostSection() {
  return (
    <div className="flex flex-col p-4 gap-2">
      {/* Header  */}
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/user_icon.png"
            className="rounded-full w-12 h-12 mt-3"
          />
          <Link href="/johndoe">
            <p className="font-semibold text-lg hover:underline">@woozy</p>
          </Link>
        </div>

        <div>
          <Button className="rounded-full text-md font-semibold" size="sm">
            Follow
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Ellipsis />
          </Button>
        </div>
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
      <StatusAttachments
        attachments={[
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s",
        ]}
      />

      {/* Timestamp */}
      <div className="font-light text-gray-400">12:11 AM · Sep 21, 2025</div>

      {/* Footer */}
      <div className="flex justify-between border-y-[1px] border-neutral-700 py-2">
        <Button size="icon" variant="ghost">
          <MessageSquare style={{ width: "60%", height: "60%" }} />
        </Button>
        <Button size="icon" variant="ghost">
          <Repeat2 style={{ width: "60%", height: "60%" }} />
        </Button>
        <Button size="icon" variant="ghost">
          <Star style={{ width: "60%", height: "60%" }} />
        </Button>
        <Button size="icon" variant="ghost">
          <Share style={{ width: "60%", height: "60%" }} />
        </Button>
      </div>

      {/* Comment Form */}
      <CommentForm />
    </div>
  );
}

export default PostSection;
