import { account, appwriteConfig, avatars, databases } from "./config.tsx";
import { ID, Query } from "appwrite";

export interface INewUser {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface IWallet {
  $id?: string;
  name: string;
  currency: string;
  balance: number;
  user: string | undefined;
  userId: string | undefined;
}

export interface ITransaction {
  amount: number;
  description: string;
  category?: string;
  icon?: string;
  wallet: string;
  walletId: string;
  event: Date | undefined;
  type: string;
  userId: string | undefined;
  currency: string;
}

export interface ILimits {
  limit: number;
  category: string;
  wallet: string;
  userId: string;
  walletId: string;
  icon: string;
}

export const createUserAccount = async (user: INewUser) => {
  // Check if the email already exists
  const emailAlreadyExists = await databases.listDocuments(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.USERS_COLLECTION_ID,
    [Query.equal("email", user.email)],
  );

  if (emailAlreadyExists.documents.length > 0) {
    throw new Error("Email already exists. Please use a different email.");
  }

  const usernameAlreadyExists = await databases.listDocuments(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.USERS_COLLECTION_ID,
    [Query.equal("username", user.username)],
  );

  if (usernameAlreadyExists.documents.length > 0) {
    throw new Error(
      "Username already exists. Please use a different username.",
    );
  }

  // Create new account
  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name,
  );

  const avatar = avatars.getInitials(user.name);

  // Save user to DB
  return saveUserToDB({
    accountId: newAccount.$id,
    name: newAccount.name,
    email: newAccount.email,
    profilePic: avatar,
    username: user.username,
  });
};

export const saveUserToDB = async (user: {
  accountId: string;
  name: string;
  username: string;
  profilePic: URL;
  email: string;
}) => {
  return await databases.createDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.USERS_COLLECTION_ID,
    ID.unique(),
    user,
  );
};

export const getCurrentAccount = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      new Error("Failed to create new account");
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.USERS_COLLECTION_ID,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) {
      new Error("Could not find current user");
    }

    return currentUser.documents[0];
  } catch (err) {
    new Error("Could not find current user");
  }
};

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const signInAccount = await account.createEmailPasswordSession(
      user.email,
      user.password,
    );

    if (!signInAccount) {
      new Error("Could not sign into account");
    }

    return signInAccount;
  } catch (err) {
    new Error("Could not sign into account");
  }
};

export const signOutAccount = async () => {
  return await account.deleteSession("current");
};

export const addNewWallet = async (wallet: IWallet) => {
  const { name, currency, balance, user, userId } = wallet;
  return await databases.createDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    ID.unique(),
    {
      name: name,
      currency: currency,
      balance: balance,
      user: user,
      userId: userId,
    },
  );
};

export const deleteWallet = async (walletId: string) => {
  try {

    const wallet = await databases.deleteDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.WALLETS_COLLECTION_ID,
      walletId,
    );

    if(!wallet) {
      new Error("could not delete wallet")
    }

    return wallet

  } catch (err) {
    console.log(err);
  }
};

export const getWallets = async (userId: string) => {
  try {
    const wallets = await databases.listDocuments(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.WALLETS_COLLECTION_ID,
      [Query.equal("userId", userId)],
    );

    if (!wallets) {
      new Error();
    }
    return wallets.documents;
  } catch (err) {
    throw new Error();
  }
};

export const getRecentTransactions = async (userId: string) => {
  try {
    const transactions = await databases.listDocuments(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.TRANSACTION_COLLECTION_ID,
      [Query.equal("userId", userId), Query.limit(5)],
    );

    if (!transactions) {
      new Error("Could not fetch transactions");
    }

    return transactions.documents;
  } catch (err) {
    console.log(err);
  }
};

export const getWallet = async (walletId: string) => {
  const wallet = await databases.getDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    walletId,
  );

  if (!wallet) {
    throw new Error();
  }

  return wallet;
};

export const addTransaction = async (
  transaction: ITransaction,
  walletId: string,
) => {
  // Get the current wallet balance
  const wallet = await databases.getDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    walletId,
  );

  if (!wallet || !wallet.balance) {
    throw new Error("Invalid wallet or balance not found.");
  }

  const currentBalance = wallet.balance;

  // Check if the expense amount exceeds the current balance
  if (transaction.amount > currentBalance) {
    throw new Error("Income amount exceeds wallet balance.");
  }

  // Deduct the expense amount from the wallet balance
  const newBalance = currentBalance - transaction.amount;

  // Update the wallet balance
  await databases.updateDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    walletId,
    {
      balance: newBalance,
    },
  );

  // Create the transaction
  const newTransaction = await databases.createDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.TRANSACTION_COLLECTION_ID,
    ID.unique(),
    transaction,
  );

  if (!newTransaction) {
    throw new Error("Failed to create transaction.");
  }

  return newTransaction;
};

