import { FormEvent, useEffect } from "react";
import { useParams } from "react-router";
import {useAddTransaction} from "@/lib/react-query/queries&Mutations.tsx";
import DialogLayout from "@/components/dialogLayout/DialogLayout.tsx";
import { IDialog } from "@/components/interfaces/interfaces.tsx";
import { UserProps, useUserStore } from "@/zustand/UserStore.tsx";
import { useGetWalletHook } from "@/components/hooks/WalletHooks/getWalletHook.tsx";
import {handleTransaction, uploadIcon} from "@/components/transactions/Functions.tsx";

const ExpenseDialog = ({
  handleInputChange,
  inputs,
  handleCategoryChange,
  setInputs,
  isOpen,
}: IDialog) => {

  const { walletId } = useParams();
  const { user } = useUserStore();
  const { wallet } = useGetWalletHook();

  const {
    mutateAsync: addTransaction,
    isSuccess: isTransactionSuccess,
    isPending: isTransactionPending,
  } = useAddTransaction();

  const { amount, description, category, icon } = inputs;

  const handleAddTransaction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    let iconUrl = icon;
    if (icon) {
      iconUrl = await uploadIcon(icon);
    }

    const handleAddExpense = await handleTransaction({
      currency: wallet?.currency,
      walletId: walletId as string,
      amount: amount,
      description: description,
      icon: iconUrl,
      category: category,
      user: user as UserProps,
      wallet: walletId as string,
      type: "expense",
      addFunction: addTransaction,
    });

    setInputs({
      amount: 100,
      description: "",
      category: "",
      icon: "",
    });

    return handleAddExpense;
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
      formHandleSubmit={handleAddTransaction}
      tabType="expense"
      isTransactionPending={isTransactionPending}
      defaultStatus="Add Expense"
      TransactionStatus="Adding Expense"
    />
  );
};

export default ExpenseDialog;
