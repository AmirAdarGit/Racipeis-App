import React, { useState } from "react";
import { Pages, PagesRoutes } from "../../utils/constants";
import { LinkBox, SideBarStyled } from "./side-bar.styled";
import { useNavigate } from "react-router-dom";
import UserImageIcon from "./UserImageIconComponent";

export const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState<string>(PagesRoutes.RECIPES_CATALOG);

  const Logo = () => {
    return <div>Logo</div>;
  };

  const handleClick = (path: string) => {
    navigate(path)
    setActiveLink(path)
  };



  const Navigation = () => {
    return (
      <div style={{ flex: '1', textAlign: 'center', flexDirection: "row", display:"flex", justifyContent: "center" }}>
        <LinkBox onClick={() => handleClick(PagesRoutes.ABOUT)} active={activeLink === PagesRoutes.ABOUT}>{Pages.ABOUT}</LinkBox>
        <LinkBox onClick={() => handleClick(PagesRoutes.RECIPES_CATALOG)} active={activeLink === PagesRoutes.RECIPES_CATALOG}>{Pages.RECIPES_CATALOG}</LinkBox>
        <LinkBox onClick={() => handleClick(PagesRoutes.MY_LINKS)} active={activeLink === PagesRoutes.MY_LINKS}>{Pages.MY_LINKS}</LinkBox>
      </div>
    );
  };


  return (
    <SideBarStyled >
      <Logo />
      <Navigation />
      <UserImageIcon/>
    </SideBarStyled>
  );
}

export default SideBar;
