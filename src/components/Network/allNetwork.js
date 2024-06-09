const URL_ALL_API = import.meta.env.VITE_APP_API_URL + "/obtenerCliente";
const URL_CREATE_API = import.meta.env.VITE_APP_API_URL + "/crearCliente";

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


export const createTodoServer = async (cli) => {
  try {
    const client = {
      name: cli.name,
      accountNumber: cli.id,
      age: cli.age,
      status: cli.status,
      type: cli.type,
      accountType: cli.accountType,
    };

    let response = await fetch(`${URL_CREATE_API}`, {
      method: "POST",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
        // Authorization: getToken(),
      },
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }    
};