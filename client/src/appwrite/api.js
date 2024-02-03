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

export const signInAccount = async (email, password) => {
  try {
    const userLogin = await account.createEmailSession(email, password);
    return userLogin;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const googleAuth = async () => {
  try {
    await account.createOAuth2Session(
      "google",
      "http://localhost:5173",
      "http://localhost:5173",
    );
    const session = await getSession();
    const newUser = await saveUser({
      accountId: session.$id,
      email: session.email,
      imageurl: session.avatar,
      fullname: session.name,
    });
    return newUser
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getSession = async() => {
  try {
    const session = await account.getSession("current");
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const passwordEmail = async (email) => {
  try {
    const response = await account.createRecovery(email,"http://localhost:5173/forgetPassword");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const resetPassword = async (userId,secret,password) => {
  try {
    console.log("pass" ,password,"fjdvkfjd");
    const promise = account.updateRecovery(
      userId,
      secret,
      password,
      password,
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  } catch (error) {
    console.log(error);
    return error;
  }
}

