import React, { useEffect, useRef } from "react";
import {
  ButtonStyled, ImageTitle, ImageTwoLines,
  InfoLeft,
  InfoRight,
  InfoWrapper,
  VideoElement
} from "../../style/SignInComponent.styled";
import AppInfoData from "../App-info-components/AppInfoData";
import AppKeyFeatures from "../App-info-components/AppKeyFeatures";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { auth } from "../../firebase/firebase";
import { registerUserAndGetAllRecipes } from "../../functions/registerDB.Queries";
import { getUserProfile } from "../../redux/selectors/user.selector";
import axios from "axios";
import RecipesList from "../Recipes/RecipesList";
import { getPublicRecipe } from "../../redux/selectors/publicRecipes.selector";
import { PAGE_SIZE, PagesRoutes } from "../../utils/constants";

export const SignInComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);
  const publicRecipes = useSelector(getPublicRecipe);


  const publicRecipesToShow = publicRecipes.publicRecipes;
  const totalPublicRecipes = publicRecipes.totalRecipeCount;
  const currentPage = publicRecipes.currentPage;
  const isFetchPublicRecipes = publicRecipes.isFetchRecipes;
  console.log(publicRecipes)
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      const res = await auth.signInWithPopup(provider)
      const user = res.user._delegate;
      registerUserAndGetAllRecipes(user)
        .then((returnData) => {
          if (returnData.isNewUser) {
            dispatch({type: 'SIGNUP', payload: returnData.userMetaData})
          } else {
            dispatch({type: 'LOGIN', payload: returnData.userMetaData})
            dispatch({
              type: 'SET_PRIVATE_RECIPES_FROM_DB',
              payload: {
                recipesFromDB: returnData.recipesFromDB,
                totalPrivateRecipeCount: returnData.totalPrivateRecipeCount
              }
            })

          }
        })
      navigate('/myRecipesCatalog');

    } catch (e) {
      console.log("Error: " + e)
    }
  }

  useEffect(() => {
    if(!isFetchPublicRecipes){
      fetchRecipes()
    }
  },[])

  //
  const fetchRecipes = () => {
     axios.get(`http://localhost:4000/recipe/getRecipes`,
      {params: {currentPage: currentPage, pageSize: PAGE_SIZE, shouldGetTotalRecipesCount: true}})
      .then((res) => {
          dispatch({
            type: 'SET_PUBLIC_RECIPES_FROM_DB',
            payload: {allPublicRecipesFromDB: res.data.recipes, totalPublicRecipeCount: res.data.totalPublicRecipes}
          })
        }
      )
  }
  console.log("publicRecipesToShow", publicRecipesToShow);
  console.log("totalPublicRecipes",totalPublicRecipes);
  return (
    <div style={ {display: "grid"} }>
      <VideoElement
        autoPlay
        ref={ videoRef }
        onEnded={ handleVideoEnded }
      >
        <source
          src="https://my-recipes-global-images.s3.amazonaws.com/file.mp4cd6c58d6-cb2b-4edc-ab5b-85d2869b58b1%7D"/>
      </VideoElement>

      <ImageTitle>CREATE YOUR OWN <br/>ONLINE RECIPE BOOK
        <br/>
        <br/>
        <ImageTwoLines/>
      </ImageTitle>

      <InfoWrapper>
        <InfoLeft><AppInfoData/></InfoLeft>
        <InfoRight><AppKeyFeatures/></InfoRight>
      </InfoWrapper>
      <div>
        best recipes:
        <div>
          { publicRecipesToShow.length && <RecipesList recipes={ publicRecipesToShow } pageToGoBackWhileClickOnRecipe={PagesRoutes.LOGIN}/> }
          { publicRecipesToShow.length && (publicRecipesToShow.length < totalPublicRecipes) ? <button onClick={fetchRecipes}>show more</button> : '' }
        </div>
      </div>
      { !userProfile.name && <ButtonStyled onClick={ signInWithGoogle }>Log In</ButtonStyled> }
    </div>
  )
}

export default SignInComponent;
