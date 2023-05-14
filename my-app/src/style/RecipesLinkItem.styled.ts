import styled from "@emotion/styled";
import { DEVICE } from "../utils/constants";


export const ImageStyled = styled.img`
  width: 300px;
  height: 300px;
`;

export const RecipeName = styled.div`
  align-self: center;
  padding: 10px;
  
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




