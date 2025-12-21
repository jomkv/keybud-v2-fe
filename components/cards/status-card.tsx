"use client";

import { Button } from "@/components/ui/button";
import { Ellipsis, MessageSquare, Repeat2, Star } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { S3Attachment, StatusPayload } from "@/@types/status";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { ConfirmModal } from "../modals/confirm-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { statusApi } from "@/lib/api/status.api";
import { toast } from "sonner";
import EditStatusModal from "../modals/edit-status-modal";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
interface StatusCardProps {
  status: StatusPayload;
}

export function StatusAttachments({
  attachments,
}: {
  attachments: S3Attachment[];
}) {
  if (attachments.length === 1) {
    return (
      <div className="w-full aspect-square my-2 overflow-hidden rounded-lg bg-neutral-800 flex items-center justify-center">
        <img
          src={attachments[0].signedUrl}
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
    );
  } else if (attachments.length === 2) {
    return (
      <div className="w-full aspect-3/2 my-2 grid grid-cols-2 gap-1 overflow-hidden rounded-lg">
        {attachments.map((attachment, i) => (
          <img
            key={i}
            src={attachment.signedUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        ))}
      </div>
    );
  } else if (attachments.length === 3) {
    return (
      <div className="w-full aspect-square my-2 grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        {/* Left tall image */}
        <div className="row-span-2 col-span-1 relative overflow-hidden">
          <img
            src={attachments[0].signedUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        {/* Top right */}
        <div className="col-span-1 relative overflow-hidden">
          <img
            src={attachments[1].signedUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        {/* Bottom right */}
        <div className="col-span-1 relative overflow-hidden">
          <img
            src={attachments[2].signedUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    );
  } else if (attachments.length === 4) {
    return (
      <div className="w-full aspect-square my-2 grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        {attachments.map((attachment, i) => (
          <div
            key={i}
            className="relative w-full h-full aspect-square overflow-hidden"
          >
            <img
              src={attachment.signedUrl}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

function StatusCard({ status }: StatusCardProps) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useUser();

  const deleteStatus = useMutation({
    mutationFn: statusApi.deleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });
    },
  });

  const handleDelete = async () => {
    try {
      const res = await deleteStatus.mutateAsync(status.id);

      setIsDeleteOpen(false);
      toast.success("Post deleted");
    } catch (error) {
      toast.warning("Something went wrong, please try again later");
    }
  };

  const onBodyClick = () => {
    router.push(`/status/${status.id}`);
  };

  return (
    <div className="flex p-4 gap-2">
      <img
        src="/assets/user_icon.png"
        className="rounded-full w-12 h-12 mt-3"
      />

      {/* Body */}
      <div className="flex-1 flex flex-col" onClick={onBodyClick}>
        {/* Header (username, date, settings btn) */}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link href="/johndoe">
              <p className="font-semibold text-lg hover:underline">
                @{status.user.username}
              </p>
            </Link>
            <p className="font-light text-gray-400">·</p>
            <p className="font-light text-gray-400">
              {formatDate(status.createdAt)}
            </p>
          </div>
          {user?.id === status.userId && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Pin</DropdownMenuItem>

                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Title */}
        <p className="text-xl font-bold">{status.title}</p>

        {/* Description */}
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: status.description }}
        />

        {/* Assets (img, vid, audio) */}
        <StatusAttachments attachments={status.attachments} />

        {/* Footer */}
        <div className="flex gap-5" onClick={(e) => e.stopPropagation()}>
          {/* Comment */}
          <Button variant="ghost" className="p-1">
            <MessageSquare /> {status._count.comments}
          </Button>

          {/* Repost */}
          <Button variant="ghost" className="p-1">
            <Repeat2 /> {status._count.reposts}
          </Button>

          {/* Star */}
          <Button variant="ghost" className="p-1">
            <Star /> {status._count.stars}
          </Button>
        </div>
      </div>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <ConfirmModal
          title={`Delete "${status.title}"`}
          description={`Are you sure you want to delete this post?`}
          handleConfirm={handleDelete}
          isConfirming={deleteStatus.isPending}
        />
      </Dialog>
      <EditStatusModal
        open={isEditOpen}
        setOpen={setIsEditOpen}
        status={status}
      />
    </div>
  );
}

export default StatusCard;
