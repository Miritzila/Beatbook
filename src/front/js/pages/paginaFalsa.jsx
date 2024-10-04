import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const PaginaFalsa = () => {
    return (
        <div className="container text-center">
            <br></br>
            <h1>Bienvenido a la pagina falsa</h1>
            <br></br>
            <div class="row align-items-center">
                <div class="col">
                <img src="https://res.cloudinary.com/daxbjkj1j/image/upload/v1727977631/fquobzdlbekboax886ti.png" alt="Imagen" style={{ width: '60%', height: '60%' }} />
                </div>
                <div class="col">
                    <p>Esta página no tiene ninguna funcionalidad real.</p>
                    <p>Ha sido creada para poder darle un sentido a los enlaces del footer. Siento que no hayas podido contactar con el servicio de atención al cliente ¡No existe!</p>
                    <p>Esta es una página diseñada como proyecto final del bootcamp Full Stack Developer de la academia 4geeks. Espero que te guste.</p>
                    <FontAwesomeIcon icon={faHeart} size="2xl" style={{ color: 'white' }} />
                </div>
            </div>
        </div>
    );
}