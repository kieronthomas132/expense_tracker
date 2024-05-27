import {ITransaction} from "@/lib/appwrite/api.tsx";
import {UserProps} from "@/zustand/UserStore.tsx";
import {ID, Models} from "appwrite";
import {UseMutateAsyncFunction} from "@tanstack/react-query";
import {appwriteConfig, storage} from "@/lib/appwrite/config.tsx";

interface ITransactions {
  walletId: string;
  amount: number;
  description: string;
  icon: string;
  category: string;
  user: UserProps;
  wallet: string;
  type: string;
  currency: string;
  addFunction: UseMutateAsyncFunction<
    Models.Document,
    Error,
    { transaction: ITransaction; walletId: string },
    unknown
  >;
}
export const handleTransaction = async ({
  walletId,
  amount,
  description,
  icon,
  category,
  user,
  type,
  addFunction,
  currency
}: ITransactions) => {

  if (walletId) {
    return await addFunction({
      walletId: walletId,
      transaction: {
        amount: Number(amount),
        description: description,
        icon: icon,
        category: category,
        wallet: walletId,
        walletId: walletId,
        event: new Date(Date.now()),
        type: type,
        userId: user?.id,
        currency: currency,
      },
    });
  }
};


export const uploadIcon = async (icon: string) => {
  // Fetch the image from the provided URL
  const response = await fetch(icon);
  const blob = await response.blob();
  const file = new File([blob], 'icon.png', { type: "image/png" });

  // Upload the file to Appwrite Storage
  const result = await storage.createFile(
      appwriteConfig.STORAGE_COLLECTION_ID,
      ID.unique(),
      file
  );
  return `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.STORAGE_COLLECTION_ID}/files/${result.$id}/view?project=${appwriteConfig.PROJECT_ID}`;
}