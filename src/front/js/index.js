// Importar React en el bundle
import React from "react";
import { createRoot } from "react-dom/client"; // Cambiar la importación

// Incluir tu archivo index.scss en el bundle
import "../styles/index.css";

// Importar tus propios componentes
import Layout from "./layout";

// Crear el root y renderizar tu aplicación React
const root = createRoot(document.querySelector("#app")); // Cambiar el método de renderizado
root.render(<Layout />);
