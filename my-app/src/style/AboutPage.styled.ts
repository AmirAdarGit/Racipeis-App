import styled from "@emotion/styled";


export const AboutPageWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const AboutPageHeaderWrapperStyled = styled.div`
  flex: 1;
  background-color: rgb(33, 107, 132);
  color: rgb(88, 161, 188);
  display: flex;
  justify-content: center;
  padding: 40px;

`;

export const AboutPageHeaderTitleStyled = styled.div`
  align-self: center;
  font-size: 40px;
  font-family: serif;

`;

export const AboutPageInfoWrapperStyled = styled.div`
  flex: 1;
  background-color: rgb(238, 246, 246);
  color: black;
  display: flex;
  justify-content: center;
  padding: 40px;
`;

export const AboutPageInfoTextStyled = styled.div`
  align-self: center;
  font-size: 20px;
  font-family: serif;
  max-width: 50%;
  line-height: 1.5;
  padding: 16px;

`;

export const AboutPageKeyFeaturesWrapperStyled = styled.div`
  flex: 2;
  background-color: rgb(223, 237, 237);
  color: black;
  display: flex;
  //justify-content: center
`;

export const AboutPageKeyFeaturesTextStyled = styled.div`
  align-self: center;
  font-size: 20px;
  font-family: serif;
  flex: 1;
  padding: 42px;
  
  li {
    text-align: start;
    padding: 8px
  }
`;

export const AboutPageImageWrapper = styled.div`
  flex: 1;
  background-image: url("https://my-recipes-global-images.s3.amazonaws.com/about-page-image.jpeg");
`;