import React, { useEffect, useState, useContext } from "react";
import "../../styles/detalles.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const DetalleLugar = () => {
	const { store, actions } = useContext(Context);
	const [place, setPlace] = useState(null);
	const [events, setEvents] = useState([]);
	const { id } = useParams();

	// Función para obtener los datos de un lugar
	useEffect(() => {
		actions.getPlaceById(id)
			.then((data) => {
				if (data) {
					setPlace(data);
				} else {
					console.error(`Place with ID ${id} not found`);
					setPlace(null);
				}
			})
			.catch((error) => {
				console.error('Error fetching place:', error);
				setPlace(null);
			});

		// función para obtener los eventos de un lugar
		actions.getPlaceByIdEvents(id)
			.then((data) => {
				if (Array.isArray(data)) {
					setEvents(data);
				} else {
					console.error('Data is not an array:', data);
					setEvents([]);
				}
			})
			.catch((error) => {
				console.error('Error fetching events:', error);
				setEvents([]);
			});
	}, [id]);

	return (
		<div className="container">
		{place && (
			<div>
				<div className='Banner'>
					<img src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1728055562/ofxdtmxwkwe7sdxzailz.jpg" className='img-fluid' ></img>
				</div>
				<div className="container text-start placeData">
					<div className="row align-items-center">
						<div className="col">
							<br></br>
							<img className='ProfilePicture' src={place.profile_picture} alt='perfil' />
						</div>
						<div className="col-8">
							<h1 className='ms-2'>{place.name}</h1>
							<p className='ms-2'>{place.description}</p>
						</div>
						<div className="col">
						</div>
					</div>
				</div>
				<div className="container text-center align-items-center">
					<div className="row">
						<div className="col">
							<div className="cardContent">
								<h4>Dirección</h4>
								<p>{place.address}</p>
							</div>
							<div className="cardContent">
								<h4>Teléfono</h4>
								<p>{place.phone}</p>
								<h4>Redes sociales</h4>
								<div className='socialNetwork'>
									<a href={place.instagram} className="card-link"> <i className="fa-brands icono fa-instagram fa-2xl"></i></a>
									<a href={place.tiktok} className="card-link"><i className="fa-brands icono fa-tiktok fa-2xl"></i></a>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="cardContent">
								<h4>Próximos Eventos</h4>
							</div>
							{/*Card eventos*/}
							<div className="cardContent card mb-3">
								{events.map((event) => (
									<div key={event.id} className="position-relative">
										<Link to={`/eventos/${event.id}`}>
											<img src={event.profile_picture} className="card-img-top eventPicture" alt="event_picture" />
										</Link>
										<div className="card-body">
											<h4>{event.name}</h4>
											<p>{event.description}</p>
										</div>
										<div className="gradient-overlay"></div>
									</div>
								))}
							</div>
						</div>
						{/*Fin Card eventos*/}
					</div>
				</div>
			</div>
		)
		}
	</div >
);
}