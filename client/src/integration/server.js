import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65b89cfb3e156e1b0632");

const databases = new Databases(client);

export const FetchAndParseNotes = async (documentId) => {
  try {
    const document = await databases.getDocument(
      "65b93eda2b9c92a52e24",
      "65b93efccc7d4c315af6",
      documentId,
    );

    if (document.Notes) {
      document.Notes = JSON.parse(document.Notes);
      console.log(document.Notes);
    }

    return document.Notes;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

export const UpdateNotes = async (documentId, updatedData) => {
  try {
    const data = {
      Notes: JSON.stringify(updatedData),
    };

    // Check if the document exists
    let document = await databases.getDocument(
      "65b93eda2b9c92a52e24",
      "65b93efccc7d4c315af6",
      documentId,
    );

    if (document.$id) {
      // Document exists, update it
      const updatedDocument = await databases.updateDocument(
        "65b93eda2b9c92a52e24",
        "65b93efccc7d4c315af6",
        documentId,
        data,
      );
      return updatedDocument;
    } else {
      // Document does not exist, create a new one
      const newDocument = await databases.createDocument(
        "65b93eda2b9c92a52e24",
        "65b93efccc7d4c315af6",
        ID.unique(),
        data,
      );
      return newDocument;
    }
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
