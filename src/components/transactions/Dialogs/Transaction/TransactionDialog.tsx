import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList } from "@/components/ui/tabs";
import ExpenseDialog from "@/components/transactions/Dialogs/Expense/ExpenseDialog.tsx";
import { ChangeEvent, useState } from "react";
import IncomeDialog from "@/components/transactions/Dialogs/Income/IncomeDialog.tsx";
import TransferDialog from "@/components/transactions/Dialogs/TransferBetweenAccounts/TransferDialog.tsx";
import { categories } from "@/components/arrays/categories.tsx";
import TransactionTabsTrigger from "@/components/transactions/Dialogs/Transaction/TransactionTabsTrigger.tsx";

const TransactionDialog = () => {
  // initial state for dialogs inputs
  const [inputs, setInputs] = useState({
    amount: 100,
    description: "",
    category: "",
    icon: "",
  });

  const [open, isOpen] = useState(false);

  const handleChanges = () => {
    //handle changes in the input states
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputs((prevInput) => ({ ...prevInput, [name]: value }));
    };

    //handle change of category
    const handleCategoryChange = (value: string) => {
      const selectedCategory = categories.find((cat) => cat.category === value);
      if (selectedCategory) {
        setInputs((prevInput) => ({
          ...prevInput,
          category: selectedCategory.category,
          icon: selectedCategory.icon,
        }));
      }
    };

    //handle change in the type of transaction
    const handleTypeChange = (value: string) => {
      setInputs((prevInput) => ({ ...prevInput, type: value }));
    };

    return { handleInputChange, handleCategoryChange, handleTypeChange };
  };

  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => isOpen(true)}
          className="bg-white text-black"
          variant="outline"
        >
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader className="text-white w-full flex">
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <Tabs
          onValueChange={handleChanges().handleTypeChange}
          defaultValue="expense"
          className="flex flex-col w-full items-center justify-center"
        >
          <TabsList
            id="type"
            className="bg-black rounded-full border-2 border-[#343434] w-full p-[30px]"
          >
            <TransactionTabsTrigger />
          </TabsList>
          <ExpenseDialog
            isOpen={isOpen}
            setInputs={setInputs}
            handleCategoryChange={handleChanges().handleCategoryChange}
            inputs={inputs}
            handleInputChange={handleChanges().handleInputChange}
          />
          <IncomeDialog
            isOpen={isOpen}
            setInputs={setInputs}
            handleCategoryChange={handleChanges().handleCategoryChange}
            inputs={inputs}
            handleInputChange={handleChanges().handleInputChange}
          />
          <TransferDialog isOpen={isOpen} />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
