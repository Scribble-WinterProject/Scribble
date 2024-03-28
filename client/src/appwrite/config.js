import { Client, Account, Databases, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_DATABASE_KEY,
  storageId: import.meta.env.VITE_STORAGE_KEY,
  userId: import.meta.env.VITE_USER_ID,
  noteId: import.meta.env.VITE_NOTE_ID,
  pdfId: import.meta.env.VITE_PDF_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
