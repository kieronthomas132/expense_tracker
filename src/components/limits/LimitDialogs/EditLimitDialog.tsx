import LimitDialogLayout from "@/components/limits/LimitDialogs/Layout/LimitDialogLayout.tsx";
import { IEditLimitDialog } from "@/components/interfaces/interfaces.tsx";
import {useEditLimitDialogHook} from "@/components/hooks/LimitHooks/EditLimitDialogHook/EditLimitDialogHook.tsx";

const EditLimitDialog = ({ limit, category, limitId }: IEditLimitDialog) => {
  const {
    handleCategoryChange,
    handleInputChange,
    handleNewLimit,
    newLimit,
    isEditedSuccess,
    isEditing,
    open,
    isOpen,
  } = useEditLimitDialogHook(limit, limitId);

  return (
    <LimitDialogLayout
      handleCategoryChange={handleCategoryChange}
      categoryValue={category}
      amountValue={newLimit}
      dialogTitle="Edit Limit"
      handleAmountChange={handleInputChange}
      formSubmit={handleNewLimit}
      buttonClassName={
        "w-full hover:bg-[#272727] hover:bg-opacity-50 bg-[#272727] bg-opacity-50"
      }
      buttonValue="Edit"
      formSubmitStatus={isEditing}
      open={open}
      isOpen={isOpen}
      buttonFooterStatus={"Editing"}
      buttonFooterValue={"Edit"}
      isSuccess={isEditedSuccess}
      name="newLimit"
    />
  );
};

export default EditLimitDialog;
