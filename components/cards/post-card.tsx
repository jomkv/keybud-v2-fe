import React from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis, MessageSquare, Repeat2, Star } from "lucide-react";
import Link from "next/link";

// Example attachments array (replace with your data)
const attachments: string[] = [
  //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s",
  //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s",
  //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s",
  //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJ5rAqr1pIi6pHOdFGGijRXcE4HLHqWJNSw&s",
];

export function PostAttachments({ attachments }: { attachments: string[] }) {
  if (attachments.length === 1) {
    return (
      <div className="w-full aspect-square my-2 overflow-hidden rounded-lg bg-neutral-800 flex items-center justify-center">
        <img
          src={attachments[0]}
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
    );
  } else if (attachments.length === 2) {
    return (
      <div className="w-full aspect-3/2 my-2 grid grid-cols-2 gap-1 overflow-hidden rounded-lg">
        {attachments.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="object-cover w-full h-full"
          />
        ))}
      </div>
    );
  } else if (attachments.length === 3) {
    return (
      <div className="w-full aspect-square my-2 grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        {/* Left tall image */}
        <div className="row-span-2 col-span-1 relative overflow-hidden">
          <img
            src={attachments[0]}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        {/* Top right */}
        <div className="col-span-1 relative overflow-hidden">
          <img
            src={attachments[1]}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        {/* Bottom right */}
        <div className="col-span-1 relative overflow-hidden">
          <img
            src={attachments[2]}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    );
  } else if (attachments.length === 4) {
    return (
      <div className="w-full aspect-square my-2 grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        {attachments.map((src, i) => (
          <div
            key={i}
            className="relative w-full h-full aspect-square overflow-hidden"
          >
            <img src={src} alt="" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

function PostCard() {
  return (
    <div className="flex p-4 gap-2">
      <img
        src="/assets/user_icon.png"
        className="rounded-full w-12 h-12 mt-3"
      />
      <div className="flex-1 flex flex-col">
        {/* Header (username, date, settings btn) */}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link href="/johndoe">
              <p className="font-semibold text-lg hover:underline">@woozy</p>
            </Link>
            <p className="font-light text-gray-400">·</p>
            <p className="font-light text-gray-400">Sep 14</p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full">
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
        <PostAttachments attachments={attachments} />

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
