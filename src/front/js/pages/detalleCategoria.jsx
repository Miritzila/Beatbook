import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { BentoBox } from "../component/BentoBox";

export const DetalleCategoria = () => {
    const [events, setEvents] = useState([]);
    const { actions } = useContext(Context);
    const { name } = useParams();
    const navigate = useNavigate();

    // Función para obtener los eventos de una categoría musical
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await actions.getMusicalCategoryByNameEvents(name);
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error("Data is not an array:", data);
                    setEvents([]);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]);
            }
        };
        fetchEvents();
    }, [name, actions]);

    // Redirige al evento seleccionado
    const handleEventClick = (event) => {
        const formattedName = event.name.replace(/\s+/g, '');
        navigate(`/eventos/${formattedName}`);
    };

    return (
        <div className="container text-center">
            <h1>Eventos de música {name}</h1>
            <BentoBox
                data={events}
                onClickItem={handleEventClick}
            />
        </div>
    );
};
