const URL_API = import.meta.env.VITE_APP_API_URL + "/login";

export const authNetwork = async (email, password) => {
    try {
        const authCredentials = {
            email,
            password,
        };
        let response = await fetch(`${URL_API}`, {
            method: "POST",
            body: JSON.stringify(authCredentials),
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        return response;
    } catch (error) {
        console.log(error);
    }
};
