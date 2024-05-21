import { FaPlus } from "react-icons/fa6";
import LimitDialogLayout from "@/components/limits/LimitDialogs/Layout/LimitDialogLayout.tsx";
import { useLimitByCategoryHook } from "@/components/hooks/LimitHooks/LimitByCategoryHook/LimitByCategoryHook.tsx";

const LimitByCategoryDialog = () => {

  const {
    handleInputChange,
    handleCategoryChange,
    category,
    isAddingLimitByCategory,
    isAddingByLimitSuccess,
    handleAddLimit,
    isOpen,
    open,
    amount,
  } = useLimitByCategoryHook();

  return (
    <LimitDialogLayout
      handleCategoryChange={handleCategoryChange}
      categoryValue={category as string}
      amountValue={amount}
      dialogTitle="Add Limit By Category"
      handleAmountChange={handleInputChange}
      formSubmit={handleAddLimit}
      buttonClassName={
        "bg-transparent border-none hover:bg-transparent hover:text-[#8D8D8D]"
      }
      buttonValue={<FaPlus />}
      open={open}
      isOpen={isOpen}
      buttonFooterStatus={"Adding Limit"}
      buttonFooterValue={"Add Limit"}
      formSubmitStatus={isAddingLimitByCategory}
      isSuccess={isAddingByLimitSuccess}
      name="amount"
    />
  );
};

export default LimitByCategoryDialog;
