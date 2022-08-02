// Types
import {
  ERROR,
  GET_USER,
  LOADING_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../actionsTypes";

let initState = {
  profile: "",
  error: "",
  cargando: true,
};

function userReducer(state = initState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        profile: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        profile: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        profile: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        profile: "",
      };
    case ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        profile: "",
        error: action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        cargando: false,
      };
    default:
      return state;
  }
}

export default userReducer;
