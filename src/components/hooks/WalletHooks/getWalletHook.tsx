import { useParams } from "react-router";
import { useGetWallet } from "@/lib/react-query/queries&Mutations.tsx";

export const useGetWalletHook = () => {
  const { walletId } = useParams();
  const { data: wallet } = useGetWallet(walletId || "");

  return { walletId, wallet };
};
