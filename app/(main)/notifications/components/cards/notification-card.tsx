import { Icon } from "@iconify/react";
import React from "react";

function NotificationCard() {
  return (
    <div className="flex p-4 gap-2">
      <Icon icon="ph:star-fill" className="ms-4 w-7 h-7" />
      <div className="flex-1 flex flex-col">
        {/* Icons */}
        <img src="/assets/user_icon.png" className="rounded-full w-10 h-10" />

        {/* Notification Description */}
        <p className="text-lg">
          <span className="font-bold">John Doe</span> starred your post
        </p>

        {/* Description */}
        <p className="text-lg text-neutral-400">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          molestiae soluta autem dicta vitae assumenda similique earum harum
          corrupti beatae odio, aperiam modi aut. Dolor rerum tenetur ipsam
          obcaecati placeat?
        </p>
      </div>
    </div>
  );
}

export default NotificationCard;
