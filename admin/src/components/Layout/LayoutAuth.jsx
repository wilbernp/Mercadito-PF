import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./layoutauth.css";

const LayoutAuth = ({ children }) => {
  let { profile, cargando } = useSelector((state) => state.userReducer);

  const navigate = useHistory();

  if (cargando)
    return (
      <div className="spinner_auth">
        <Spinner />
      </div>
    );

  return (
    <>
      {profile._id ? (
        navigate.push("/")
      ) : (
        <section className="containerAuth forms">{children}</section>
      )}
    </>
  );
};

export default LayoutAuth;
