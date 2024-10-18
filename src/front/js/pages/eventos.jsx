import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { BentoBox } from "../component/BentoBox";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Eventos = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // Obtiene los eventos de la API al montar el componente
    useEffect(() => {
        actions.getAllEvents();
    }, [actions]);

    // Redirige al evento seleccionado
	const handleEventClick = (event) => {
		const eventName = event.name ? event.name.trim().replace(/ /g, "_") : '';
		navigate(`/eventos/${eventName}`);
	};

    // Verifica si los eventos están disponibles en el store
    if (!store.events || store.events.length === 0) {
        return <div className="text-center">Cargando categorías...</div>;
    }

    return (
        <BentoBox
            title="Eventos"
            data={store.events}
            onClickItem={handleEventClick}
        />
    );
};
