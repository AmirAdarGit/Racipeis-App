import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";


export const CoverImgStyled = styled.img`
  width: 100%;
  @media ${ DEVICE.mobileL } {
    top: 15px
  }
`;

export const LogoImgStyled = styled.img`
  position: absolute;

  top: 50px;
  left: 50px;
  width: 50px;
  height: 50px;
  @media ${ DEVICE.mobileL } {
    top: 15px
  }
`;