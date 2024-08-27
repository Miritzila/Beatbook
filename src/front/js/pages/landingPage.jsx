import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const LandingPage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<h1>Landing Page</h1>
			<p></p>
		</div>
	);
};
