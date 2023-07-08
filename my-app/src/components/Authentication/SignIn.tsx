import React, { useRef } from "react";
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

export const SignInComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);

  const handleVideoEnded = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play()
      }
  };

  const signInWithGoogle = async () => {
    try{
      const provider = new firebase.auth.GoogleAuthProvider()
      const res = await auth.signInWithPopup(provider)
      const user = res.user._delegate;
          registerUserAndGetAllRecipes(user)
            .then((returnData) => {
              if (returnData.isNewUser) {
                dispatch({type: 'SIGNUP', payload: returnData.userMetaData})
              } else {
                dispatch({type: 'LOGIN', payload: returnData.userMetaData})
                dispatch({type: 'SET_ALL_THE_RECIPES_FROM_DB', payload: returnData.allRecipesFromDB})

              }
            })
      navigate('/myRecipesCatalog');

    } catch (e) {
      console.log("Error: " + e)
    }

  }

  return (
    <div style={{display: "grid"}}>
      <VideoElement
        autoPlay
        ref={videoRef}
        onEnded={handleVideoEnded}
      >
        <source src="https://my-recipes-global-images.s3.amazonaws.com/file.mp4cd6c58d6-cb2b-4edc-ab5b-85d2869b58b1%7D" />
      </VideoElement>

        <ImageTitle>CREATE YOUR OUN <br/>RECIPE`S ONLINE BOOK
          <br/>
          <br/>
          <ImageTwoLines/>
        </ImageTitle>

        <InfoWrapper>
          <InfoLeft><AppInfoData/></InfoLeft>
          <InfoRight><AppKeyFeatures/></InfoRight>
        </InfoWrapper>

      {!userProfile.name && <ButtonStyled onClick={signInWithGoogle}>Log In</ButtonStyled>}
    </div>
  )
}

export default SignInComponent;
