import { v4 as uuidv4 } from "uuid";
import { firestore } from "../firebase/firebase";


export const registerUser = async (userData: any) => {
  let userMetaData = await getUserDataFromDBIfExist(userData);
  if (!userMetaData){
    const RecipesDBCollectionId = uuidv4()
    firestore.collection("Users").doc(`${userData.uid}`).set({
      name: userData.displayName,
      email: userData.email,
      RecipesDBCollectionId,
      userDBCollectionId: userData.uid
    }, { merge: true })
      .then(() => {
        console.log("Document written for:", userData.displayName);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    userMetaData = {
      name: userData.displayName,
      email: userData.email,
      RecipesDBCollectionId,
      userDBCollectionId: userData.uid,
    }
  }
  return userMetaData
}

export const getUserDataFromDBIfExist = async (userData: any): Promise<any> => {
  // TODO: move to mongodb collection
  return await firestore.collection('Users').doc(`${userData.uid}`).get()
    .then((doc) => {
      if (doc.exists){
        return doc.data()
      }
      else return false
    })
    .catch((error) => {
      console.error('Error getting document:', error);
      return undefined
    });
}



