"use client";

import LeftSidebar from "@/app/(main)/components/sidebars/left-sidebar";
import RightSidebar from "@/app/(main)/components/sidebars/right-sidebar";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();

  // If the user is undefined (still hydrating from Redux), show spinner
  if (user === undefined) {
    return <div className="h-screen bg-black" />;
  }

  // If no user exists after hydration, redirect to login
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex justify-center min-h-screen relative">
      <div className="min-w-[5rem] max-w-[20rem] w-[calc(25vw-10rem)] sticky top-0 h-screen py-5 flex-shrink-0 overflow-y-auto">
        <LeftSidebar />
      </div>
      <div className="flex-1 max-w-[60rem] min-w-[20rem] min-h-screen border-s-[1px] border-e-[1px] border-solid border-neutral-700 flex flex-col divide-y divide-neutral-700 relative">
        {children}
      </div>
      <div className="min-w-0 xl:min-w-[20rem] max-w-[25rem] xl:w-[calc(25vw-5rem)] hidden lg:block sticky top-0 h-screen p-5 flex-shrink-0">
        <RightSidebar />
      </div>
    </div>
  );
}
