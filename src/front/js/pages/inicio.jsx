import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CarouselCard } from "../component/CarouselCard.js";

export const Inicio = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [activeIndex, setActiveIndex] = useState(0);

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

    // Función para obtener los datos de la API
    useEffect(() => {
        actions.getAllEvents();
        actions.getAllPlaces();
        actions.getAllBands();
        actions.getAllmusicalCategories();
    }, [actions]);

    // Función para manejar el cambio de índice del carrusel
    const handleSlide = (newIndex) => {
        setActiveIndex(newIndex);
    };

    return (
        <div className="container">
            <div className="col text-center my-3">
                <h1>Descubre nuestros eventos</h1>
                <p>Elige el mejor plan</p>
            </div>
            {/* Carrusel */}
            <div className="container">
                <div className="col justify-content-center">
                    <div className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {store.events && store.events.map((event, idx) => (
                                <div key={idx} className={`carousel-item ${idx === activeIndex ? 'active' : ''} c-item`}>
                                    <a onClick={() => handleLearnMore(event.id)}>
                                        <img src={event.profile_picture} className="d-block w-100 c-img" />
                                    </a>
                                    <div className="carousel-caption text-center">
                                        <h3>{event.name}</h3>
                                        <p>{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev"
                            onClick={() => handleSlide(activeIndex === 0 ? store.events.length - 1 : activeIndex - 1)}
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next"
                            onClick={() => handleSlide((activeIndex + 1) % store.events.length)}
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Cards de locales */}
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                    </div>
                    <div class="col">
                        <h3 className="text-start my-3"> Locales</h3>
                        <CarouselCard items={store.places} itemType="lugares" />
                    </div>
                    <div class="col">
                    </div>
                </div>
            </div>
            {/* Cards de grupos */}
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                    </div>
                    <div class="col">
                        <h3 className="text-start my-3">Grupos</h3>
                        <CarouselCard items={store.bands} itemType="lugares" />
                    </div>
                    <div class="col">
                    </div>
                </div>
            </div>
        </div>
    );
};
