import {FormEvent, useEffect, useState } from "react";
import { useUserStore } from "@/zustand/UserStore.tsx";
import { useGetWalletHook } from "@/components/hooks/WalletHooks/getWalletHook.tsx";
import { useAddLimitByCategory } from "@/lib/react-query/queries&Mutations.tsx";
import { useHandleInputsHook } from "@/components/hooks/handleInputsHook/handleInputsHook.tsx";

export const useLimitByCategoryHook = () => {

  const [open, isOpen] = useState(false);
  const { user } = useUserStore();
  const { walletId } = useGetWalletHook();

  const { handleCategoryChange, handleInputChange, inputs } =
    useHandleInputsHook({
      category: "",
      icon: "",
      amount: 100,
    });

  const { category, icon, amount } = inputs;

  //handle change of category
  const {
    mutateAsync: addLimitByCategory,
    isPending: isAddingLimitByCategory,
    isSuccess: isAddingByLimitSuccess,
  } = useAddLimitByCategory();

  const handleAddLimit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return await addLimitByCategory({
      wallet: walletId as string,
      walletId: walletId as string,
      category: category as string,
      limit: Number(amount),
      icon: icon as string,
      userId: user?.id as string,
    });
  };

  useEffect(() => {
    if (isAddingByLimitSuccess) {
      isOpen(false);
    }
  }, [isAddingByLimitSuccess]);

  return {
    handleCategoryChange,
    handleInputChange,
    handleAddLimit,
    isAddingLimitByCategory,
    isAddingByLimitSuccess,
    open,
    isOpen,
    category,
    amount,
  };
};
