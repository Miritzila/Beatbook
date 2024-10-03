import React, { useEffect, useContext } from "react";
import { BentoBox } from "../component/BentoBox";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Eventos = () => {
    const { store, actions } = useContext(Context);

    // Obtiene los eventos de la API al montar el componente
    useEffect(() => {
        actions.getAllEvents();
    }, [actions]);

    // Redirige al evento seleccionado
    const handleEventClick = (event) => {
        window.location.href = `eventos/${event.id}`;
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
