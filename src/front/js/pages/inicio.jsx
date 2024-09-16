import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Inicio = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

// Si no hay token, redirige a la página de inicio

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

// Función para redirigir a la página de detalles del evento
    const handleLearnMore = (id) => {
        navigate(`/events/${id}`);
    };

// Función para mostrar todos los eventos
    useEffect(() => {
        actions.getAllEvents();
    }, []);

    return (
        <div className="container">
            <div className="text-center">
                <h1>Descubre nuestros eventos</h1>
                <p>Elige el mejor plan</p>
            </div>
            
        </div>
    );
};
