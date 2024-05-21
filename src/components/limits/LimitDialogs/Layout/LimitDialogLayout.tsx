import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { categories } from "@/components/arrays/categories.tsx";
import { ILimitDialogLayout } from "@/components/interfaces/interfaces.tsx";
import SelectLayout from "@/components/dialogLayout/SelectLayout.tsx";

const LimitDialogLayout = ({
  buttonClassName,
  buttonValue,
  dialogTitle,
  formSubmit,
  categoryValue,
  handleCategoryChange,
  amountValue,
  handleAmountChange,
  formSubmitStatus,
  open,
  buttonFooterStatus,
  buttonFooterValue,
  isOpen,
  name,
}: ILimitDialogLayout) => {
  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>{buttonValue}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={formSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Category</Label>
            <SelectLayout
              onValueChange={handleCategoryChange}
              value={categoryValue}
              categories={categories}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              value={amountValue}
              name={name}
              onChange={handleAmountChange}
              id="amount"
              type="number"
              className="col-span-3 bg-black text-white"
            />
          </div>
          <DialogFooter>
            <Button
              className="bg-white text-black hover:bg-white hover:text-black"
              type="submit"
            >
              {formSubmitStatus ? buttonFooterStatus : buttonFooterValue}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LimitDialogLayout;
