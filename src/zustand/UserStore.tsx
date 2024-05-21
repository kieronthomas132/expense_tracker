import { create } from "zustand";
import {getCurrentAccount} from "@/lib/appwrite/api.tsx";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  username: string;
  profilePic: URL;
  expenses: [];
  wallets: []
}

export interface UserStoreProps {
  user: UserProps | undefined;
  setUser: (user: UserProps | undefined) => void;
}

export const useUserStore = create<UserStoreProps>((set) => ({
  user: undefined,
  setUser: (user) => set({ user: user }),
}));

export const checkAuth = async () => {
  try {
    const currentAccount = await getCurrentAccount();

    if (currentAccount) {
      useUserStore.getState().setUser({
        id: currentAccount.$id,
        name: currentAccount.name,
        email: currentAccount.email,
        username: currentAccount.username,
        profilePic: currentAccount.profilePic,
        expenses: currentAccount.expenses,
        wallets: currentAccount.wallets,
      });
      return true;
    }
  } catch (err) {
    return false;
  }
};

export default {checkAuth}
