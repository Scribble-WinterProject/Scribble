import { Client, Account, Databases, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: "65b803555cd80b4abc18",
  databaseId: "65bc15a864b1f94713bd",
  storageId: "65ec5f1fbb4686cd0c82",
  userId: "65bc15b14e7036dabedf",
  noteId: "65bc15ba795234a89290",
  pdfId: "65ec63ccb86107b326a1",
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
