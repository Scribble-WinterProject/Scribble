import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_END_POINT,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_DATABASE_KEY,
//   storageId: import.meta.env.VITE_STORAGE_KEY,
  userId: import.meta.env.VITE_USER_ID,
  noteId: import.meta.env.VITE_NOTE_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
// export const storage = new Storage(client);
export const avatars = new Avatars(client);
