import StatusCard from "@/components/cards/status-card";
import React from "react";
import ProfileTab from "@/app/(main)/[username]/components/tabs/profile-tab";

function Profile() {
  return (
    <>
      <ProfileTab />
      <StatusCard />
      <StatusCard />
      <StatusCard />
      <StatusCard />
      <StatusCard />
      <StatusCard />
      <StatusCard />
    </>
  );
}

export default Profile;
