import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import userReducer from "./user/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ reducer, userReducer }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
