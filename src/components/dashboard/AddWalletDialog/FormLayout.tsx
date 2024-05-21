import InputLayout from "@/components/dashboard/AddWalletDialog/InputLayout.tsx";
import { Label } from "@/components/ui/label.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { useUserStore } from "@/zustand/UserStore.tsx";
import { useAddNewWallet } from "@/lib/react-query/queries&Mutations.tsx";
import { useHandleInputsHook } from "@/components/hooks/handleInputsHook/handleInputsHook.tsx";
import SelectLayout from "@/components/dialogLayout/SelectLayout.tsx";
import { currencies } from "@/components/arrays/currenciesArray.tsx";

const FormLayout = ({
  isOpen,
}: {
  isOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  //fetch user data
  const { user } = useUserStore();

  //set input initial states
  const { handleInputChange, inputs, handleCurrencyChange } =
    useHandleInputsHook({
      name: "",
      currency: "GBP",
      balance: 100,
    });

  //destructure input properties
  const { name, currency, balance } = inputs;

  //function to add use add new wallet and handle success state
  const { mutateAsync: addNewWallet, isSuccess: hasAddedNewWallet, isPending: isAddingNewWallet } =
    useAddNewWallet();

  //function to add new wallet
  const handleAddNewWallet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newWallet = await addNewWallet({
      name: name as string,
      currency: currency as string,
      balance: Number(balance),
      user: user?.id,
      userId: user?.id,
    });

    if (!newWallet) {
      throw new Error();
    }
  };

  //close the dialog after successful wallet is c
  useEffect(() => {
    if (hasAddedNewWallet) {
      isOpen(false);
    }
  }, [hasAddedNewWallet, isOpen]);

  return (
    <form onSubmit={handleAddNewWallet} className="grid gap-4 py-4 text-white">
      <InputLayout
        label="Name"
        name="name"
        type="type"
        value={name}
        onChange={handleInputChange}
        id="name"
        htmlFor="name"
      />
      <div className="grid w-full grid-cols-4 justify-center items-center gap-4">
        <Label htmlFor="currency" className="text-right text-white">
          Currency
        </Label>
        <SelectLayout
          defaultValue={"GBP"}
          name={"currency"}
          currencies={currencies}
          onValueChange={handleCurrencyChange}
        />
      </div>
      <InputLayout
        label="Balance"
        name="balance"
        type="number"
        value={balance}
        onChange={handleInputChange}
        id="name"
        htmlFor="balance"
      />
      <DialogFooter>
        <Button type="submit" className="bg-white text-black hover:bg-white">
            {isAddingNewWallet ? "Adding new Wallet" : "Add new Wallet"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default FormLayout;
