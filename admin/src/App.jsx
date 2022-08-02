import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Sidebar from "./components/sidebar/Sidebar";
import ListProducts from "./pages/listProducts/ListProducts";
import Edit from "./pages/edit/Edit";
import Login from "./pages/login/Login";
import { useLocation, useNavigate } from "react-router-dom";
// import FormEditPerfil from "./components/FormEditPerfil/FormEditPerfil";
// import Login from "./pages/login/Login";

const ProtectedRoute = () => {
  let token = localStorage.getItem("token-admin")
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  let navigate = useNavigate()
  const { darkMode } = useContext(DarkModeContext);
  

  // useEffect(()=>{
  //   if (!token) {
  //     navigate("/login")
  //   }
  // },[])
    


  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* <Sidebar/> */}
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute/>}>
            {/* <Route path="edit-perfil" element={<FormEditPerfil/>}/> */}
            <Route index element={<Home />} />
            
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ListProducts />} />
              <Route path=":productId" element={<Single />} />
              <Route path="edit/:id" element={<Edit/>}/>
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
