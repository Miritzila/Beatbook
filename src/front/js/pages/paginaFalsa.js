import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const PaginaFalsa = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>Esto es una prueba</h1>
		</div>
	);
};
