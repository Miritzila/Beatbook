import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { BentoBox } from "../component/BentoBox";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Grupos = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	// Obtiene los grupos de la API al montar el componente
	useEffect(() => {
		actions.getAllBands();
	}, [actions]);

	// Redirige al grupo seleccionado
	const handleGroupClick = (group) => {
		// Asegúrate de acceder al campo correcto dentro de `group`
		const groupName = group.name ? group.name.trim().replace(/ /g, "_") : '';
		
		// Redirige al grupo seleccionado
		navigate(`/grupo/${groupName}`);
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
};
