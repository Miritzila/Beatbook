const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false,
			user: null,
		},
		actions: {

			// Acción para obtener un mensaje desde el backend
			getMessage: async () => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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
							username: username,
							email: email,
							password: password,
							password_confirmation: passwordConfirmation
						})
					});

					if (resp.ok) {
						const data = await resp.json();

						localStorage.setItem("token", data.token);
						localStorage.setItem("username", username);

						setStore({
                            isLoggedIn: true,
                            user: { username: username }
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
							username: username,
							password: password
						})
					});

					if (resp.ok) {
						const data = await resp.json();

						localStorage.setItem("token", data.token);
						localStorage.setItem("username", username);

						setStore({
							isLoggedIn: true,
							user: { username: username }
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
                        user: { username: username }
                    });
                } else {
                    setStore({
                        isLoggedIn: false,
                        user: null
                    });
				}
			},

			getAllEvents: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/events");
					const data = await resp.json();
					setStore({ events: data });
				} catch (error) {
					console.log("Error loading events from backend", error);
				}
			},
		}
	};
};

export default getState;