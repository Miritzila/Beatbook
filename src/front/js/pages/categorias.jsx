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
        window.location.href = `categoriamusical/${category.id}`;
    };

    return (
        <BentoBox
            title="Categorías Musicales"
            data={store.musicalCategories}
            onClickItem={handleCategoryClick}
        />
    );
};
