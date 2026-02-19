import { Conversation, Message } from "@/@types/conversation";
import { apiInstance } from "./api";

export const conversationApi = {
  async getAllConversations(): Promise<Conversation[]> {
    const res = await apiInstance.get<{ data: Conversation[] }>(
      "/api/conversation",
    );

    return res.data.data;
  },

  async getConversation(
    conversationId: number,
    reset: boolean = false,
  ): Promise<{ conversation: Conversation; messages: Message[] }> {
    const res = await apiInstance.get<{
      data: { conversation: Conversation; messages: Message[] };
    }>(`/api/conversation/${conversationId}${reset ? "?reset=true" : ""}`);

    return res.data.data;
  },

  async createConversation(members: number[]) {
    const res = await apiInstance.post<{
      data: Omit<Conversation, "members" | "messages">;
    }>("/api/conversation", {
      memberIds: members,
    });

    return res.data.data;
  },

  async createMessage(content: string, conversationId: number): Promise<void> {
    const res = await apiInstance.post<{ data: Message }>("/api/message", {
      conversationId: String(conversationId),
      content: content,
    });

    return;
  },
};
