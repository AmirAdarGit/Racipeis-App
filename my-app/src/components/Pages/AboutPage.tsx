import React from "react";
import {
  AboutPageHeaderTitleStyled,
  AboutPageHeaderWrapperStyled, AboutPageImageWrapper,
  AboutPageInfoTextStyled,
  AboutPageInfoWrapperStyled,
  AboutPageKeyFeaturesTextStyled,
  AboutPageKeyFeaturesWrapperStyled,
  AboutPageWrapperStyled
} from "../../style/AboutPage.styled";


export const AboutPage: React.FC = () => {


  return (
    <AboutPageWrapperStyled>
      <AboutPageHeaderWrapperStyled>
        <AboutPageHeaderTitleStyled>My Online Recipes Book</AboutPageHeaderTitleStyled>
      </AboutPageHeaderWrapperStyled>
      <AboutPageInfoWrapperStyled style={ {flex: 1, backgroundColor: "rgb(238, 246, 246)"} }>
        <AboutPageInfoTextStyled>
          Welcome to Recipe Book App, <br/> your go-to platform for creating, organizing, and sharing your favorite
          recipes!
          Our mission is to provide a user-friendly and intuitive interface that empowers you to build your personal
          online recipe book while connecting with a community of passionate food lovers.

          At Recipe Book App, we understand that cooking is an art form, and we believe that everyone should have a
          place to showcase their culinary creations. Whether you're a professional chef, a home cook, or just starting
          your culinary journey, our app is designed to cater to your needs.
        </AboutPageInfoTextStyled>

      </AboutPageInfoWrapperStyled>
      <AboutPageKeyFeaturesWrapperStyled>
        <AboutPageImageWrapper/>
        <AboutPageKeyFeaturesTextStyled>
          <ul>
            Key Features: <br/>
            <li>
              <div>
                Create and Customize Your Recipe Book:
                Easily create your own digital recipe book where you can store all your recipes in one place.
                Add detailed information such as ingredients, cooking instructions, preparation time, and serving size.
                Personalize your recipes with beautiful images to make them visually appealing.
              </div>
            </li>
            <li>
              <div>
                Public and Private Recipes:
                Choose whether to keep your recipes private or share them with the Recipe Book App community.
                Public recipes allow you to contribute to our ever-growing collection and inspire other users with your
                culinary
                creations.
                Keep your personal recipes private, ensuring that only you have access to them.
              </div>
            </li>
            <li>
              <div>
                Discover and Explore:
                Unleash your culinary curiosity by browsing through a vast selection of public recipes from fellow
                users.
                Use our powerful search bar to find specific recipes, filtering by ingredients, cuisine, or dietary
                preferences.
                Discover new flavors, cooking techniques, and cultural dishes from around the world.
              </div>
            </li>
            <li>
              <div>
                Social Media Integration:
                Seamlessly connect your social media accounts to Recipe Book App for effortless sharing of your favorite
                recipes
                with friends and followers.
                Engage with the community by liking, commenting, and bookmarking recipes that catch your eye.
                Connect with like-minded food enthusiasts, exchange ideas, and explore new culinary trends.
              </div>

            </li>
            <li>
              <div>
                Save External Recipe Links:
                Never lose track of your favorite recipes from external sources again.
                Save links from websites, blogs, or social media platforms directly to your Recipe Book App account.
                Access all your cherished recipes in one convenient location, eliminating the need for multiple
                bookmarks or
                notes.
              </div>
            </li>
            <br/> <br/>
            Whether you're an avid home cook, a passionate food blogger, or simply someone who enjoys experimenting in
            the
            kitchen, Recipe Book App is here to inspire, assist, and connect you with a community of fellow food lovers.
            Start your culinary adventure today and savor the joy of creating and sharing delicious recipes!
          </ul>
        </AboutPageKeyFeaturesTextStyled>
      </AboutPageKeyFeaturesWrapperStyled>
    </AboutPageWrapperStyled>
  )
}

export default AboutPage;
