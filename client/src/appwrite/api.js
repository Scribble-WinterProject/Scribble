import { ID, Permission, Role,Query } from "appwrite";
import { account, appwriteConfig, avatars, databases} from "./config";

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

export const googleAuth = async (path) => {
  try {
    const res = await account.createOAuth2Session(
      "google",
      `http://localhost:5173${path}`,
      `http://localhost:5173${path}`,
    );
    console.log(res.href);

  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getSession = async() => {
  try {
   const session = account.getSession("current");

   session.then(
     function (response) {
       console.log(response); // Success
     },
     function (error) {
       console.log(error); // Failure
     },
   );
   return
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

export const resetPassword = async (userId, secret, password) => {
  try {
    console.log(userId, secret, password);
    const response = await account.updateRecovery(
      userId,
      secret,
      password,
      password,
    );
    console.log(response); 
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("unauthorized");
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    console.log("current user", currentUser.documents.length);

    const avatar = avatars.getInitials(currentAccount.name);
    return [
      currentUser.documents.length,
      currentAccount,
      avatar,
      currentUser.documents[0],
    ];
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logOut = async()=> {
  try {
    const response = await account.deleteSession("current");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const saveNote = async(note)=> {
  try {
    const noteSaved = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      ID.unique(),
      note
    );
    console.log("saved note",noteSaved);
    return noteSaved
  } catch (error) {
    console.log(error);
    return error
  }
}


export const getNotes = async(id)=> {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      [Query.equal("user", id)],
      100,
      0,
      "DESC",
    );              
    return notes;
  } catch (error) {
    console.log(error);
    return error
  }
}


// const pdfUpload = async({file,noteId})=> {
//   try {
//     const upload = await storage.createFile(
//       appwriteConfig.storageId,
//       ID.unique(),
//       file[0],
//     );
//     if(!upload) {
//       throw new Error("error while uploading file");
//     }

//     const preview = await storage.getFilePreview(
//       appwriteConfig.storageId,
//       upload.$id,
//       200,
//       200,
//       'fill',
//       100,
//     );

//     if(!preview) {
//       throw new Error("error while getting file preview");
//     }

//     const createPdf = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.pdfId,
//       ID.unique(),
//       {
//         note: noteId,
//         noteId: noteId,
//         fileUrl: preview,
//       }
//     )

//     if(!createPdf) {
//       throw new Error("error while creating pdf");
//     }

//     return createFile
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

