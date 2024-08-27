import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const CrearLugar = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<h1>Esto es una prueba</h1>
		</div>
	);
};
