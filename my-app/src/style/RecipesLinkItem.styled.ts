import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";


export const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const RecipeName = styled.div`
  padding-right: 8px;
  align-self: center;
  padding: 10px;
  font-family: cursive;
  font-size: 26px;
`;

export const Loader = styled.div`
    border: 10px solid #f3f3f3;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;


export const RecipesListWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px;
  background-color: #e4f8f4;
`;

export const RecipeLinkItemWrapperStyled = styled.div`
  display: flex;
  width: 50%;
  padding: 8px 0;
`;







