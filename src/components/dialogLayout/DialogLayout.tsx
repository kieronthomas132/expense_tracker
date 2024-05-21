import { TabsContent } from "@/components/ui/tabs.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { categories } from "@/components/arrays/categories.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { IDialogLayout } from "@/components/interfaces/interfaces.tsx";
import SelectLayout from "@/components/dialogLayout/SelectLayout.tsx";

const DialogLayout = ({
  amountLabel,
  amountValue,
  amountOnChange,
  descriptionLabel,
  descriptionValue,
  descriptionOnChange,
  formHandleSubmit,
  categoryLabel,
  categoryValue,
  categoryOnChange,
  tabType,
  isTransactionPending,
  defaultStatus,
  TransactionStatus,
}: IDialogLayout) => {
  return (
    <TabsContent className="text-white" value={tabType}>
      <form onSubmit={formHandleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="amount" className="text-right">
            {amountLabel}
          </Label>
          <Input
            value={amountValue}
            onChange={amountOnChange}
            type="number"
            name="amount"
            id="amount"
            className="col-span-3 bg-black text-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            {descriptionLabel}
          </Label>
          <Input
            id="description"
            name="description"
            value={descriptionValue}
            onChange={descriptionOnChange}
            className="col-span-3 bg-black text-white"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            {categoryLabel}
          </Label>
          <SelectLayout
            name="category"
            value={categoryValue}
            onValueChange={categoryOnChange}
            categories={categories}
          />
        </div>
        <DialogFooter>
          <Button
            className="bg-white text-black hover:bg-white hover:text-black"
            type="submit"
          >
            {isTransactionPending ? TransactionStatus : defaultStatus}
          </Button>
        </DialogFooter>
      </form>
    </TabsContent>
  );
};

export default DialogLayout;
