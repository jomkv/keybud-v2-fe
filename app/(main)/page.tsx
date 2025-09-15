import PostCard from "@/components/cards/post-card";

export default function Home() {
  return (
    <div className="h-full flex flex-col divide-y divide-neutral-700">
      <div className="w-full">
        <PostCard />
      </div>
      <div className="w-full">
        <PostCard />
      </div>
      <div className="w-full">
        <PostCard />
      </div>
      <div className="w-full">
        <PostCard />
      </div>
      <div className="w-full">
        <PostCard />
      </div>
    </div>
  );
}
