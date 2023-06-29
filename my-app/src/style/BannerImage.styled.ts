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
  background-image: url(https://minta-app-assets.s3.amazonaws.com/home-banner-image.jpeg?t=1687699657931);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 140px 0px;
  margin-bottom: 24px;
  border-radius: 8px;
`;

export const SearchButtonStyled = styled.div`
  display: flex;
  width: 300px;
  height: 40px;
  //position: absolute;
  top: 50%;
  left: 50%;
  
  background-color: rgb(243, 242, 243);
  border-radius: 12px;

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
  border: 2px solid #6991f057;
  border-radius: 10px;
  font-size: 11px;
  font-weight: bold;
`;

export const WrapperCatalog = styled.div`
  display: flex;
  flex-direction: column;
`;

