import React, { useEffect, useState, useContext } from "react";
import "../../styles/detalles.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DetalleEvento = () => {
	const { actions } = useContext(Context);
	const [event, setEvent] = useState(null);
	const { name } = useParams();

	// Función para obtener los datos de un evento
	useEffect(() => {
		const encodedName = encodeURIComponent(name);
		actions.getEventByName(encodedName)
			.then((data) => {
				if (data) {
					setEvent(data);
				} else {
					console.error(`Event with name ${encodedName} not found`);
					setEvent(null);
				}
			})
			.catch((error) => {
				console.error('Error fetching event:', error);
				setEvent(null);
			});
	}, [name, actions]);

	return (
		<div className="container">
            {event && (
                <div>
                    <div className="Banner">
                        <img
                            src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1728055963/h0kfvukd3ehdae7eupm6.jpg"
                            className="img-fluid"
                            alt="Banner"
                        />
                    </div>
                    <div className="container text-start eventData">
                        <div className="row align-items-center">
                            <div className="col">
                                <br />
                                <img
                                    className="ProfilePicture"
                                    src={event.profile_picture}
                                    alt="Perfil"
                                />
                            </div>
                            <div className="col-8">
                                <h1 className="ms-2">{event.name}</h1>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                    <div className="container text-center align-items-center">
                        <div className="row">
                            <div className="col">
                                <div className="cardContent">
                                    <h4>Detalles</h4>
                                    <p className="ms-2">{event.description}</p>
                                </div>
                                <div className="cardContent">
                                    <h4>Miembros</h4>
                                    <div className="card-members">
                                    </div>
                                </div>
                                <div className="cardContent">
                                    <h4>Redes sociales</h4>
                                    <div className="socialNetwork">
                                        <a href={event.instagram} className="card-link">
                                            <i className="fa-brands icono fa-instagram fa-2xl"></i>
                                        </a>
                                        <a href={event.tiktok} className="card-link">
                                            <i className="fa-brands icono fa-tiktok fa-2xl"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="cardContent">
                                    <h4>Próximos Eventos</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};