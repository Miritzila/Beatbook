import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Eventos = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<h1>Eventos</h1>
		</div>
	);
};
