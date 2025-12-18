"use client";

import React from "react";
import StatusSection from "@/app/(main)/status/[id]/components/sections/status-section";
import CommentsSection from "@/app/(main)/status/[id]/components/sections/comments-section";
import { useQuery } from "@tanstack/react-query";
import { statusApi } from "@/lib/api/status.api";
import { useParams } from "next/navigation";

function Status() {
  const { id } = useParams<{ id: string }>();

  const statusWithRelations = useQuery({
    queryKey: ["status"],
    queryFn: () => statusApi.getStatus(+id),
  });

  return (
    <>
      {statusWithRelations.isSuccess && (
        <>
          <StatusSection status={statusWithRelations.data.status} />
          <CommentsSection
            comments={statusWithRelations.data.childrenStatuses}
          />
        </>
      )}
    </>
  );
}

export default Status;
