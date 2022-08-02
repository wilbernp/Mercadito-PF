import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Alerta from "../Alerta/Alerta";
import LayoutAuth from "../Layout/LayoutAuth";

const NewPassword = () => {
  let { token } = useParams();

  const navigate = useHistory();

  const [alerta, setAlerta] = useState({
    msg: "",
    categoria: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    nuevaPassword: "",
    passwordConf: "",
  });

  const { nuevaPassword, passwordConf } = passwordForm;

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if ([nuevaPassword, passwordConf].includes("")) {
        setAlerta({
          msg: "Todos los campos son obligatorios",
          categoria: "error",
        });
        setTimeout(() => {
          setAlerta({ msg: "", categoria: "" });
        }, 3000);
        return;
      }

      if (nuevaPassword.length < 6) {
        setAlerta({
          msg: "La contraseñia debe ser mínimo de 6 caracteres",
          categoria: "error",
        });
        setTimeout(() => {
          setAlerta({ msg: "", categoria: "" });
        }, 3000);
        return;
      }

      if (nuevaPassword !== passwordConf) {
        setAlerta({
          msg: "Las contraseñias no son iguales ",
          categoria: "error",
        });
        setTimeout(() => {
          setAlerta({ msg: "", categoria: "" });
        }, 3000);
        return;
      }

      setAlerta({ msg: "", categoria: "" });

      const { data } = await clienteAxios.post(
        `/users/nueva-contrasenia/${token}`,
        {
          nuevaPassword,
        }
      );

      setAlerta({ msg: data.msg, categoria: "success" });

      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 1000);

      setPasswordForm({
        nuevaPassword: "",
        passwordConf: "",
      });

      setTimeout(() => {
        navigate.push("/login");
      }, 1000);
    } catch (err) {
      setAlerta({ msg: err.response.data.msg, categoria: "error" });
      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 3000);
    }
  };

  const { msg } = alerta;

  return (
    <LayoutAuth>
      <div className="form">
        <div className="form-content">
          <header>Nueva Contraseña</header>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Contraseñia"
                className="password"
                onChange={handleChange}
                name="nuevaPassword"
                value={nuevaPassword}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirmar Contraseñia"
                className="password"
                onChange={handleChange}
                name="passwordConf"
                value={passwordConf}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field button-field">
              <button>Guardar Contraseña</button>
            </div>

            <div className="form-link">
              <Link to="/login">Iniciar Sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default NewPassword;
