import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Inicio = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<h1>Inicio</h1>
		</div>
	);
};
