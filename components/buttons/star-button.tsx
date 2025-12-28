import React from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusApi } from "@/lib/api/status.api";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

interface StarButtonProps {
  statusId: number;
  isStarred: boolean;
  count: number;
  showCount?: boolean;
  isStatusPage?: boolean;
}

function StarButton({
  statusId,
  isStarred,
  count,
  showCount = true,
  isStatusPage = false,
}: StarButtonProps) {
  const queryClient = useQueryClient();

  const star = useMutation({
    mutationFn: () => statusApi.starStatus(statusId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["status", statusId],
      });
      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });
    },
  });

  const unstar = useMutation({
    mutationFn: () => statusApi.unstarStatus(statusId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["status", statusId],
      });
      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });
    },
  });

  const handleStar = async () => {
    try {
      await star.mutateAsync();
    } catch (error) {
      console.log(error);
      toast.warning("Something went wrong, please try again later");
    }
  };

  const handleUnstar = async () => {
    try {
      await unstar.mutateAsync();
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
    }
  };

  if (isStarred) {
    return (
      <Button
        variant="ghost"
        className="p-1"
        onClick={handleUnstar}
        disabled={unstar.isPending}
      >
        <Icon icon="ph:star-fill" style={{ color: "#8c53fe" }} />{" "}
        {showCount ? count : ""}
      </Button>
    );
  } else {
    return (
      <Button
        variant="ghost"
        className="p-1"
        onClick={handleStar}
        disabled={star.isPending}
      >
        <Icon icon="ph:star-bold" /> {showCount ? count : ""}
      </Button>
    );
  }
}

export default StarButton;
