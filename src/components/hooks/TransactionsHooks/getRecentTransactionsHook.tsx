import { useGetRecentTransactions } from "@/lib/react-query/queries&Mutations.tsx";
import { useUserStore } from "@/zustand/UserStore.tsx";

export const useGetRecentTransactionsHook = () => {
  const { user } = useUserStore();
  const { data: transactions } = useGetRecentTransactions(user?.id || "");

  return { transactions };
};
