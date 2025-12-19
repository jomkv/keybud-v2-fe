"use client";

import { StatusPayload } from "@/@types/status";
import StatusCard from "@/components/cards/status-card";
import { statusApi } from "@/lib/api/status.api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { refresh } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (refresh && refresh === "true") {
      router.refresh();
    }
  }, []);

  const statuses = useQuery({
    queryKey: ["statuses"],
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
