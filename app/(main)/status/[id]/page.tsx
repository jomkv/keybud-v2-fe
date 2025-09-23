import React from "react";
import StatusSection from "@/app/(main)/status/[id]/components/sections/status-section";
import CommentsSection from "@/app/(main)/status/[id]/components/sections/comments-section";

function Status() {
  return (
    <>
      <StatusSection />
      <CommentsSection />
    </>
  );
}

export default Status;
