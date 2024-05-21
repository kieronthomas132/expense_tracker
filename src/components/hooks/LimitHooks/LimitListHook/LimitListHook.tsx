import { useGetWalletHook } from "@/components/hooks/WalletHooks/getWalletHook.tsx";
import { useState } from "react";
import { useDeleteLimitByCategory } from "@/lib/react-query/queries&Mutations.tsx";

export const LimitListHook = (category: string, limit: string, $id: string) => {
  const [selectedLimit, setSelectedLimit] = useState<string | null>(null);

  const { mutateAsync: deleteLimit, isPending: isDeletingLimit } =
    useDeleteLimitByCategory();

  const { wallet } = useGetWalletHook();


  const filteredCategory = wallet?.transactions.filter(
    (transaction: { category: string; type: string }) =>
      transaction.category === category && transaction.type === "expense",
  );

  const totalAmountByCategory = filteredCategory.reduce(
    (acc: number, transaction: { amount: number }) => acc + transaction.amount,
    0,
  );

  const percentageUsed = (totalAmountByCategory / Number(limit)) * 100;
  const remaining = Number(limit) - totalAmountByCategory;

  const handleClick = () => {
    setSelectedLimit((prevLimit) => (prevLimit === $id ? null : $id));
  };
  const handleDeleteLimit = async () => {
    return await deleteLimit($id);
  };

  return {
    filteredCategory,
    totalAmountByCategory,
    percentageUsed,
    remaining,
    selectedLimit,
    setSelectedLimit,
    handleClick,
    handleDeleteLimit,
    isDeletingLimit,
  };
};
