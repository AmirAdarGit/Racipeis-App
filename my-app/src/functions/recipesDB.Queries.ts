import { firestore } from "../firebase/firebase";
import { uploadImageToStorage } from "./imageStorageUpload.Query";

export const insertNewRecipesToDB = async (recipe: any) => {
  if (recipe){
    firestore.collection('Recipes').add(recipe)
      .then((docRef) => {
        console.log('Recipe added with ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding recipe:', error);
      });
  }
}


export const getAllTheRecipesOfTheUser = async (userId: string) => {
  let AllRecopies: any = [];
  if (!userId) return

    await firestore.collection('Recipes').where('userId', '==', userId)
      .get()
      .then((querySnapshot) => {
        // Loop through the matching documents and log their data
        if (querySnapshot.empty) {
          console.log('No documents found');
        } else {
          // Loop through the matching documents and log their data
          querySnapshot.forEach((doc) => {
            AllRecopies.push(doc.data())
          });
        }
      })
      .catch((error) => {
        console.error('Error getting documents:', error);
      });
  return AllRecopies

}


export const insertNewImagesToDB = async (recipe: any) => {
  const promises: any = [];
  let imagesByUrls: any = [];
  recipe.images.forEach((imageFile: any) => {
    promises.push(saveImageOnStorage(imageFile));
  });
  try{
    await Promise.all(promises).then((results) => {
      imagesByUrls = imagesByUrls.concat(...results);
    }).catch((error) => {
      console.error("error from insertNewImagesToDB:", error);
    });
    return imagesByUrls
  } catch (e){
    console.log("errorrrr",e)
  }

}

export async function saveImageOnStorage(image: File) {
  return await uploadImageToStorage(image);
}