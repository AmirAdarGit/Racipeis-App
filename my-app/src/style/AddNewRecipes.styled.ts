import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";


export const WrapperDialogStyled = styled.div`
  position: absolute;
  top: 100px;
  width: 400px;
  height: auto;
  background-color: antiquewhite;
  transform: translateX(-50%);
  left: 50%;
  top: 50%;
  transition: opacity 1.5s cubic-bezier(0.37, 0, 0.63, 1);

  @media ${ DEVICE.mobileL } {
    top: 15px
  }
`;

export const RecipesInputsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  @media ${ DEVICE.mobileL } {
    top: 15px
  }
`;