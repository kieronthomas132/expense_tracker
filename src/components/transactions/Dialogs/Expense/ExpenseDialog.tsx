import {FormEvent, useEffect} from "react";
import { useParams } from "react-router";
import {useAddTransaction} from "@/lib/react-query/queries&Mutations.tsx";
import DialogLayout from "@/components/dialogLayout/DialogLayout.tsx";
import {IDialog} from "@/components/interfaces/interfaces.tsx";
import {useUserStore} from "@/zustand/UserStore.tsx";
import {useGetWalletHook} from "@/components/hooks/WalletHooks/getWalletHook.tsx";

const ExpenseDialog = ({
  handleInputChange,
  inputs,
  handleCategoryChange,
  setInputs,
  isOpen,
}: IDialog) => {

  const { walletId } = useParams();
  const {user} = useUserStore();
  const {wallet} = useGetWalletHook();

  const { mutateAsync: addTransaction, isSuccess: isTransactionSuccess, isPending: isTransactionPending } =
    useAddTransaction();

  const { amount, description, category, icon } = inputs;

  const handleAddTransaction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (walletId) {
      const newTransaction = await addTransaction({
        walletId: walletId,
        transaction: {
          amount: Number(amount),
          description: description,
          icon: icon,
          category: category,
          wallet: walletId,
          walletId: walletId,
          event: new Date(Date.now()),
          type: "expense",
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
      return newTransaction;
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
      formHandleSubmit={handleAddTransaction}
      tabType="expense"
      isTransactionPending={isTransactionPending}
      defaultStatus="Add Expense"
      TransactionStatus="Adding Expense"
    />
  );
};

export default ExpenseDialog;
