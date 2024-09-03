import React, { useState } from "react";
import "../../styles/loginmodal.css";

export const LoginModal = ({ onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isFlipped ? "flipped" : ""}`}>
        <section>
          <div className="container">
            <div className="d-flex justify-content-center">
              <div>
                <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                  <div className="card-body text-center">
                    {!isFlipped ? (
                      <div className="pb-5">
                        <p className="close-modal" onClick={onClose}>×</p>
                        <h2>Inicia sesión</h2>
                        <p className="text-white-50 mb-4">¡Sigue el ritmo de la mejor música en vivo!</p>
                        <div data-mdb-input-init className="form-outline form-white mb-3">
                          <input type="username" id="typeUsername" className="form-control" />
                          <label className="form-label" htmlFor="typeUsername">Usuario</label>
                          <input type="email" id="typeEmailX" className="form-control" />
                          <label className="form-label" htmlFor="typeEmailX">Email</label>
                        </div>
                        <div data-mdb-input-init className="form-outline form-white mb-3">
                          <input type="password" id="typePasswordX" className="form-control" />
                          <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                        </div>
                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>
                      </div>
                    ) : (
                      <div className="pb-5">
                        <div className="card-back">
                          <p className="close-modal" onClick={onClose}>×</p>
                          <h2>Regístrate</h2>
                          <p className="text-white-50 mb-4">¡Únete a la revolución de la música en vivo!</p>
                          <div data-mdb-input-init className="form-outline form-white mb-3">
                            <input type="username" id="typeUsername" className="form-control" />
                            <label className="form-label" htmlFor="typeUsername">Usuario</label>
                            <input type="text" id="typeNameX" className="form-control" />
                            <label className="form-label" htmlFor="typeNameX">Email</label>
                          </div>
                          <div data-mdb-input-init className="form-outline form-white mb-3">
                            <input type="email" id="typeEmailX" className="form-control" />
                            <label className="form-label" htmlFor="typeEmailX">Contraseña</label>
                          </div>
                          <div data-mdb-input-init className="form-outline form-white mb-3">
                            <input type="password" id="typePasswordX" className="form-control" />
                            <label className="form-label" htmlFor="typePasswordX">Confirma la contraseña</label>
                          </div>
                          <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Registrarse</button>
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="mb-0">
                        {isFlipped ? (
                          <span>
                            ¿Ya tienes cuenta?{" "}
                            <a href="#!" onClick={handleFlip} className="text-white-50 fw-bold">
                              Entra
                            </a>
                          </span>
                        ) : (
                          <span>
                            ¿No tienes cuenta?{" "}
                            <a href="#!" onClick={handleFlip} className="text-white-50 fw-bold">
                              Regístrate
                            </a>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
