import { FormEvent, useEffect } from "react";
import {useAddIncome} from "@/lib/react-query/queries&Mutations.tsx";
import { useParams } from "react-router";
import DialogLayout from "@/components/dialogLayout/DialogLayout.tsx";
import {IDialog} from "@/components/interfaces/interfaces.tsx";
import {useUserStore} from "@/zustand/UserStore.tsx";
import {useGetWalletHook} from "@/components/hooks/WalletHooks/getWalletHook.tsx";

const IncomeDialog = ({
  handleInputChange,
  inputs,
  handleCategoryChange,
  setInputs,
  isOpen,
}: IDialog) => {

  const { walletId } = useParams();
  const {user} = useUserStore();
  const {wallet} = useGetWalletHook()

  const {
    mutateAsync: addIncome,
    isPending: isTransactionPending,
    isSuccess: isTransactionSuccess,
  } = useAddIncome();

  const { amount, description, category, icon } = inputs;

  const handleAddIncome = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (walletId) {
      const newIncome = await addIncome({
        walletId: walletId,
        transaction: {
          amount: Number(amount),
          description: description,
          icon: icon,
          category: category,
          wallet: walletId,
          walletId: walletId,
          event: new Date(Date.now()),
          type: "income",
          userId: user?.id,
          currency: wallet?.currency
        },
      });
      setInputs({
        amount: 100,
        description: "",
        category: "",
        icon: "",
      });
      return newIncome;
    }
  };

  useEffect(() => {
    if (isTransactionSuccess) {
      isOpen(false);
    }
  }, [isTransactionSuccess, isOpen]);

  return (
    <DialogLayout
      amountLabel="Amount"
      amountValue={amount}
      amountOnChange={handleInputChange}
      descriptionLabel="Description"
      descriptionValue={description}
      descriptionOnChange={handleInputChange}
      categoryLabel="Category"
      categoryValue={category}
      categoryOnChange={handleCategoryChange}
      formHandleSubmit={handleAddIncome}
      tabType="income"
      isTransactionPending={isTransactionPending}
      defaultStatus="Add Income"
      TransactionStatus="Adding Income"
    />
  );
};

export default IncomeDialog;
