import React, { useState } from "react";
import { LoginModal } from "./LoginModal"; // Asegúrate de ajustar la ruta de importación si es necesario

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1723219062/Beatbook/pk3vv06poximcreu10oi.png"
              alt="Brand Logo"
              style={{ maxWidth: '150px', height: 'auto' }}
            />
          </a>
          <div>
            <a className="me-3" href="/categorias">Categorias</a>
            <a className="me-3" href="/grupos">Grupos</a>
            <a className="me-3" href="/lugares">Lugares</a>
          </div>
          <div className="dropdown">
            <button 
              className="btn btn-light"
              type="button" 
              onClick={handleButtonClick} // Maneja el clic del botón para mostrar el modal
            >
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </div>
      </nav>

      {showModal && (
        <LoginModal onClose={handleCloseModal} /> // Pasar una función para cerrar el modal
      )}
    </>
  );
};
