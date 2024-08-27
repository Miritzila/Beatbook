import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const PaginaFalsa = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<h1>Pagina Falsa</h1>
		</div>
	);
};
