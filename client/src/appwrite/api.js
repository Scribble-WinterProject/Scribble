import { ID, Permission, Role } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

export const createUserAccount = async (user) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    if (!newAccount) {
      throw new Error("error while createing new account");
    }

    console.log("new account is ",newAccount);
    const avatar = avatars.getInitials(user.name);

    const newUser = await saveUser({
      accountId: newAccount.$id,
      email: newAccount.email,
      imageurl: avatar,
      fullname: newAccount.name,
    });
    console.log("new user", newUser);
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
  
};

export const saveUser = async (user) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};



