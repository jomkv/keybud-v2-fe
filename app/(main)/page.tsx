"use client";

import { StatusPayload } from "@/@types/status";
import StatusCard from "@/components/cards/status-card";
import { statusApi } from "@/lib/api/status.api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const statuses = useQuery({
    queryKey: ["status"],
    queryFn: statusApi.getAllStatus,
  });

  return (
    <>
      {statuses.isSuccess && (
        <>
          {statuses.data.map((status: StatusPayload, index) => (
            <StatusCard key={status.id} status={status} />
          ))}
        </>
      )}
    </>
  );
}
