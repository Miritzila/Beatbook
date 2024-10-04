import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";

export const Perfil = () => {
	const token = localStorage.getItem("token");
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	// Si no hay token, redirige a la página de inicio
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

	return (
		<div className="container text-center">
			<h1>Perfil</h1>
		</div>
	);
};
