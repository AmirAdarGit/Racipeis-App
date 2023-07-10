import styled from "@emotion/styled";


export const RecipeCardWrapperStyled = styled.div`
  position: relative;
  margin: 60px 260px 24px 260px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid rgb(185, 191, 200);
`;
export const HeaderContentStyled = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-self: center;
  justify-content: center;
`;

export const RecipeTopRightDataWrapperStyle = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex: 1;
  overflow: auto;
`

export const ImageContainer = styled.div`
  width: 50%;
  height: 500px;
  overflow: hidden;
  border-radius: 8px 0 0 0;

`;

export const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RecipeNameStyled = styled.div`
  font-size: 50px;
  font-family: cursive;
`;

export const ServingsAndTimeToMakeStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const KnifeForkIconStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const SeparatorStyled = styled.div`
  border: 1px solid black;
  margin: 10px 90px 10px 90px;
`;

export const NotesStyled = styled.div`
  height: auto;
  padding: 8px;
  margin: 32px;
  border: 1px solid black;
  text-align: start;
`;
export const NotesTitleStyled = styled.div`
  font-size: 24px;
  padding: 0 0 8px 0;
`;

export const IngredientsStyled = styled.div`
  display: flex;
  flex-direction: column;
`;


export const MainContentWrapperStyled = styled.div`
  width: 100%;
`;

export const HeaderWrapperStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;


export const GoBackButtonStyled = styled.button`
  padding: 8px;
  background-color: rgb(243, 242, 243);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: antiquewhite;
  }
`;


