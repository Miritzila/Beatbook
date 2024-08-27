import React, { useState } from "react";
import { LoginModal } from "./LoginModal";

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
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1724684398/ax5jxsybd5zg8vfeoxp6.png"
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
              onClick={handleButtonClick}
            >
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </div>
      </nav>

      {showModal && (
        <LoginModal onClose={handleCloseModal} />
      )}
    </>
  );
};
