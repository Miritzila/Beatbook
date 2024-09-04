import React, { useState } from "react";
import "../../styles/loginmodal.css";

export const LoginModal = ({ onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const endpoint = isFlipped ? '/api/sign_up' : '/api/log_in';
      
      // Ajustar el formato del cuerpo según el endpoint
      const body = isFlipped
        ? JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation
          })
        : JSON.stringify({
            email: formData.email,
            password: formData.password
          });

      const response = await fetch(`${process.env.BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      const data = await response.json();
      setSuccessMessage(isFlipped ? "Usuario registrado exitosamente" : "Inicio de sesión exitoso");
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
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
                        <form onSubmit={handleSubmit}>
                          <div className="form-outline form-white mb-3">
                            <input
                              type="text"
                              id="typeUsername"
                              name="username"
                              className="form-control"
                              value={formData.username}
                              onChange={handleChange}
                              placeholder="Usuario"
                            />
                            <label className="form-label" htmlFor="typeUsername">Usuario</label>
                          </div>
                          <div className="form-outline form-white mb-3">
                            <input
                              type="password"
                              id="typePasswordX"
                              name="password"
                              className="form-control"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Contraseña"
                            />
                            <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                          </div>
                          {isFlipped && (
                            <div className="form-outline form-white mb-3">
                              <input
                                type="password"
                                id="typePasswordConfirmationX"
                                name="passwordConfirmation"
                                className="form-control"
                                value={formData.passwordConfirmation}
                                onChange={handleChange}
                                placeholder="Confirma la contraseña"
                              />
                              <label className="form-label" htmlFor="typePasswordConfirmationX">Confirma la contraseña</label>
                            </div>
                          )}
                          <button
                            type="submit"
                            className="btn btn-outline-light btn-lg px-5"
                          >
                            {isFlipped ? "Registrarse" : "Entrar"}
                          </button>
                        </form>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        {successMessage && <p className="text-success">{successMessage}</p>}
                      </div>
                    ) : (
                      <div className="pb-5">
                        <div className="card-back">
                          <p className="close-modal" onClick={onClose}>×</p>
                          <h2>Regístrate</h2>
                          <p className="text-white-50 mb-4">¡Únete a la revolución de la música en vivo!</p>
                          <form onSubmit={handleSubmit}>
                            <div className="form-outline form-white mb-3">
                              <input
                                type="text"
                                id="typeUsername"
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Usuario"
                              />
                              <label className="form-label" htmlFor="typeUsername">Usuario</label>
                            </div>
                            <div className="form-outline form-white mb-3">
                              <input
                                type="email"
                                id="typeEmailX"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                              />
                              <label className="form-label" htmlFor="typeEmailX">Email</label>
                            </div>
                            <div className="form-outline form-white mb-3">
                              <input
                                type="password"
                                id="typePasswordX"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                              />
                              <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                            </div>
                            <div className="form-outline form-white mb-3">
                              <input
                                type="password"
                                id="typePasswordConfirmationX"
                                name="passwordConfirmation"
                                className="form-control"
                                value={formData.passwordConfirmation}
                                onChange={handleChange}
                                placeholder="Confirma la contraseña"
                              />
                              <label className="form-label" htmlFor="typePasswordConfirmationX">Confirma la contraseña</label>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-outline-light btn-lg px-5"
                            >
                              Registrarse
                            </button>
                          </form>
                          {errorMessage && <p className="text-danger">{errorMessage}</p>}
                          {successMessage && <p className="text-success">{successMessage}</p>}
                        </div>
                      </div>
                    )}
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
        </section>
      </div>
    </div>
  );
};
