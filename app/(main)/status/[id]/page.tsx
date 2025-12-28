"use client";

import React from "react";
import StatusSection from "@/app/(main)/status/[id]/components/sections/status-section";
import CommentsSection from "@/app/(main)/status/[id]/components/sections/comments-section";
import { useQuery } from "@tanstack/react-query";
import { statusApi } from "@/lib/api/status.api";
import { useParams } from "next/navigation";
import NotFound from "@/components/defaults/not-found";
import Loader from "@/components/defaults/loader";

function Status() {
  const { id } = useParams<{ id: string }>();
  const statusId = Number(id);

  const statusWithRelations = useQuery({
    queryKey: ["status", statusId],
    queryFn: () => statusApi.getStatus(+id),
    enabled: Number.isFinite(statusId),
  });

  if (statusWithRelations.isError)
    return (
      <NotFound
        topic="Status"
        description="Status does not exist or was deleted."
      />
    );
  if (statusWithRelations.isLoading) return <Loader size={50} />;

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
