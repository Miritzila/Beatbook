import React, { useEffect, useContext } from "react";
import { BentoBox } from "../component/BentoBox";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Categorias = () => {
    const { store, actions } = useContext(Context);

    // Obtiene las categorías musicales de la API al montar el componente
    useEffect(() => {
        actions.getAllmusicalCategories();
    }, [actions]);

    // Redirige a la categoría seleccionada
    const handleCategoryClick = (category) => {
        window.location.href = `categoria/${category.id}/eventos`;
    };

    // Verifica si las categorías están disponibles en el store
    if (!store.musicalCategories || store.musicalCategories.length === 0) {
        return <div className="text-center">Cargando categorías...</div>;
    }

    return (
        <BentoBox
            title="Categorías Musicales"
            data={store.musicalCategories}
            onClickItem={handleCategoryClick}
        />
    );
};
