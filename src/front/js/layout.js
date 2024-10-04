import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { LandingPage } from "./pages/landingPage.jsx"; 
import { Inicio } from "./pages/inicio.jsx";
import { Perfil } from "./pages/perfil.jsx";

import { Categorias } from "./pages/categorias.jsx";
import { Eventos } from "./pages/eventos.jsx";
import { Grupos } from "./pages/grupos.jsx";
import { Lugares } from "./pages/lugares.jsx";

import { PaginaFalsa } from "./pages/paginaFalsa.jsx";

import { DetalleCategoria } from "./pages/detalleCategoria.jsx";
import { DetalleEvento } from "./pages/detalleEvento.jsx";
import { DetalleGrupo } from "./pages/detalleGrupo.jsx";
import { DetalleLugar } from "./pages/detalleLugar.jsx";

import { CrearEvento } from "./pages/crearEvento.jsx";
import { CrearGrupo } from "./pages/crearGrupo.jsx";
import { CrearLugar } from "./pages/crearLugar.jsx";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<LandingPage />} path="/" />
                        <Route element={<Inicio />} path="/inicio" />
                        <Route element={<Perfil />} path="/perfil" />
                        <Route element={<h1>Not found!</h1>} />

                        <Route element={<Categorias />} path="/categorias" />
                        <Route element={<Eventos />} path="/eventos" />
                        <Route element={<Grupos />} path="/grupos" />
                        <Route element={<Lugares />} path="/lugares" />

                        <Route element={<PaginaFalsa />} path="/paginafalsa" />

                        <Route element={<DetalleCategoria />} path="/categoriamusical/:id" />
                        <Route element={<DetalleEvento />} path="/eventos/:id" />
                        <Route element={<DetalleGrupo />} path="/grupos/:id" />
                        <Route element={<DetalleLugar />} path="/lugares/:id" />

                        <Route element={<CrearEvento />} path="/eventos/crear" />
                        <Route element={<CrearGrupo />} path="/grupos/crear" />
                        <Route element={<CrearLugar />} path="/lugares/crear" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
