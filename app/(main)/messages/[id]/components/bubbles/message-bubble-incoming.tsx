interface MessageBubbleIncomingProps {
  message: string;
}

function MessageBubbleIncoming({ message }: MessageBubbleIncomingProps) {
  return (
    <div className="w-full flex justify-start">
      <div className="rounded-3xl rounded-bl-md bg-slate-600 max-w-[90%] md:max-w-[60%] p-3 text-wrap">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageBubbleIncoming;
