// import { onAuthStateChanged } from "@firebase/auth";
// import { getAllTheRecipesOfTheUser } from "./recipesDB.Queries";
// import { auth } from "../firebase/firebase";
//
//
// export const googleAuth = async () => {
//   await onAuthStateChanged(auth, (user) => {
//    if (user) {
//      setUserAuth(user)
//      debugger
//      // User is signed in, store the user data in local storage
//      localStorage.setItem('user', JSON.stringify(user));
//      setUser(user);
//      if (!isFetchedRecipes) {
//        console.log("hereeeeee")
//
//        getAllTheRecipesOfTheUser(user.uid).then((recipesFromDB) => {
//          dispatch({ type: 'SET_ALL_THE_RECIPES_FROM_DB', payload:  recipesFromDB});
//        })
//      }
//    } else {
//      // User is signed out,  the user data from local storage
//      localStorage.removeItem('user');
//      setUser(null);
//    }
//  });
// }
export const a = () => {
  return null
}