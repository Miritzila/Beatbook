import React, { useEffect, useState, useContext } from "react";
import "../../styles/detalles.css";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetalleGrupo = () => {
    const { store, actions } = useContext(Context);
    const [band, setBand] = useState(null);
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);
    const { id } = useParams();

    // Función para obtener los datos de un grupo
    useEffect(() => {
        actions.getBandById(id)
            .then((data) => {
                if (data) {
                    setBand(data);
                } else {
                    console.error(`Band with ID ${id} not found`);
                    setBand(null);
                }
            })
            .catch((error) => {
                console.error("Error fetching band:", error);
                setBand(null);
            });

        // Función para obtener los eventos de un grupo
        actions.getBandByIdEvents(id)
            .then((data) => {
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error("Data is not an array:", data);
                    setEvents([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                setEvents([]);
            });

        // Función para obtener los miembros de un grupo
        actions.getBandMembers(id)
            .then((data) => {
                if (Array.isArray(data)) {
                    setMembers(data);
                } else {
                    console.error("Data is not an array:", data);
                    setMembers([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching members:", error);
                setMembers([]);
            });
    }, [id]);

    return (
        <div className="container">
            {band && (
                <div>
                    <div className="Banner">
                        <img
                            src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1728055963/h0kfvukd3ehdae7eupm6.jpg"
                            className="img-fluid"
                            alt="Banner"
                        />
                    </div>
                    <div className="container text-start bandData">
                        <div className="row align-items-center">
                            <div className="col">
                                <br />
                                <img
                                    className="ProfilePicture"
                                    src={band.profile_picture}
                                    alt="Perfil"
                                />
                            </div>
                            <div className="col-8">
                                <h1 className="ms-2">{band.name}</h1>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                    <div className="container text-center align-items-center">
                        <div className="row">
                            <div className="col">
                                <div className="cardContent">
                                    <h4>Detalles</h4>
                                    <p className="ms-2">{band.description}</p>
                                </div>
                                <div className="cardContent">
                                    <h4>Miembros</h4>
                                    <div className="card-members">
                                        <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
                                            {members.length > 0 ? (
                                                members.map((member, index) => (
                                                    <div key={index}>
                                                        <Link to={`/profile/${member.id}`}>
                                                            <img
                                                                className="avatar"
                                                                alt={member.username}
                                                                src={member.profile_picture}
                                                            />
                                                        </Link>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No hay miembros disponibles</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="cardContent">
                                    <h4>Redes sociales</h4>
                                    <div className="socialNetwork">
                                        <a href={band.instagram} className="card-link">
                                            <i className="fa-brands icono fa-instagram fa-2xl"></i>
                                        </a>
                                        <a href={band.tiktok} className="card-link">
                                            <i className="fa-brands icono fa-tiktok fa-2xl"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="cardContent">
                                    <h4>Próximos Eventos</h4>
                                </div>
                                {/* Card eventos */}
                                <div className="cardContent card mb-3">
                                    {events.map((event) => (
                                        <div key={event.id} className="position-relative">
                                            <Link to={`/eventos/${event.id}`}>
                                                <img
                                                    src={event.profile_picture}
                                                    className="card-img-top eventPicture"
                                                    alt="event_picture"
                                                />
                                            </Link>
                                            <div className="card-body">
                                                <h4>{event.name}</h4>
                                                <p>{event.description}</p>
                                            </div>
                                            <div className="gradient-overlay"></div>
                                        </div>
                                    ))}
                                </div>
                                {/* Fin Card eventos */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
