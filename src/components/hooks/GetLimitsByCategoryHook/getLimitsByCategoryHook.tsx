import { useUserStore } from "@/zustand/UserStore.tsx";
import { useGetLimitsByCategory } from "@/lib/react-query/queries&Mutations.tsx";
import {useParams} from "react-router";

export const useGetLimitsByCategoryHook = () => {
  const { user } = useUserStore();
  const {walletId} = useParams()
  const { data: limits } = useGetLimitsByCategory(user?.id || "", walletId || "");

  return { limits };
};
