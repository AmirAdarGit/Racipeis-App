import { User } from "../../utils/interfaces";


const initialState: User = {
  name: '',
  userAuthId: '',
  userDBID: '',
  email: '',
  isLogIn: false,
};
function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        name: action.payload.name,
        userAuthId: action.payload.userAuthId,
        userDBID: action.payload._id,
        email: action.payload.email,
        isLogIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        name: '',
        userAuthId: '',
        email: '',
        isLogIn: false,
      };

    default:
      return state;
  }
}

export default userReducer;