export const getTransactions = async (walletId: string) => {
  const transactions = await databases.listDocuments(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.TRANSACTION_COLLECTION_ID,
    [Query.equal("walletId", walletId)],
  );

  if (!transactions) {
    throw new Error("Failed to list transactions");
  }

  return transactions.documents;
};

export const addIncome = async (
  transaction: ITransaction,
  walletId: string,
) => {
  // Get the current wallet balance
  const wallet = await databases.getDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    walletId,
  );

  if (!wallet || !wallet.balance) {
    throw new Error("Invalid wallet or balance not found.");
  }

  const currentBalance = wallet.balance;

  // Deduct the expense amount from the wallet balance
  const newBalance = currentBalance + transaction.amount;

  // Update the wallet balance
  await databases.updateDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    walletId,
    {
      balance: newBalance,
    },
  );

  // Create the transaction
  const newTransaction = await databases.createDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.TRANSACTION_COLLECTION_ID,
    ID.unique(),
    transaction,
  );

  if (!newTransaction) {
    throw new Error("Failed to create transaction.");
  }

  return newTransaction;
};

export const addLimitByCategory = async (limit: ILimits) => {
  try {
    const newLimit = await databases.createDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.LIMITS_COLLECTION_ID,
      ID.unique(),
      limit,
    );

    if (!newLimit) {
      new Error("Failed to create new limit");
    }

    return newLimit;
  } catch (err) {
    console.log(err);
  }
};

export const getLimitsByCategory = async (userId: string, walletId: string) => {
  const limits = await databases.listDocuments(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.LIMITS_COLLECTION_ID,
    [Query.equal("userId", userId), Query.equal("walletId", walletId)],
  );

  if (!limits) {
    new Error("Could not find limits");
  }

  return limits.documents;
};

export const editLimitsByCategory = async (limitId: string, limit: number) => {
  try {
    const editedLimit = await databases.updateDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.LIMITS_COLLECTION_ID,
      limitId,
      {
        limit: limit,
      },
    );

    if (!editedLimit) {
      new Error("Could not update limit");
    }

    return editedLimit;
  } catch (err) {
    console.log(err);
  }
};

export const deleteLimitByCategory = async (limitId: string) => {
  try {
    const limit = await databases.deleteDocument(
      appwriteConfig.DATABASE_ID,
      appwriteConfig.LIMITS_COLLECTION_ID,
      limitId,
    );

    if (!limit) {
      new Error("Could not delete limit");
    }

    return limit;
  } catch (err) {
    console.log(err);
  }
};

export const transferBetweenAccounts = async (
  accountOneId: string,
  accountTwoId: string,
  amount: number,
  description: string,
) => {
  if (accountOneId === accountTwoId) {
    throw Error("cannot transfer between same account");
  }

  const accountOne = await databases.getDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    accountOneId,
  );

  const accountTwo = await databases.getDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    accountTwoId,
  );

  const accountOneCurrentBalance = accountOne.balance;
  const accountTwoCurrentBalance = accountTwo.balance;

  const accountOneNewBalance = accountOneCurrentBalance - amount;
  const accountTwoNewBalance = accountTwoCurrentBalance + amount;

  await databases.updateDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    accountOneId,
    {
      balance: accountOneNewBalance,
    },
  );

  await databases.updateDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.WALLETS_COLLECTION_ID,
    accountTwoId,
    {
      balance: accountTwoNewBalance,
    },
  );

  await databases.createDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.TRANSACTION_COLLECTION_ID,
    ID.unique(),
    {
      amount: amount,
      wallet: accountOne.name,
      type: "expense",
      event: new Date(Date.now()),
      walletId: accountOneId,
      description: `${description} - sent to ${accountTwo.name}`
    },
  );

  await databases.createDocument(
    appwriteConfig.DATABASE_ID,
    appwriteConfig.TRANSACTION_COLLECTION_ID,
    ID.unique(),
    {
      amount: amount,
      wallet: accountTwo.name,
      type: "income",
      event: new Date(Date.now()),
      walletId: accountTwoId,
      description: `${description} - sent from ${accountOne.name}`

    },
  );
};
