import styled from "@emotion/styled";
import Button from '@mui/material/Button';

export const BannerImageStyled = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-image: url(https://my-recipes-global-images.s3.amazonaws.com/recipeAppBannerImage1.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 140px 0px;
  margin-bottom: 24px;
  border-radius: 8px;
`;

export const SearchButtonStyled = styled.div`
  display: flex;
  height: auto;
  top: 50%;
  left: 50%;

  background-color: rgb(243, 242, 243);
  border-radius: 8px;

`;

export const SearchInputAndIconStyled = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 8px 0 0 8px;
  padding-right: 8px;
`;


export const SearchInputStyled = styled.input`
  width: 90%;
  margin: 8px;
  background-color: rgb(243, 242, 243);
  border: none;

  :focus {
    outline: none;
  }
`;

export const ButtonStyled = styled(Button)`
  color: black;
  border: 1px solid black;
  border-radius: 0 8px 8px 0;
  font-size: 11px;
  font-weight: bold;
`;


export const CheckboxWrapperStyled = styled.div`
  border: 1px solid pink;
  border-radius: 8px;

  span {
    line-height: unset;
    color: black;
  }
`;

export const SingleRadioBtnWrapperStyled = styled.div`
  color: black;
  font-size: 11px;
  font-weight: bold;
  padding: 8px;

  span {
  }
`;

export const RadioBtnFormWrapperStyled = styled.div`
  display: flex;
  border: 1px solid black;
  
  span {
  }
`;

