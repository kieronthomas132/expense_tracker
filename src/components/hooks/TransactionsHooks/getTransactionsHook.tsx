import { useGetTransactions } from "@/lib/react-query/queries&Mutations.tsx";
import { useParams } from "react-router";

export const useGetTransctionsHooks = () => {
  const { walletId } = useParams();
  const { data: transactions } = useGetTransactions(walletId || "");

  return { transactions };
};
