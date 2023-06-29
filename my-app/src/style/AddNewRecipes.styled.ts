import { DEVICE } from "../utils/constants";
import styled from "@emotion/styled";
import { css, keyframes } from "@mui/material";


export const RecipesInputsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
`;


export const PopupLayOut = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background-color: gray;
  opacity: 0.5;
`;

export const PopupContainer = styled.div`
  position: fixed;
  inset: 75px;
  z-index: 2;
  border-radius: 16px;
  background-color: white;
  opacity: 1;
`;

export const WrapperNewRecipeModalStyled = styled.div<{ show: any }>`
  ${ ({show}) =>
          show &&
          css`
            animation: ${ fadeAnimation } 0.5s;
            opacity: 1;
          ` }
`;

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;

`;

export const HeaderPopup = styled.div`
  display: flex;
  justify-content: space-between;
  padding:  12px;
`;

export const CloseButtonStyled = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgb(243, 242, 243);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: antiquewhite;
  }
`;

export const TitleStyled = styled.div`
  color: black;
  font-size: 30px;
  font-weight: bold;
  
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #000000;
  margin-bottom: 10px;
`;export const UploadImageWrapperStyled = styled.div`
  display: flex;
  height: 44px;
  justify-content: center;
  align-items: center;
  width: 586px;
  border-radius: 8px;
  background-color: pink;
`;


