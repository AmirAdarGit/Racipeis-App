import React from "react";
import { AppInfoDataWrapper, AppKeyFeaturesTitleStyled, InfoData, InfoTitle } from "../../style/AddInfoData.styled";


export const AppKeyFeatures: React.FC = () => {


  return (
    <div>
      <AppKeyFeaturesTitleStyled>Key Features:</AppKeyFeaturesTitleStyled>
      <ul>
        <li>Create and Manage Your Recipe Book: With our app, you have the power to create your very own personalized
          recipe book. You can easily add, edit, and delete recipes, giving you complete control over your collection.
        </li>
        <li>Public and Private Recipes: You can choose to make your recipes either public or private. Public recipes are
          visible to all app users, allowing you to share your culinary creations with the community. Private recipes
          remain personal and are only accessible to you.
        </li>
        <li>Search and Discover: Our app makes it effortless to find specific recipes that suit your taste and
          preferences. Use the search bar to filter recipes based on ingredients, cuisine, or any other specific
          criteria. You can explore both your private recipe collection and the vast database of public recipes shared
          by other users.
        </li>
        <li>Social Media Integration: We understand the importance of seamless integration with social media platforms.
          Our app allows you to easily link your social media accounts, making it convenient for you to share your
          recipes across different platforms and engage with other like-minded food enthusiasts.
        </li>
        <li>Save External Recipe Links: Our app provides a handy feature to collect and store external recipe links. If
          you come across an interesting recipe on a website or social media, simply save the link within the app for
          future reference. This way, you can easily access your favorite recipes from various sources all in one place.
        </li>
      </ul>
    </div>
  )
}

export default AppKeyFeatures;
