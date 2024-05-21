import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { Models } from "appwrite";

export interface IAddToWalletInputLayout {
  label: string;
  name: string;
  id: string;
  type: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  htmlFor: string;
}

export interface IDialogModel {
  open: boolean | undefined;
  setOpen: Dispatch<SetStateAction<boolean | undefined>>;
}

// Define input interface for dialogs
export interface IDialog {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isOpen: Dispatch<SetStateAction<boolean>>;
  inputs: {
    amount: number;
    description: string;
    category: string;
    icon: string;
  };
  setInputs: Dispatch<
    SetStateAction<{
      amount: number;
      description: string;
      category: string;
      icon: string;
    }>
  >;
  handleCategoryChange: (value: string) => void;
}

export interface IAuthDialogLayout {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  AuthContent: {
    type: string;
    name: string;
    id: string;
    required: boolean;
    inputClassName: string;
    labelClassName: string;
    label: string;
    htmlFor: string;
    value: string | number | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }[];
  isSigningIn: boolean;
  authStatus: string;
  signingIn: string;
}

export interface ILimit {
  category: string;
  icon: string;
  $id: string;
  limit: string;
}

export interface IEditLimitDialog {
  limit: string;
  category: string;
  limitId: string;
}

export interface IDialogLayout {
  amountLabel: string;
  amountValue: number;
  amountOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  descriptionLabel: string;
  descriptionValue: string;
  descriptionOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formHandleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  categoryLabel: string;
  categoryValue: string;
  categoryOnChange: (value: string) => void;
  tabType: string;
  isTransactionPending: boolean;
  defaultStatus: string;
  TransactionStatus: string;
}

export interface ILimitDialogLayout {
  buttonClassName: string;
  buttonValue: string | JSX.Element;
  dialogTitle: string;
  formSubmit: (
    e: FormEvent<HTMLFormElement>,
  ) => Promise<Models.Document | undefined>;
  categoryValue: string;
  handleCategoryChange: (value: string) => void;
  amountValue: number | string | undefined;
  handleAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formSubmitStatus: boolean;
  open: boolean;
  buttonFooterStatus: string;
  buttonFooterValue: string;
  isOpen: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
  name: string;
}
