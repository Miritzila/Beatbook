import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import { BentoBox } from "../component/BentoBox";
import "../../styles/home.css";

export const DetalleCategoria = () => {
    const [events, setEvents] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    const { actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    // Función para obtener los eventos de una categoría musical
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await actions.getMusicalCategoryByIdEvents(id);
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

        // Función para obtener el nombre de la categoría musical
        const fetchCategoryName = async () => {
            try {
                const data = await actions.getMusicalCategoryById(id);
                if (data) {
                    setCategoryName(data.name);
                } else {
                    console.error(`Category with ID ${id} not found`);
                    setCategoryName("");
                }
            } catch (error) {
                console.error("Error fetching category:", error);
                setCategoryName("");
            }
        };

        fetchEvents();
        fetchCategoryName();
    }, [id, actions]);

    // Redirige al evento seleccionado
    const handleEventClick = (event) => {
        navigate(`/eventos/${event.id}`);
    };

    return (
        <div className="container text-center">
            <h1>Eventos de música {categoryName}</h1>
            <BentoBox
                data={events}
                onClickItem={handleEventClick}
            />
        </div>
    );
};
