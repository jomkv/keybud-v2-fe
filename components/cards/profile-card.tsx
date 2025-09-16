import React from "react";
import { Button } from "@/components/ui/button";

export default function ProfileCard() {
  return (
    <div className="border-2 border-solid border-neutral-700 flex flex-col items-center text-center rounded-lg divide-y divide-neutral-700">
      <div className="w-full h-5 bg-[#8c53fe] rounded-t-lg" />
      <div className="w-full flex flex-col items-center p-5 gap-3">
        <img
          src="/assets/user_icon.png"
          alt="Profile"
          className="w-24 h-24 rounded-full border-white"
        />
        <p className="font-bold text-lg">John Doe</p>
        <p className="font-light text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id minus
          maiores officiis sit ad qui corrupti.
        </p>
      </div>
      <div className="w-full p-3">
        <p className="font-light text-md">Following</p>
        <p className="font-semibold text-md">34</p>
      </div>

      <div className="w-full p-3">
        <p className="font-light text-md">Followers</p>
        <p className="font-semibold text-md">155</p>
      </div>

      <Button className="w-full h-full rounded-none py-3" variant="ghost">
        View Profile
      </Button>
    </div>
  );
}
