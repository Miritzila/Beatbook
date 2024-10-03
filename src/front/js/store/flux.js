const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false,
			user: null,
			events: [], // Añadir 'events' al estado inicial
			places: [], // Añadir 'places' al estado inicial
			bands: [] // Añadir 'bands' al estado inicial
		},
		actions: {

			// Acción para obtener un mensaje desde el backend
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			// Acción para registrar nuevos usuarios
			signUp: async (username, email, password, passwordConfirmation) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/sign_up", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							username,
							email,
							password,
							password_confirmation: passwordConfirmation
						})
					});

					if (resp.ok) {
						const data = await resp.json();

						localStorage.setItem("token", data.token);
						localStorage.setItem("username", username);

						setStore({
                            isLoggedIn: true,
                            user: { username }
                        });

						return true;
					} else {
						const errorData = await resp.json();
						throw new Error(errorData.message || "Error en el registro");
					}
				} catch (error) {
					console.log("Error en la petición de registro", error);
					return false;
				}
			},

			// Acción para iniciar sesión
			login: async (username, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/log_in", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							username,
							password
						})
					});

					if (resp.ok) {
						const data = await resp.json();

						localStorage.setItem("token", data.token);
						localStorage.setItem("username", username);

						setStore({
							isLoggedIn: true,
							user: { username }
						});

						return true;
					} else {
						const errorData = await resp.json();
						console.log("Error en la autenticación: ", errorData.message);
						return false;
					}
				} catch (error) {
					console.log("Error en la petición de login", error);
					return false;
				}
			},

			// Acción para cerrar sesión
			logout: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");

                setStore({
                    isLoggedIn: false,
                    user: null
                });
            },

			// Acción para verificar si el usuario ya está logueado al cargar la página
			checkLoginStatus: () => {
                const token = localStorage.getItem("token");
                const username = localStorage.getItem("username");

                if (token && username) {
                    setStore({
                        isLoggedIn: true,
                        user: { username }
                    });
                } else {
                    setStore({
                        isLoggedIn: false,
                        user: null
                    });
				}
			},

			// Acción para obtener todos los eventos
			getAllEvents: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/events");
					const data = await resp.json();
					setStore({ events: data });
				} catch (error) {
					console.log("Error loading events from backend", error);
				}
			},

			// Acción para obtener un evento por su ID
			getEventById: async (id) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/events/${id}`);
					const data = await resp.json();
					return data;
				} catch (error) {
					console.log("Error loading event from backend", error);
				}
			},

			// Acción para obtener todos los lugares
			getAllPlaces: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/places");
					const data = await resp.json();
					setStore({ places: data });
				} catch (error) {
					console.log("Error loading places from backend", error);
				}
			},

			// Acción para obtener un lugar por su ID
			getPlaceById: async (id) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/places/${id}`);
					const data = await resp.json();
					return data;
				} catch (error) {
					console.log("Error loading place from backend", error);
				}
			},

			// Acción para obtener todas las bandas
			getAllBands: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/bands");
					const data = await resp.json();
					setStore({ bands: data });
				} catch (error) {
					console.log("Error loading bands from backend", error);
				}
			},

			// Acción para obtener una banda por su ID
			getBandById: async (id) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/bands/${id}`);
					const data = await resp.json();
					return data;
				} catch (error) {
					console.log("Error loading band from backend", error);
				}
			},

			// Acción para obtener todas las categorías musicales
			getAllmusicalCategories: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/musical_categories");
					const data = await resp.json();
					setStore({ musicalCategories: data });
				} catch (error) {
					console.log("Error loading musical categories from backend", error);
				}
			}
			
		}
	};
};

export default getState;
