import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreatePostModal from "@/app/(main)/components/modals/create-post-modal";

const LEFT_NAV_ITEMS: {
  icon: string;
  url: string;
  title: string;
}[] = [
  {
    title: "Home",
    url: "/",
    icon: "ph:house",
  },
  {
    title: "Messages",
    url: "#",
    icon: "ph:envelope-simple",
  },
  {
    title: "Notifications",
    url: "#",
    icon: "ph:bell-simple",
  },
  {
    title: "Search",
    url: "#",
    icon: "ph:magnifying-glass",
  },
  {
    title: "Profile",
    url: "#",
    icon: "ph:user",
  },
  {
    title: "Settings",
    url: "#",
    icon: "ph:gear",
  },
  {
    title: "Logout",
    url: "#",
    icon: "ph:arrow-line-right",
  },
];

export default function LeftSidebar() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-3 items-start">
        <Link
          className="flex items-center p-3 justify-start gap-4 h-10 hover:bg-neutral-500 rounded-full"
          href={"/"}
        >
          <img
            src="/assets/Logo_Acronym.svg"
            className="h-[2.25rem] w-[2.25rem]"
          />
        </Link>
        {LEFT_NAV_ITEMS.map((navItem, key) => (
          <Link
            className="flex items-center p-3 2xl:p-5 2xl:ps-3 justify-start gap-5 h-14 w-auto hover:bg-neutral-500 rounded-full"
            href={navItem.url}
            key={key}
          >
            <Icon className="text-3xl" icon={navItem.icon} />
            <span className="hidden 2xl:block text-xl">{navItem.title}</span>
          </Link>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full w-10 p-7 h-10 2xl:w-full 2xl:h-[3rem] font-bold text-xl justify-self-end mt-5">
            <p className="hidden 2xl:block">Post</p>
            <Icon icon="ph:key-return" className="block 2xl:hidden !size-9" />
          </Button>
        </DialogTrigger>
        <CreatePostModal />
      </Dialog>
    </div>
  );
}
