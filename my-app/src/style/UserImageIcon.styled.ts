import styled from "@emotion/styled";
import Button from '@mui/material/Button';

export const UserIconButtonStyled = styled(Button)<{url: string}>`
  background-image: ${({ url }) => `url(${url})`};
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
