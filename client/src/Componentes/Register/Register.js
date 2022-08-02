import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Config
import clienteAxios from "../../config/axios";

// Components
import Alerta from "../Alerta/Alerta";
import Spinner from "../Spinner/Spinner";

// Layout
import LayoutAuth from "../Layout/LayoutAuth";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/user/userActions";

const Register = () => {
  const navigate = useHistory();

  const [usuario, setUsuario] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    passwordconf: "",
  });

  const dispatch = useDispatch();

  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);

  const { name, lastname, email, password, passwordconf } = usuario;

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, lastname, email, password, passwordconf].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        categoria: "error",
      });
      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 3000);
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseñia debe ser mínimo de 6 caracteres",
        categoria: "error",
      });
      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 3000);
      return;
    }

    if (password !== passwordconf) {
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

    try {
      setCargando(true);

      const { data } = await clienteAxios.post(`/users/signup`, {
        name,
        lastname,
        email,
        password,
        typeUser: "N",
      });

      localStorage.setItem("token", data.token);

      dispatch(registerUser(data.user));

      setCargando(false);

      setAlerta({
        msg: "Usuario registrado correctamente",
        categoria: "success",
      });

      setUsuario({
        name: "",
        lastname: "",
        email: "",
        password: "",
        passwordconf: "",
      });

      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 1000);

      setTimeout(() => {
        navigate.push("/");
      }, 2000);
    } catch (err) {
      console.log(err);
      setAlerta({
        msg: err.response.data.msg,
        categoria: "error",
      });
      setTimeout(() => {
        setAlerta({ msg: "", categoria: "" });
      }, 3000);
      setCargando(false);
    }
  };

  const { msg } = alerta;

  return (
    <LayoutAuth>
      <div className="form signup">
        <div className="form-content">
          <header>Regístrate</header>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Nombre"
                className="input"
                name="name"
                onChange={handleChange}
                value={name}
              />
            </div>

            <div className="field input-field">
              <input
                type="text"
                placeholder="Apellido"
                className="input"
                name="lastname"
                onChange={handleChange}
                value={lastname}
              />
            </div>

            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Contraseña"
                className="password"
                name="password"
                onChange={handleChange}
                value={password}
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                className="password"
                name="passwordconf"
                onChange={handleChange}
                value={passwordconf}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            {cargando ? (
              <Spinner />
            ) : (
              <div className="field button-field">
                <button>Regístrate</button>
              </div>
            )}
          </form>

          <div className="form-link">
            <span>
              ¿Ya tienes una cuenta?{" "}
              <Link to="login" className="link login-link">
                Iniciar Sesión
              </Link>
            </span>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default Register;
