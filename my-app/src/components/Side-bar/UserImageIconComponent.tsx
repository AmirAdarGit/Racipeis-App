import React from "react";
import { ImageUrlStyled } from "./side-bar.styled";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../redux/selectors/user.selector";

export const UserImageIcon: React.FC = () => {

  const userProfile = useSelector(getUserProfile);
  return (
      <ImageUrlStyled src={ userProfile.photoURL }></ImageUrlStyled>
  );
}

export default UserImageIcon;
