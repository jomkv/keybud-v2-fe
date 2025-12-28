import React from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusApi } from "@/lib/api/status.api";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

interface RepostButtonProps {
  statusId: number;
  isReposted: boolean;
  count: number;
  showCount?: boolean;
  isStatusPage?: boolean;
}

function RepostButton({
  statusId,
  isReposted,
  count,
  showCount = true,
  isStatusPage = false,
}: RepostButtonProps) {
  const queryClient = useQueryClient();

  const repost = useMutation({
    mutationFn: () => statusApi.repostStatus(statusId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["status", statusId],
      });
      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });
    },
  });

  const unrepost = useMutation({
    mutationFn: () => statusApi.unrepostStatus(statusId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["status", statusId],
      });
      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });
    },
  });

  const handleRepost = async () => {
    try {
      await repost.mutateAsync();
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
    }
  };

  const handleUnrepost = async () => {
    try {
      await unrepost.mutateAsync();
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
    }
  };

  if (isReposted) {
    return (
      <Button
        variant="ghost"
        className="p-1"
        onClick={handleUnrepost}
        disabled={unrepost.isPending}
      >
        <Icon icon="ph:arrows-left-right-bold" style={{ color: "#8c53fe" }} />{" "}
        {showCount ? count : ""}
      </Button>
    );
  } else {
    return (
      <Button
        variant="ghost"
        className="p-1"
        onClick={handleRepost}
        disabled={repost.isPending}
      >
        <Icon icon="ph:arrows-left-right-bold" /> {showCount ? count : ""}
      </Button>
    );
  }
}

export default RepostButton;
