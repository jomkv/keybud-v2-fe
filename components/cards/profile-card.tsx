"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

export default function ProfileCard() {
  const user = useUser();
  const router = useRouter();

  const handleViewProfileClick = () => {
    if (!user) return;

    router.push(`/${user.username}`);
  };

  return (
    <div className="border-2 border-solid border-neutral-700 flex flex-col items-center text-center rounded-lg divide-y divide-neutral-700">
      <div className="w-full h-5 bg-[#8c53fe] rounded-t-lg" />
      <div className="w-full flex flex-col items-center p-5 gap-3">
        <img
          src="/assets/user_icon.png"
          alt="Profile"
          className="w-24 h-24 rounded-full border-white"
        />
        <p className="font-bold text-lg">{user?.username}</p>
        <p className="font-light text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id minus
          maiores officiis sit ad qui corrupti.
        </p>
      </div>
      <div className="w-full p-3">
        <p className="font-light text-md">Following</p>
        <p className="font-semibold text-md">{user?._count.followings}</p>
      </div>

      <div className="w-full p-3">
        <p className="font-light text-md">Followers</p>
        <p className="font-semibold text-md">{user?._count.followers}</p>
      </div>

      <Button
        className="w-full h-full rounded-none py-3"
        variant="ghost"
        onClick={handleViewProfileClick}
      >
        View Profile
      </Button>
    </div>
  );
}
