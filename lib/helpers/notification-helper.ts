import { NewNotificationPayload } from "@jomkv/keybud-v2-contracts";

export type GroupedNotification = {
  type: string;
  statusId?: number;
  senders: Array<{ userId: number; username: string; bio?: string }>;
  status?: { id: number; title?: string; description: string };
  latestCreatedAt: Date;
  notificationIds: number[];
  recipientId: number;
};

export function groupNotifications(
  notifications: NewNotificationPayload[],
): GroupedNotification[] {
  const groupMap = new Map<string, GroupedNotification>();

  // Sort newest first so latestCreatedAt is correct
  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  for (const notif of sorted) {
    // Group key: same type + same target (statusId or just "follow")
    const key =
      notif.type === "USER_FOLLOW"
        ? `USER_FOLLOW`
        : `${notif.type}_${notif.status?.id}`;

    if (groupMap.has(key)) {
      const group = groupMap.get(key)!;
      // Avoid duplicate senders
      if (!group.senders.find((s) => s.userId === notif.sender.userId)) {
        group.senders.push(notif.sender);
      }
      group.notificationIds.push(notif.notificationId);
      if (new Date(notif.createdAt) > new Date(group.latestCreatedAt)) {
        group.latestCreatedAt = new Date(notif.createdAt);
      }
    } else {
      groupMap.set(key, {
        type: notif.type,
        statusId: notif.status?.id,
        senders: [notif.sender],
        status: notif.status,
        latestCreatedAt: new Date(notif.createdAt),
        notificationIds: [notif.notificationId],
        recipientId: notif.recipientId,
      });
    }
  }

  return Array.from(groupMap.values()).sort(
    (a, b) =>
      new Date(b.latestCreatedAt).getTime() -
      new Date(a.latestCreatedAt).getTime(),
  );
}

export function formatSenderText(
  senders: GroupedNotification["senders"],
): string {
  if (senders.length === 1) return senders[0].username;
  if (senders.length === 2)
    return `${senders[0].username} and ${senders[1].username}`;
  return `${senders[0].username} and ${senders.length - 1} others`;
}
