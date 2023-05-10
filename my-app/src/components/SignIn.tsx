import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { auth, storage } from "../firebase/firebase";
import {
  ButtonStyled, ImageTitle, ImageTwoLines,
  InfoLeft,
  InfoRight,
  InfoWrapper,
  VideoElement
} from "../style/SignInComponent.styled";
import { VIDEO_COVER } from "../utils/constants";


export const SignInComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }


  function handleVideoEnd() {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }

  return (
    <div style={{display: "grid"}}>
      {/*<VideoContainer>*/}
        <VideoElement src={ VIDEO_COVER } autoPlay onEnded={ handleVideoEnd }/>
        <ImageTitle>CREATE YOUR OUN <br/>RECIPE`S ONLINE BOOK
          <br/>
          <br/>
          <ImageTwoLines/>
        </ImageTitle>
      {/*</VideoContainer>*/}

        <InfoWrapper>
          <InfoLeft>image of some thing</InfoLeft>
          <InfoRight>App info</InfoRight>
        </InfoWrapper>

      <ButtonStyled onClick={signInWithGoogle}>Let's Start</ButtonStyled>
    </div>
  )
}

export default SignInComponent;
