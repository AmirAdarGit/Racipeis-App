import { firestore } from "../firebase/firebase";

export const insertNewRecipesToDB = async (recipe: any) => {
  if (recipe){
    firestore.collection('recipes').add(recipe)
      .then((docRef) => {
        console.log('Recipe added with ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding recipe:', error);
      });
  }
}


export const getAllTheRecipesOfTheUser = async (userId: string) => {
  if (userId){
    firestore.collection('recipes').where('userDBCollectionId', '==', userId)
      .get()
      .then((querySnapshot) => {
        // Loop through the matching documents and log their data
        if (querySnapshot.empty) {
          console.log('No documents found');
        } else {
          // Loop through the matching documents and log their data
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
          });
        }
      })
      .catch((error) => {
        console.error('Error getting documents:', error);
      });
  }
}