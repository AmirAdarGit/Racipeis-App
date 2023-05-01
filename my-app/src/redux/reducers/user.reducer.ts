

const initialState = {
  name: '',
  email: '',
  isLogIn: false,
  RecipesDBCollectionId: '',
  userDBCollectionId: '',
};

function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'LOGIN':
      debugger
      return {
        ...state,
        name: action.payload.displayName,
        email: action.payload.email,
        isLogIn: true,
        RecipesDBCollectionId: action.payload.RecipesDBCollectionId,
        userDBCollectionId:  action.payload.userDBCollectionId
      };
    case 'LOGOUT':
      return {
        ...state,
        name: '',
        email: '',
        isLogIn: false,
        RecipesDBCollectionId: '',
        userDBCollectionId:  ''
      };
    default:
      return state;
  }
}

export default userReducer;