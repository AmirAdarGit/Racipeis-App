import { User } from "../../utils/interfaces";


const initialState: User = {
  name: '',
  email: '',
  isLogIn: false,
};
function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        name: action.payload.displayName,
        email: action.payload.email,
        isLogIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        name: '',
        email: '',
        isLogIn: false,
      };

    default:
      return state;
  }
}

export default userReducer;