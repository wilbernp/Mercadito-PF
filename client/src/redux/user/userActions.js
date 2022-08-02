// Config
import clienteAxios from "../../config/axios";
import TokenAuth from "../../config/tokenAuth";

// Types
import {
  ERROR,
  GET_USER,
  LOADING_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../actionsTypes";

function authenticate() {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch({
          type: LOADING_USER,
        });
        return;
      }

      const { data } = await clienteAxios.get(`/users`, TokenAuth(token));

      dispatch({
        type: GET_USER,
        payload: data,
      });
      dispatch({
        type: LOADING_USER,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: ERROR,
        payload: err.response.data.msg,
      });
    }
  };
}

function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

function registerUser(user) {
  return {
    type: REGISTER_USER,
    payload: user,
  };
}

function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export { authenticate, loginUser, registerUser, logoutUser };
