const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
		},
		actions: {
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
		}
	};
};

export default getState;
