import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const LEFT_NAV_ITEMS: {
  icon: string;
  url: string;
  title: string;
}[] = [
  {
    title: "Home",
    url: "#",
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
    title: "Settings",
    url: "#",
    icon: "ph:gear",
  },
];

export default function LeftSidebar() {
  return (
    <div className="flex flex-col gap-5 items-end h-full w-full">
      <Link
        className="flex items-center justify-start gap-4 h-10 w-auto 2xl:w-full"
        href={"/"}
      >
        <img src="/assets/Logo_Acronym.svg" className="w-[40px]" />
      </Link>
      {LEFT_NAV_ITEMS.map((navItem, key) => (
        <Link
          className="flex items-center justify-start gap-5 h-10 w-auto 2xl:w-full"
          href={navItem.url}
          key={key}
        >
          <Icon height={40} icon={navItem.icon} />
          <span className="hidden 2xl:block text-xl">{navItem.title}</span>
        </Link>
      ))}
      <Button className="rounded-full w-10 h-10 2xl:w-full 2xl:h-[3rem] font-bold text-xl">
        <p className="hidden 2xl:block">Post</p>
        <Icon icon="ph:key-return" className="block 2xl:hidden text-5xl" />
      </Button>
    </div>
  );
}
