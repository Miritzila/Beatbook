import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Grupos = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>Esto es una prueba grupos</h1>
		</div>
	);
};
