import React, { useEffect, useContext } from "react";
import { BentoBox } from "../component/BentoBox";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Grupos = () => {
	const { store, actions } = useContext(Context);

	// Obtiene los grupos de la API al montar el componente
	useEffect(() => {
		actions.getAllBands();
	}, [actions]);

	// Redirige al grupo seleccionado
	const handleGroupClick = (group) => {
		window.location.href = `grupos/${group.name}`;
	};

	// Verifica si los grupos están disponibles en el store
	if (!store.bands || store.bands.length === 0) {
		return <div className="text-center">Cargando grupos...</div>;
	}

	return (
		<BentoBox
			title="Grupos"
			data={store.bands}
			onClickItem={handleGroupClick}
		/>
	);
}