import { FormEvent, useEffect, useState } from "react";
import { useEditLimitByCategory } from "@/lib/react-query/queries&Mutations.tsx";
import {useHandleInputsHook} from "@/components/hooks/handleInputsHook/handleInputsHook.tsx";

export const useEditLimitDialogHook = (
  limit: string,
  limitId: string,
) => {

  const [open, isOpen] = useState(false);

  const {
    mutateAsync: editLimit,
    isSuccess: isEditedSuccess,
    isPending: isEditing,
  } = useEditLimitByCategory();

  const {handleCategoryChange, handleInputChange, inputs} = useHandleInputsHook({
    newLimit: limit
  })

  const {newLimit} = inputs;

  //function to add a new limit
  const handleNewLimit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return await editLimit({
      limitId: limitId,
      limit: Number(newLimit),
    });
  };

  useEffect(() => {
    if (isEditedSuccess) {
      isOpen(false);
    }
  }, [isEditedSuccess]);

  return {
    isEditedSuccess,
    isEditing,
    handleCategoryChange,
    handleInputChange,
    handleNewLimit,
    newLimit,
    open,
    isOpen,
  };
};
