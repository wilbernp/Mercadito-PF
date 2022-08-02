import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import Order from "../Order/Order";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.scss";
import carrito from "../icons/carrito.png";
import user from "../icons/user.png";
import corazon from '../icons/heart_t.png'
import bag from "../icons/bag.png";
import hamburguesa from '../icons/menu.png';
import dots from '../icons/dots.png'
import { authenticate, logoutUser } from "../../redux/user/userActions";
import { googleLogout } from "@react-oauth/google";
import MenuPerfil from "../PerfilUsuario/MenuPerfil";
import { AppBar } from "@mui/material";
import MenuBar from "../MenuBar/MenuBar";

export default function NavBar() {

  let history = useHistory()
  let { currentPage } = useSelector((state) => state.reducer);
  useEffect(() => {
    dispatch(authenticate());
  }, []);

  let { profile } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  function logout() {

    googleLogout();
    dispatch(logoutUser());
    if (profile._id) {
      history.push("/")
    }
  }

  return (
    <div className="containerNavbar">
      <nav className="nav">
        <ul className="contentButton">
          <li className="logo">
            <Link to="/" className="logo">
              <h1>Mercadito</h1>
              <h5>COMPRA Y VENDE SEGURO</h5>
            </Link>
          </li>
          <SearchBar />
          {/* <li className='item'>
                <a href="!#">Crear cuenta</a>
              </li> */}

          <li className="item">
            <Link to="/shoping-car"><img src={carrito} />Carrito</Link>
          </li>


          {profile?._id && <li className="item">
            <Link to="/favorites"><img src={corazon} />Favoritos</Link>
          </li>}


          {/* {profile?._id &&<li className="item">
            <Link to="/create"><img src={bag}/>Vender</Link>
          </li>} */}

          {profile?.profile_picture ? (
            <>
              <li className="item">
                {/* <Link onClick={logout}>
                <img className="profile" src={`${profile?.profile_picture}`}
                />
               Cerrar Sesion
              </Link> */}
                <MenuPerfil image={profile?.profile_picture} lagout={() => {
                  googleLogout();
                  dispatch(logoutUser());
                  if (profile._id) {
                    history.push("/")
                  }
                }} />
              </li>
            </>
          ) : (
            <li className="item">
              <Link to="/login">
                <img src={user} />
                Iniciar sesion
              </Link>
            </li>
          )}



          {/* <li className="item">
          <Link to="/shoping-car"><img src={carrito} /></Link>
          </li> */}

          {/* 
         {profile?._id&& <li className="item">
            <Link to="/favorites">Favoritos</Link>
          </li>} */}


          {/* {profile?._id &&<li className="item">
            <Link to="/create"className="i">Vender</Link>
          </li>} */}



          {/* <li className="item">
            <Link to="/my-shoping">
              <img src={bag} />
              Mis compras
            </Link>
          </li> */}
          {/* {profile?._id && <li className="item">
            <Link to="/carrito"> <img src={carrito} /></Link>
            </li>} */}
          {/* <li className="item">
            <Link to="/shoping-car">
              <img src={carrito} />
              Carrito
            </Link>
          </li> */}
        </ul>
      </nav>

      <div className="categories">
        <ul className="contentCategory">
          <div className="dropdown">
            <img src={hamburguesa} />
            <h4 className="categoria">Ver todas las categorias</h4>
            <div className='dropdown-content' >
              <Filter />
            </div>
          </div>
          {currentPage > 0 && (
            <div className='order-category'>
              <img src={dots} />
              <h2>Ordenar por</h2>
              <div className='order'>
                <Order />
              </div>
            </div>
          )}
        </ul>
      </div>
      {/* <MenuBar/> */}
    </div>
  );
}
