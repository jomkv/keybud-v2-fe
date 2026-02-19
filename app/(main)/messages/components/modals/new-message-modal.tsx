import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User } from "@/@types/user";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/lib/api/search.api";
import SearchResultCard from "../cards/search-result-card";
import Loader from "@/components/defaults/loader";

interface NewMessageModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCreate: (memberIds: number[]) => Promise<void>;
}

export default function NewMessageModal({
  open,
  setOpen,
  handleCreate,
}: NewMessageModalProps) {
  const [showSuggested, setShowSuggested] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const { data: suggestedUsers, isLoading: isSuggestedLoading } = useQuery({
    queryKey: ["suggested-users"],
    queryFn: () => searchApi.searchSuggestedUser(),
  });

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ["search-users", debouncedQuery],
    queryFn: () => searchApi.searchUser(searchQuery),
    enabled: debouncedQuery.length > 0, // Only fetch when there's a query
  });

  useEffect(() => {
    setShowSuggested(!(searchQuery.length > 0));
  }, [searchQuery]);

  useEffect(() => {
    setSelectedUser(null);
  }, [debouncedQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="flex items-center ps-6 pe-6">
          <p className="font-semibold">To:</p>
          <Input
            className="flex-1 !border-0 focus-visible:!ring-0"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {showSuggested && <p className="font-semibold ps-6 pe-6">Suggested</p>}

        <div className="flex flex-col gap-0 max-h-[25rem] overflow-y-auto">
          {showSuggested && isSuggestedLoading && (
            <Loader size={50} className="m-5" />
          )}

          {!showSuggested && isSearchLoading && (
            <Loader size={50} className="m-5" />
          )}
          {showSuggested &&
            suggestedUsers &&
            suggestedUsers.map((user) => (
              <SearchResultCard
                key={user.id}
                user={user}
                handleClick={setSelectedUser}
                selectedUser={selectedUser}
              />
            ))}

          {!showSuggested &&
            searchResults &&
            searchResults.length > 0 &&
            searchResults?.map((user) => (
              <SearchResultCard
                key={user.id}
                user={user}
                handleClick={setSelectedUser}
                selectedUser={selectedUser}
              />
            ))}

          {!showSuggested && searchResults && searchResults.length == 0 && (
            <p className="text-center py-3 font-bold text-2xl">
              User not found
            </p>
          )}
        </div>

        <Button
          className="m-6 mt-0 font-semibold"
          disabled={selectedUser == null}
          onClick={() => handleCreate([selectedUser?.id as number])}
        >
          Chat
        </Button>
      </DialogContent>
    </Dialog>
  );
}
