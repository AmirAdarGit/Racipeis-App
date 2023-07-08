import * as React from 'react';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";
import { getUserProfile } from "../../redux/selectors/user.selector";
import { UserIconButtonStyled } from "../../style/userImageIcon.styled";
import LogOutComponent from "../Authentication/SignOut";


interface Props {
}

export const UserImageIcon: React.FC<Props> = () => {

  const userProfile = useSelector(getUserProfile);
  return (
      <PopupState variant="popper" popupId="demo-popup-popper">
        { (popupState: any) => (
          <div>
            <div style={ {height: "50px", width: "50px"} }>
              <UserIconButtonStyled url={ userProfile.photoURL }
                                    variant="contained" { ...bindToggle(popupState) } ></UserIconButtonStyled>
            </div>
            <Popper { ...bindPopper(popupState) } transition>
              { ({TransitionProps}) => (
                <Fade { ...TransitionProps } timeout={ 350 }>
                  <Paper id="popupContainer">
                    <Typography sx={ {p: 2} }>
                      <LogOutComponent />
                    </Typography>
                  </Paper>
                </Fade>
              ) }
            </Popper>
          </div>
        ) }
      </PopupState>
  );
}

export default UserImageIcon;
