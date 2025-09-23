import React from "react";
import ProfileCard from "@/components/cards/profile-card";

export default function RightSidebar() {
  return (
    <div className="w-full h-full hidden xl:block">
      <ProfileCard />
    </div>
  );
}
