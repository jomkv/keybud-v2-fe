"use client";

import React, { useState } from "react";
import ProfileTab from "@/app/(main)/[username]/components/tabs/profile-tab";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { userApi } from "@/lib/api/user.api";
import Loader from "@/components/defaults/loader";
import { UserProfileTab } from "@/@types/user";
import StatusCard from "@/components/cards/status-card";

function Profile() {
  const [tab, setTab] = useState<UserProfileTab>("posts");

  const { username } = useParams<{ username: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["profile", username, tab],
    queryFn: () => userApi.getProfile(username, tab),
  });

  if (isLoading) return <Loader size={50} />;

  return (
    <>
      <ProfileTab tab={tab} setTab={setTab} />

      {data &&
        data.map((status, idx) => <StatusCard key={idx} status={status} />)}
    </>
  );
}

export default Profile;
