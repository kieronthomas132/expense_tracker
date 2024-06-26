import { TabsContent } from "@/components/ui/tabs.tsx";
import { Label } from "@/components/ui/label.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTransferBetweenAccounts } from "@/lib/react-query/queries&Mutations.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect, useState,
} from "react";
import TransferSelects from "@/components/transactions/Dialogs/TransferBetweenAccounts/TransferSelects.tsx";
import { useHandleInputsHook } from "@/components/hooks/handleInputsHook/handleInputsHook.tsx";

const TransferDialog = ({
  isOpen,
}: {
  isOpen: Dispatch<SetStateAction<boolean>>;
}) => {

  const [error, setError] = useState<string | null>(null);

  const {
    mutateAsync: transferBetweenAccounts,
    isPending: isTransferring,
    isSuccess: isTransferringSuccess,
  } = useTransferBetweenAccounts();


  const { handleInputChange, inputs, handleAccountOne, handleAccountTwo } = useHandleInputsHook({
    from: "",
    to: "",
    amount: 100,
    description: "",
  });

  const { from, to, amount, description } = inputs;

  const handleTransfer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!from || !to) {
      setError("Requires two accounts to transfer balance between")
    }
    else if (from === to) {
      setError("cannot transfer money between same account")
    }
    else {
      return await transferBetweenAccounts({
        accountOneId: from as string,
        accountTwoId: to as string,
        amount: Number(amount),
        description: description as string
      });
    }
  };

  useEffect(() => {
    if (isTransferringSuccess) {
      isOpen(false);
    }
  }, [isTransferringSuccess, isOpen]);

  const transferInputAndLabelProps = [
    {
      htmlFor: "amount",
      label: "Amount",
      type: "number",
      name: "amount",
      id: "amount",
      value: amount,
      onChange: handleInputChange,
      className: "bg-black text-white",
    },
    {
      htmlFor: "description",
      label: "Description",
      type: "string",
      name: "description",
      id: "description",
      value: description,
      onChange: handleInputChange,
      className: "bg-black text-white",
    },
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <TabsContent className="text-white" value="transfer">
      <p className='text-center font-[700] text-red-500'>{error}</p>
      <form onSubmit={handleTransfer} className="grid gap-4 py-4">
        <div className="flex flex-col">
          <div className="lg:flex lg:flex-row flex flex-col items-center gap-4 justify-center">
            <TransferSelects
              transferLabel={"From"}
              transferValue={from as string}
              handleSelectedAccount={handleAccountOne}
            />
            <TransferSelects
              transferLabel={"To"}
              transferValue={to as string}
              handleSelectedAccount={handleAccountTwo}
            />
          </div>
        </div>
        {transferInputAndLabelProps.map(
          ({ htmlFor, label, type, name, id, value, onChange, className }) => (
            <div key={id}>
              <Label htmlFor={htmlFor}>{label}</Label>
              <Input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                className={className}
              />
            </div>
          ),
        )}
        <DialogFooter>
          <Button
            className="bg-white text-black hover:bg-white hover:text-black"
            type="submit"
          >
            {isTransferring ? "Transferring" : "Transfer"}
          </Button>
        </DialogFooter>
      </form>
    </TabsContent>
  );
};

export default TransferDialog;
