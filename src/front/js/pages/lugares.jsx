import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Lugares = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<h1>Lugares</h1>
		</div>
	);
};
