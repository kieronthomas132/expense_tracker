import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormLayout from "@/components/dashboard/AddWalletDialog/FormLayout.tsx";
const AddWalletDialog = () => {

  const [open, isOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger asChild>
        <Button className="text-black" variant="outline">
          Add Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] md:w-[425px] rounded-lg bg-black">
        <DialogHeader className="text-white">
          <DialogTitle>Add Wallet</DialogTitle>
        </DialogHeader>
        <FormLayout isOpen={isOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddWalletDialog;
