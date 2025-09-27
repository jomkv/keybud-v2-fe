interface MessageBubbleOutgoingProps {
  message: string;
}

function MessageBubbleOutgoing({ message }: MessageBubbleOutgoingProps) {
  return (
    <div className="w-full flex justify-end">
      <div className="rounded-3xl rounded-br-md bg-[#8c53fe] max-w-[90%] md:max-w-[60%] p-3 text-wrap">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageBubbleOutgoing;
