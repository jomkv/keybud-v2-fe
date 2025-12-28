import { User } from "./user";

export interface Message {
  id: number;
  senderId: number;
  conversationId: number;
  content: string;
  createdAt: string;
  readAt: string | null;
}

export interface ConversationMember {
  id: number;
  conversationId: number;
  userId: number;
  joinedAt: string;
  isAdmin: boolean;
  user: Pick<User, "username" | "email">;
}

export interface Conversation {
  id: number;
  type: "DIRECT" | "GROUP";
  name: string | null;
  createdAt: string;
  members: ConversationMember[];
  messages: Message[];
}
