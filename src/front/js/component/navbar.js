import React, { useState, useContext, useEffect } from "react";
import { LoginModal } from "./loginModal";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Verificamos si el usuario está logueado al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      actions.checkLoginStatus();
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  // Función para mostrar el modal
  const handleLoginButtonClick = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/inicio">
            <img
              src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1724684398/ax5jxsybd5zg8vfeoxp6.png"
              className="logo"
              alt="Logo"
            />
          </a>
          <div className="collapse navbar-collapse">
            <a className="nav-link" href="/categorias">Categorias</a>
            <a className="nav-link" href="/eventos">Eventos</a>
            <a className="nav-link" href="/grupos">Grupos</a>
            <a className="nav-link" href="/lugares">Lugares</a>
            <ul className="navbar-nav ms-auto">
              {store.isLoggedIn ? ( // Verificamos si el usuario está logueado
                <>
                  <a className="nav-link" href="/perfil">Mi Perfil</a>
                
                  <div className="dropdown">
                    <button className="profile_picture" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={store.user.profile_picture} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><a className="dropdown-item logout" onClick={handleLogout}>Logout</a></li>
                    </ul>
                  </div>
                

                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light nav-link"
                      onClick={handleLoginButtonClick}
                    >
                      Login
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {showModal && !store.isLoggedIn && ( // Mostramos el modal si no está logueado
        <LoginModal onClose={handleCloseModal} />
      )}
    </>
  );
};
