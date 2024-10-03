import React, { useEffect, useContext } from "react";
import { BentoBox } from "../component/BentoBox";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Lugares = () => {
	const { store, actions } = useContext(Context);

	// Obtiene los lugares de la API al montar el componente
	useEffect(() => {
		actions.getAllPlaces();
	}, [actions]);

	// Redirige al lugar seleccionado
	const handlePlaceClick = (place) => {
		window.location.href = `lugares/${place.id}`;
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