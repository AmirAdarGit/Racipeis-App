import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOutButtonStyle } from "../../style/LogOutComponent.styled";
import { useNavigate } from "react-router-dom";
import { setUserLogOut } from "../../functions/registerDB.Queries";
import { getUserProfile } from "../../redux/selectors/user.selector";


interface Props {

}

export const LogOutComponent: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userProfile = useSelector(getUserProfile);

  const signOutWithGoogle = async () => {
    // handleLogout(popupState)
    dispatch({ type: 'LOGOUT' }); // clean the user redux state.
    dispatch({ type: 'REMOVE_PRIVATE_RECIPES_FROM_STATE' }); // clean the recipes redux state.
    dispatch({ type: 'REMOVE_SEARCH_PUBLIC_RECIPES' }); // clean the recipes redux state.
    await setUserLogOut(userProfile.userAuthId)
    navigate('/')
  }

  return (
    <div>
      <LogOutButtonStyle onClick={signOutWithGoogle}>Log out</LogOutButtonStyle>
    </div>
  )
}

export default LogOutComponent;
