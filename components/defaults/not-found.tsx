interface NotFoundProps {
  topic: string;
  description?: string;
}

function NotFound({ topic, description }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3 h-full">
      <div className="text-4xl font-bold">{topic} not found</div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}

export default NotFound;
