import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { userApi } from "@/lib/api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface FollowAuthorButtonProps {
  userId: number;
  isFollowing: boolean;
}

function FollowUserButton({ userId, isFollowing }: FollowAuthorButtonProps) {
  const user = useUser();
  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationFn: () => userApi.follow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["status"],
      });
    },
  });

  const unfollow = useMutation({
    mutationFn: () => userApi.unfollow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["status"],
      });
    },
  });

  const handleFollow = async () => {
    try {
      await follow.mutateAsync();
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollow.mutateAsync();
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
    }
  };

  if (user?.id === userId) return null;

  if (isFollowing) {
    return (
      <Button
        className="rounded-full text-md font-semibold"
        size="sm"
        variant="outline"
        onClick={handleUnfollow}
        disabled={unfollow.isPending}
      >
        Unfollow
      </Button>
    );
  } else {
    return (
      <Button
        className="rounded-full text-md font-semibold"
        size="sm"
        variant="default"
        onClick={handleFollow}
        disabled={follow.isPending}
      >
        Follow
      </Button>
    );
  }
}

export default FollowUserButton;
