import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Inicio = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Token:', token);  // Debugging statement to check the token value
        if (token === null) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className="container text-center">
            <h1>beatbook</h1>
        </div>
    );
};
