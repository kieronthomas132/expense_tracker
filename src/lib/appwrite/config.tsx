import {Account, Avatars, Client, Databases} from "appwrite";

export const appwriteConfig = {
  PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
  ENDPOINT_API: import.meta.env.VITE_ENDPOINT_API,
  DATABASE_ID: import.meta.env.VITE_DATABASE_ID,
  USERS_COLLECTION_ID: import.meta.env.VITE_USERS_COLLECTION_ID,
  EXPENSES_COLLECTION_ID: import.meta.env.VITE_EXPENSES_COLLECTION_ID,
  WALLETS_COLLECTION_ID: import.meta.env.VITE_WALLETS_COLLECTION_ID,
  TRANSACTION_COLLECTION_ID: import.meta.env.VITE_TRANSACTIONS_COLLECTION_ID,
  LIMITS_COLLECTION_ID: import.meta.env.VITE_LIMITS_BY_CATEGORY_COLLECTION_ID
};

const client = new Client()
    .setProject(appwriteConfig.PROJECT_ID)
    .setEndpoint(appwriteConfig.ENDPOINT_API);


export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);


export {ID} from 'appwrite'