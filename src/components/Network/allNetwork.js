const URL_ALL_API = import.meta.env.VITE_APP_API_URL + "/obtenerCliente";

export const getAllServer = async (cb) => {
    try {
        fetch(URL_ALL_API)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const finalTodos = response.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        accountNumber: item.accountNumber,
                        age: item.age,
                        status: item.status,
                        accountType: item.accountType,
                        saldo: item.saldo
                    };
                });
                cb(finalTodos);
            });
    } catch (error) {
        console.log(error);
    }
};