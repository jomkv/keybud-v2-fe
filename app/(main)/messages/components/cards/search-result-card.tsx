import { User } from "@/@types/user";
import { Check } from "lucide-react";

interface SearchResultCardProps {
  user: User;
  handleClick: (user: User) => void;
  selectedUser: User | null;
}

function SearchResultCard({
  user,
  handleClick,
  selectedUser,
}: SearchResultCardProps) {
  return (
    <div
      className="flex items-center hover:bg-slate-800 px-6 py-2 cursor-pointer"
      onClick={() => handleClick(user)}
    >
      <img src="/assets/user_icon.png" className="rounded-full w-12 h-12" />
      <div className="flex flex-1 flex-col ml-3">
        <p className="font-semibold">{user.username}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
      <div
        className={`w-5 h-5 rounded-full border-2 ${
          selectedUser?.id === user.id
            ? "border-white bg-white"
            : "border-gray-500"
        }`}
      >
        {selectedUser?.id === user.id && (
          <Check className="w-4 h-4 text-black" />
        )}
      </div>
    </div>
  );
}

export default SearchResultCard;
