import React, { useEffect, useContext } from "react";
import { BentoBox } from "../component/BentoBox";
import { Context } from "../store/appContext";

export const Categorias = () => {
    const { store, actions } = useContext(Context);

    // Obtiene las categorías musicales de la API al montar el componente
    useEffect(() => {
        actions.getAllmusicalCategories();
    }, [actions]);

    // Redirige a la categoría seleccionada
    const handleCategoryClick = (category) => {
        const formattedName = category.name.replace(/\s+/g, '');
        window.location.href = `categorias/${formattedName}`;
    };

    return (
        <BentoBox
            title="Categorías Musicales"
            data={store.musicalCategories}
            onClickItem={handleCategoryClick}
        />
    );
};
