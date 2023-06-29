import styled from "@emotion/styled";
import { LinkBoxProps } from "../../utils/interfaces";


export const LinkBox = styled.div<LinkBoxProps>`
  margin: 0 35px 0 35px;
  cursor: pointer;
  color: ${props => (props.active ? 'pink' : 'black')};
  border-bottom: ${props => (props.active ? '1px solid pink' : 'none')};
  
  :hover {
  color: pink;
}
`;

export const SideBarStyled = styled.div`
  display: flex;
  position: sticky;
  top: 0px;
  z-index: 2;
  align-items: center;
  padding: 10px 16px;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
`;


export const ImageUrlStyled = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

