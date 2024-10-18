import React, { useEffect, useState, useContext } from "react";
import "../../styles/detalles.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const DetalleEvento = () => {
	const { actions } = useContext(Context);
    const [events, setEvents] = useState([]);
    const { name } = useParams();

	

	return (
		<div className="container text-center">
			<h1>ye</h1>
		</div>
	);
};
