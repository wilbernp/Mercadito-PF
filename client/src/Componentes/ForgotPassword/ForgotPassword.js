import React, { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Alerta from "../Alerta/Alerta";
import LayoutAuth from "../Layout/LayoutAuth";

const ForgotPassword = () => {
  const [cargando, setCargando] = useState(false);
  const [email, setEmail] = useState("");

  const [alerta, setAlerta] = useState({ msg: "", categoria: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if ([email].includes("")) {
        setAlerta({
          msg: "Todos los campos son obligatorios",
          categoria: "error",
        });

        setTimeout(() => {
          setAlerta({ msg: "", categoria: "" });
        }, 3000);

        return;
      }

      setAlerta({ msg: "", categoria: "" });

      setCargando(true);

      const { data } = await clienteAxios.post(`/users/olvide-contrasenia`, {
        email,
      });

      setAlerta({ msg: data.msg, categoria: "info" });

      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 3000);

      setCargando(false);

      setEmail("");
    } catch (err) {
      if (!err.response) {
        setAlerta({
          msg: "Fallas internas, por favor inténtelo más tarde.",
          categoria: "error",
        });
      } else {
        setAlerta({
          msg: err.response.data.msg,
          categoria: "error",
        });
      }
      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 3000);
    }
    setCargando(false);
  };

  const { msg } = alerta;

  return (
    <LayoutAuth>
      <div className="form login">
        <div className="form-content">
          <header>Olvide Contraseña</header>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Correo"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>

            <div className="field button-field">
              <button>Iniciar Sesión</button>
            </div>

            <div className="form-link">
              <span>
                ¿Ya tienes una cuenta?{" "}
                <Link to="login" className="link login-link">
                  Iniciar Sesión
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default ForgotPassword;
