import { ID, Permission, Role, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export const createUserAccount = async (user) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) {
      alert("error while creating new account");
      return
    }

    const avatar = avatars.getInitials(user.name);

    const newUser = await saveUser({
      accountId: newAccount.$id,
      email: newAccount.email,
      imageurl: avatar,
      fullname: newAccount.name,
    });

    if(!newUser){
      alert("error while saving user");
      return
    }
    return newUser;
  } catch (error) {
    console.log(error);
    alert("error while creating new account");
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
      `http://localhost:5173${path}`
    );
    console.log(res.href);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getSession = async () => {
  try {
    const session = account.getSession("current");

    session.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const passwordEmail = async (email) => {
  try {
    const response = await account.createRecovery(
      email,
      "http://localhost:5173/forgetPassword"
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resetPassword = async (userId, secret, password) => {
  try {
    const response = await account.updateRecovery(
      userId,
      secret,
      password,
      password
    );
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
      [Query.equal("accountId", currentAccount.$id)]
    );

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

export const logOut = async () => {
  try {
    const response = await account.deleteSession("current");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveNote = async (note) => {
  try {
    const noteSaved = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      ID.unique(),
      note
    );
    return noteSaved;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getNotes = async (id) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      [Query.equal("user", id)],
      100,
      0,
      "DESC"
    );
    return notes;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const pdfUpload = async ({ file, noteId }) => {
  try {
    const upload = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    if (!upload) {
      throw new Error("error while uploading file");
    }

    

    const fileData = await storage.getFileView(
      appwriteConfig.storageId,
      upload.$id
    );

    const fileUrl = fileData.href
    const preview = await storage.getFilePreview(
      appwriteConfig.storageId,
      upload.$id,
      200,
      200,
      "fill",
      100
    );

    if (!preview) {
      throw new Error("error while getting file preview");
    }

    const createPdf = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      ID.unique(),
      {
        fileUrl,
        note: noteId,
      }
    );

    if (!createPdf) {
      throw new Error("error while creating pdf");
    }

    return createPdf;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getNote = async (id) => {
  try {
    const note = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id
    );
    note.body = JSON.parse(note.body);
    return note.body;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getNoteFull = async (id) => {
  try {
    const note = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id
    );
    note.body = JSON.parse(note.body);
    return note;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateNote = async (id, data) => {
  try {
    const jsonData = JSON.stringify(data);

    const updatesData = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
      {
        body: jsonData,
      }
    );
    return updatesData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateNoteTitle = async (id, title) => {
  try {
    // Prepare the data object with only the title
    const jsonData = JSON.stringify({ title: title });

    const updatesData = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
      {
        title: title,
      }
    );
    return updatesData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getNoteTitleById = async (documentId) => {
  try {
    // Fetch the document by its ID
    const document = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      documentId
    );

    // Extract the title from the document's data
    const title = document.title; // Assuming the title is stored under the 'title' key

    return title;
  } catch (error) {
    console.log(error);
    return null; // Return null or handle the error as appropriate
  }
};

export const getPdfByNoteId = async (id) => {
  try {

    const note = await getNoteFull(id);


    return note.pdfs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deletePdfById = async (id) => {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      id
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getPdfById = async (id) => {
  try {
    const pdf = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      id
    );
    return pdf;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const deleteNote = async (id) => {
  try {
    const note = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id
    );
    return note;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const changePassword = async (oldPassword, newPassword) => {
  try {
    
  } catch (error) {
    console.log(error);
    return error
  }
}



