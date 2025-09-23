"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateStatusModal from "@/app/(main)/components/modals/create-status-modal";
import { Page } from "@/@types/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPage } from "@/store/slices/navigationSlice";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LEFT_NAV_ITEMS: {
  icon: string;
  url: string;
  title: string;
  value: Page | null;
}[] = [
  {
    title: "Home",
    url: "/",
    icon: "ph:house",
    value: "home",
  },
  {
    title: "Messages",
    url: "/messages",
    icon: "ph:envelope-simple",
    value: "messages",
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: "ph:bell-simple",
    value: "notifications",
  },
  {
    title: "Search",
    url: "/search",
    icon: "ph:magnifying-glass",
    value: "search",
  },
  {
    title: "Profile",
    url: "/johndoe",
    icon: "ph:user",
    value: "profile",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: "ph:gear",
    value: "settings",
  },
  {
    title: "Logout",
    url: "#",
    icon: "ph:arrow-line-right",
    value: null,
  },
];

export default function LeftSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector(
    (state: RootState) => state.navigation
  );

  const handleNavClick = (value: Page | null) => {
    if (value === null) return;

    dispatch(setPage(value));
  };

  useEffect(() => {
    let page: Page;

    if (pathname === "/") {
      page = "home";
    } else if (pathname === "/messages") {
      page = "messages";
    } else if (pathname === "/notifications") {
      page = "notifications";
    } else if (pathname === "/search") {
      page = "search";
    } else if (pathname === "/settings") {
      page = "settings";
    } else if (pathname.startsWith("/status/")) {
      page = "status";
    } else {
      page = "profile";
    }

    dispatch(setPage(page));
  }, []);

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-3 items-end 2xl:items-start">
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
            className={`flex items-center p-3 2xl:p-5 2xl:ps-3 justify-start gap-5 h-14 w-auto hover:bg-neutral-500 rounded-full ${cn(
              currentPage === navItem.value ? "font-bold" : ""
            )}`}
            href={navItem.url}
            key={key}
            onClick={() => handleNavClick(navItem.value)}
          >
            <Icon
              key={key}
              className="text-3xl"
              icon={
                currentPage === navItem.value
                  ? `${navItem.icon}-fill`
                  : navItem.icon
              }
            />
            <span className="hidden 2xl:block text-xl">{navItem.title}</span>
          </Link>
        ))}
      </div>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full w-10 p-7 h-10 2xl:w-full 2xl:h-[3rem] font-bold text-xl mt-5">
              <p className="hidden 2xl:block">Post</p>
              <Icon icon="ph:key-return" className="block 2xl:hidden !size-9" />
            </Button>
          </DialogTrigger>
          <CreateStatusModal />
        </Dialog>
      </div>
    </div>
  );
}
