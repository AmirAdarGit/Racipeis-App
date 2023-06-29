import styled from "@emotion/styled";


export const VideoElement = styled.video`
  width: 100%;
  position: relative;
`;


export const ImageTitle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 60px;
  font-family: Lucida Sans;
`;

export const ImageTwoLines = styled.div`
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  width: 40px;
  height: 9px;
  align-self: center;
`;
export const InfoWrapper = styled.div`
  display: flex;
  bottom: 0;
  //top: -60px;
  
`;
export const InfoLeft = styled.div`
  width: 50%;
  height: 600px;
  background-color: red;
`;

export const InfoRight = styled.div`
  width: 50%;
  height: 600px;
  background-color: aquamarine;
`;

export const ButtonStyled = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 150px;
  height: 50px;
  z-index: 1;
  border-radius: 2px;
  border: 1px solid black;
  background-color: RGB(47, 46, 46);
  color: white;
  font-size: 18px;
  font-family: Georgia;
  :hover {
    cursor: pointer;
  }
`;