import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { BentoBox } from "../component/BentoBox";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Lugares = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	// Obtiene los lugares de la API al montar el componente
	useEffect(() => {
		actions.getAllPlaces();
	}, [actions]);

	// Redirige al grupo seleccionado
	const handlePlaceClick = (place) => {
		const placeName = place.name ? place.name.trim().replace(/ /g, "_") : '';
		navigate(`/lugares/${placeName}`);
	};

	// Verifica si los lugares están disponibles en el store
	if (!store.places || store.places.length === 0) {
		return <div className="text-center">Cargando lugares...</div>;
	}

	return (
		<BentoBox
			title="Lugares"
			data={store.places}
			onClickItem={handlePlaceClick}
		/>
	);
}