import { DEVICE } from "../utils/constants";
import styled from "@emotion/styled";
import { css, keyframes } from "@mui/material";


export const RecipesInputsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  max-width: 590px;
  align-self: center;
  border-radius: 8px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.3);
` ;


export const PopupLayOut = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  background-color: gray;
  opacity: 0.5;
`;

export const PopupContainer = styled.div`
  position: fixed;
  inset: 102px 315px 115px 315px;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  
  
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

export const RemoveLineButtonStyled = styled(CloseButtonStyled)`
  width: 20px;
  height: 20px;
  margin-left: 6px;
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
  gap: 8px;
  height: 44px;
  width: 100%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: pink;
`;


