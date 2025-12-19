import { useAppSelector } from "@/store/hooks";

export const useUser = () => useAppSelector((state) => state.user.user);
