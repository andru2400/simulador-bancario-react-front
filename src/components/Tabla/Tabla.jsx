import { UseFirst } from "../../context/UseFirst";

// Tengo la duda - title, items, onCompleto, onDelete
export const Tabla = () => {

    // const complete = (id) => {
    //     onChangeStatus(id); // Dandole la señal al Padre con un paramtro    
    // };

    const changeStatus = (id) => {
        updateStateCliente(id); // Dandole la señal a la funcion del contexto
    };

    // Traemos lo que vayamos a usar del contexto !
    const { items, title, updateStateCliente } = UseFirst();

    console.log(items)

    return (
        <>
            <h3>{title}</h3>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Identificacion</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Status</th>
                        <th>Tipo de Cuenta</th>
                        <th>Tipo de usuario</th>
                        <th>Saldo</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.status}</td>
                            <td>{item.accountType}</td>
                            <td>Pendiente por llamar ... desde fetch</td>
                            <td>{item.saldo}</td>
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => changeStatus(item.id)}
                                >
                                    Cambiar Estado
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )

}