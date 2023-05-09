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
    const imageUrl = await uploadImageToStorage(recipe.image)
    delete recipe.image;
    setRecipes([...recipes, {...recipe, imageUrl: imageUrl}]); // get all the recipes from DB
    await insertNewRecipesToDB({...recipe, userDBCollectionId: userProfile.userDBCollectionId, imageUrl: imageUrl})
    setShowDialog(false);
  };

  useEffect(() => {
    if (!userProfile.isLogIn && userData) {
      registerUser(userData)
        .then((userMetaData) => {
          dispatch({type: 'LOGIN', payload: userMetaData})
        })
    }
  }, [userData])

  return (<>
      <div>
        <LogoImgStyled  src={ logo } alt="Logo"/>
        <CoverImgStyled src={ cover } alt="Logo"/>
        <button onClick={handleAddRecipe}>Add Recipe</button>
        {showDialog && <AddNewRecipes onSave={handleSaveRecipe} />}

      </div>
      <SignOutComponent/>
    </>
  )
}

export default UserLandingPage;

