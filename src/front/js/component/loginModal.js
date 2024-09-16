import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
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
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  // Función para cambiar entre el formulario de login y el de registro
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Función para manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let success = false;

      if (isFlipped) {
        // Llamamos a la acción signUp del store
        success = await actions.signUp(
          formData.username,
          formData.email,
          formData.password,
          formData.passwordConfirmation
        );
        if (success) {
          setSuccessMessage("Usuario registrado exitosamente");
          navigate("/inicio");
        } else {
          setErrorMessage("Error al registrarse");
        }
      } else {
        // Llamamos a la acción login del store
        success = await actions.login(formData.username, formData.password);
        if (success) {
          setSuccessMessage("Inicio de sesión exitoso");
          navigate("/inicio");
        } else {
          setErrorMessage("Error en el inicio de sesión");
        }
      }

      if (success) {
        onClose();
      }
    } catch (error) {
      setErrorMessage("Error en la solicitud: " + error.message);
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
                          <button
                            type="submit"
                            className="btn btn-outline-light btn-lg px-5"
                          >
                            Entrar
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
                        <p className="card-back">
                          ¿Ya tienes cuenta?{" "}
                          <a href="#!" onClick={handleFlip} className="text-white-50 fw-bold">
                            Entra
                          </a>
                        </p>
                      ) : (
                        <p>
                          ¿No tienes cuenta?{" "}
                          <a href="#!" onClick={handleFlip} className="text-white-50 fw-bold">
                            Regístrate
                          </a>
                        </p>
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
