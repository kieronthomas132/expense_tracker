import { FormEvent, useEffect } from "react";
import {useAddIncome} from "@/lib/react-query/queries&Mutations.tsx";
import { useParams } from "react-router";
import DialogLayout from "@/components/dialogLayout/DialogLayout.tsx";
import {IDialog} from "@/components/interfaces/interfaces.tsx";
import {UserProps, useUserStore} from "@/zustand/UserStore.tsx";
import {useGetWalletHook} from "@/components/hooks/WalletHooks/getWalletHook.tsx";
import {handleTransaction, uploadIcon} from "@/components/transactions/Functions.tsx";

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

  const handleAddTransaction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let iconUrl = icon;
    if (icon) {
      iconUrl = await uploadIcon(icon);
    }

    const handleAddIncome =  await handleTransaction({
      currency: wallet?.currency,
      walletId: walletId as string,
      amount: amount,
      description: description,
      icon: iconUrl,
      category: category,
      user: user as UserProps,
      wallet: walletId as string,
      type: "income",
      addFunction: addIncome,
    });

    setInputs({
      amount: 100,
      description: "",
      category: "",
      icon: "",
    });
    return handleAddIncome
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
      tabType="income"
      isTransactionPending={isTransactionPending}
      defaultStatus="Add Income"
      TransactionStatus="Adding Income"
    />
  );
};

export default IncomeDialog;
