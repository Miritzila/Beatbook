import React, { useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLoginButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1724684398/ax5jxsybd5zg8vfeoxp6.png"
              alt="Brand Logo"
              style={{ maxWidth: '150px', height: 'auto' }}
            />
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/perfil">Mi Perfil</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/mis-eventos">Mis Eventos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/configuracion">Configuración</a>
                  </li>
                  <li className="nav-item">
                    <button 
                      className="btn btn-outline-light nav-link" 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/categorias">Categorias</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/grupos">Grupos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/lugares">Lugares</a>
                  </li>
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

      {showModal && !isLoggedIn && (
        <LoginModal onClose={handleCloseModal} />
      )}
    </>
  );
};
