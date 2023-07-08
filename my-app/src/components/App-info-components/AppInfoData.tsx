import React from "react";
import { AppInfoDataWrapper, InfoData, InfoTitle } from "../../style/AddInfoData.styled";



export const AppInfoData: React.FC = () => {



  return (
    <AppInfoDataWrapper>
      <InfoTitle>
        Welcome to our Recipe Book App!
      </InfoTitle>
      <InfoData>
      Our Recipe Book App is the perfect tool for all the cooking enthusiasts out there
      who love to create, collect, and share their favorite recipes. Whether you're
      a seasoned chef or just starting your culinary journey, our app is designed to
      help you organize and discover an incredible array of recipes from all around the world.
      </InfoData>

    </AppInfoDataWrapper>
  )
}

export default AppInfoData;
