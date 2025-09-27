import MessageBubbleIncoming from "@/app/(main)/messages/[id]/components/bubbles/message-bubble-incoming";
import MessageBubbleOutgoing from "@/app/(main)/messages/[id]/components/bubbles/message-bubble-outgoing";
import SendMessageForm from "@/app/(main)/messages/[id]/components/forms/send-message-form";
import MessageHeader from "@/app/(main)/messages/[id]/components/headers/message-header";

function Message() {
  return (
    <>
      {/* Sticky Header */}
      <MessageHeader />

      {/* Messages */}
      <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto min-h-0">
        <MessageBubbleIncoming
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          corporis quaerat vel dolore quidem reiciendis ipsum cupiditate at,
          quibusdam ipsam explicabo nostrum perferendis laborum officia nulla
          voluptatibus ut consequatur aliquam! Quibusdam ipsam explicabo nostrum
          perferendis laborum officia nulla voluptatibus ut consequatur aliquam!"
        />
        <MessageBubbleIncoming message="hello world" />
        <MessageBubbleIncoming message="hello world" />
        <MessageBubbleOutgoing message="wassupp" />
        <MessageBubbleOutgoing
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          corporis quaerat vel dolore quidem reiciendis ipsum cupiditate at,
          quibusdam ipsam explicabo nostrum perferendis laborum officia nulla
          voluptatibus ut consequatur aliquam! Quibusdam ipsam explicabo nostrum
          perferendis laborum officia nulla voluptatibus ut consequatur aliquam!"
        />
        <MessageBubbleIncoming
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          corporis quaerat vel dolore quidem reiciendis ipsum cupiditate at,
          quibusdam ipsam explicabo nostrum perferendis laborum officia nulla
          voluptatibus ut consequatur aliquam! Quibusdam ipsam explicabo nostrum
          perferendis laborum officia nulla voluptatibus ut consequatur aliquam!"
        />
        <MessageBubbleIncoming message="hello world" />
        <MessageBubbleIncoming message="hello world" />
        <MessageBubbleOutgoing message="wassupp" />
        <MessageBubbleOutgoing
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          corporis quaerat vel dolore quidem reiciendis ipsum cupiditate at,
          quibusdam ipsam explicabo nostrum perferendis laborum officia nulla
          voluptatibus ut consequatur aliquam! Quibusdam ipsam explicabo nostrum
          perferendis laborum officia nulla voluptatibus ut consequatur aliquam!"
        />
      </div>

      {/* Sticky Bottom Form */}
      <SendMessageForm />
    </>
  );
}

export default Message;
