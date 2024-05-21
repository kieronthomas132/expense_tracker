import { ChangeEvent, useState } from "react";
import { categories } from "@/components/arrays/categories.tsx";

export const useHandleInputsHook = (initialState: {
  [key: string]: string | number | undefined;
}) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

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

  const handleCurrencyChange = (value: string) => {
    setInputs((prevInput) => ({
      ...prevInput,
      currency: value,
    }));
  };

  const handleAccountOne = (value: string) => {
    setInputs((prevInput) => ({
      ...prevInput,
      from: value,
    }));
  };

  const handleAccountTwo = (value: string) => {
    setInputs((prevInput) => ({
      ...prevInput,
      to: value,
    }));
  };

  return {
    handleInputChange,
    inputs,
    handleCategoryChange,
    initialState,
    handleCurrencyChange,
    setInputs,
    handleAccountOne,
    handleAccountTwo,
  };
};
