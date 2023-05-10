import React, { useEffect, useState } from "react";
import SignOutComponent from "../SignOut";

import { registerUser } from "../../functions/registerDB.Queries";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../../redux/selectors/user.selector";
import logo from '../../images/recipe-book.png';
import cover from '../../images/coctail.jpg';
import { CoverImgStyled, LogoImgStyled } from "../../style/userLandingPage.styled";
import AddNewRecipes, { Recipe } from "../AddNewRecipes";
import { insertNewRecipesToDB } from "../../functions/recipesDB.Queries";
import { uploadImageToStorage } from "../../functions/imageStorageUpload.Query";


interface Props {
  userData: any;
}

export const UserLandingPage: React.FC<Props> = ({userData}) => {
  const userProfile = useSelector(getUserProfile);
  const dispatch = useDispatch();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const handleAddRecipe = () => {
    setShowDialog(!showDialog);
  };


  const handleSaveRecipe = async (recipe: Recipe) => {
    console.log("aaaaa", recipe)
    let imagesByUrls: any = [];
    debugger
    if (recipe.images){
      const promises: any = [];
      recipe.images.forEach((imageFile: any) => {
        promises.push(saveImageOnStorage(imageFile));
      });

      Promise.all(promises).then((results) => {
        debugger
        // do something with the results
        imagesByUrls.push(results)
        console.log(results);
      }).catch((error) => {
        console.error(error);
      });
    }
    console.log(imagesByUrls);

    delete recipe.images;
    setRecipes([...recipes, {...recipe, imagesByUrls: imagesByUrls}]); // get all the recipes from DB
    setShowDialog(false);
  };

  async function saveImageOnStorage(image: File) {
    return await uploadImageToStorage(image);
  }




  useEffect(() => {
    if (!userProfile.isLogIn && userData) {
      registerUser(userData)
        .then((userMetaData) => {
          dispatch({type: 'LOGIN', payload: userMetaData})
        })
    }
  }, [userData])

  return (<>
      {/*<LogoImgStyled  src={ logo } alt="Logo"/>*/ }
      {/*<CoverImgStyled src={ cover } alt="Logo"/>*/ }
      <div>Some title - </div>
      <div style={{display: "flex"}}>

      </div>
      <button onClick={ handleAddRecipe }>Add Recipe</button>
      { showDialog && <AddNewRecipes onSave={ handleSaveRecipe } setShowDialog={ setShowDialog }/> }
      <SignOutComponent/>
    </>
  )
}

export default UserLandingPage;

