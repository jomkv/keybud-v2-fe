import React from "react";
import ProfileCard from "../cards/profile-card";

export default function RightSidebar() {
  return (
    <div className="w-full h-full hidden 2xl:block">
      <ProfileCard />
    </div>
  );
}
