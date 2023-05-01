import React, { useEffect } from "react";
import SignOutComponent from "./SignOut";

import { registerUser } from "../functions/register";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../redux/selectors/user.selector";


interface Props {
  userData: any;
}
export const UserLandingPage: React.FC<Props> = ({userData}) => {
  const userProfile = useSelector(getUserProfile);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!userProfile.isLogIn && userData){
      registerUser(userData)
        .then((userMetaData) => {
          dispatch({ type: 'LOGIN', payload: userMetaData })
        })
    }
    },[userData])

  return (<>
      <div>UserLandingPage</div>
      <SignOutComponent/>
    </>
  )
}

export default UserLandingPage;

