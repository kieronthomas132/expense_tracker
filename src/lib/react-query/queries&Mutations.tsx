import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addIncome,
  addLimitByCategory,
  addNewWallet,
  addTransaction,
  createUserAccount,
  deleteLimitByCategory,
  deleteWallet,
  editLimitsByCategory,
  getLimitsByCategory,
  getRecentTransactions,
  getTransactions,
  getWallet,
  getWallets,
  ILimits,
  INewUser,
  ITransaction,
  IWallet,
  signInAccount,
  signOutAccount,
  transferBetweenAccounts,
} from "@/lib/appwrite/api.tsx";
import { QUERY_KEYS } from "@/lib/react-query/QueryKeys.tsx";

export const useCreateNewAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useAddNewWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (wallet: IWallet) => addNewWallet(wallet),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLETS],
      });
    },
  });
};

export const useDeleteWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (walletId: string) => deleteWallet(walletId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLETS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_TRANSACTIONS],
      });
    },
  });
};

export const useGetWallets = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_WALLETS],
    queryFn: () => getWallets(userId),
  });
};

export const useGetWallet = (walletId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_WALLET, walletId],
    queryFn: () => getWallet(walletId),
  });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      transaction,
      walletId,
    }: {
      transaction: ITransaction;
      walletId: string;
    }) => addTransaction(transaction, walletId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLETS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LIMITS_BY_CATEGORY],
      });
    },
  });
};

export const useGetTransactions = (walletId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TRANSACTIONS, walletId],
    queryFn: () => getTransactions(walletId),
  });
};

export const useAddLimitByCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (limit: ILimits) => addLimitByCategory(limit),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LIMITS_BY_CATEGORY],
      });
    },
  });
};

export const useGetLimitsByCategory = (userId: string, walletId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LIMITS_BY_CATEGORY, userId, walletId],
    queryFn: () => getLimitsByCategory(userId, walletId),
  });
};

export const useEditLimitByCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ limitId, limit }: { limitId: string; limit: number }) =>
      editLimitsByCategory(limitId, limit),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LIMITS_BY_CATEGORY],
      });
    },
  });
};

export const useDeleteLimitByCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (limitId: string) => deleteLimitByCategory(limitId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LIMITS_BY_CATEGORY],
      });
    },
  });
};

export const useGetRecentTransactions = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_TRANSACTIONS, userId],
    queryFn: () => getRecentTransactions(userId),
  });
};

export const useAddIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      transaction,
      walletId,
    }: {
      transaction: ITransaction;
      walletId: string;
    }) => addIncome(transaction, walletId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSACTIONS],
      });
    },
  });
};

export const useTransferBetweenAccounts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      accountOneId,
      accountTwoId,
      amount,
      description,
    }: {
      accountOneId: string;
      accountTwoId: string;
      amount: number;
      description: string;
    }) =>
      transferBetweenAccounts(accountOneId, accountTwoId, amount, description),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLETS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSACTIONS],
      });
    },
  });
};
