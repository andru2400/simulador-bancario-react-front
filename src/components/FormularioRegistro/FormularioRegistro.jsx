// Usando el Contexto
import { UseFirst } from "../../context/UseFirst";

// Importamos para manejar los hooks, o variables que van a cambiar con la funcion especial
import { useState } from "react";

// Importamos la libreria para mostrar Alerts personalizados
import Swal from 'sweetalert2'

// importamos las clases que vamos a manejar
import { Cliente } from "../Class/modelClass";

// Exportar hay dos formas, Tambien se usa a forma de comunicaion hijo - padre enviamos onCliente, onTask etc...
export const FormularioRegistro = () => {

    // Se crea por alguna razon ... investigando
    // const [clientes, setClientes]   = useState([]);
    // const [cliente, setCliente]     = useState("");

    // usamos las herramientas de useSate de react, Estos son hooks
    const [identificacion, setIdentificacion] = useState("");
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");

    const { addClient } = UseFirst();

    function validationRequest(cliente) {

        if (cliente.age < 18) {
            Swal.fire({
                title: 'Error!',
                text: 'Debes ser mayor de edad para crear una cuenta',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            return false;
        }

        if (cliente.accountType == '') {
            Swal.fire({
                title: 'Error!',
                text: 'Error, debe seleccionar un tipo de cuenta',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            return false;
        }

        return true;

    }

    // Funcion para el click al boton enviar del formulario, podemos llamarlo de cualquier forma, pero por lo general handle + Como lo Definamos
    const handleSubmit = (event) => {
        event.preventDefault();
        let result = {};

        // Moldea con el modelo de la clase para que sea un objeto Cliente
        const cliente = new Cliente();
        cliente.id = identificacion;
        cliente.name = nombre;
        cliente.age = edad;
        cliente.accountType = tipoCuenta;
        cliente.type = 'cliente';
        cliente.email = email;
        console.log(cliente);

        let validation = validationRequest(cliente);
        if (validation == true) {
            // manndando una señal al Contexto            
            addClient(cliente);
        }

    }

    return (
        <>
            <h1> Bienvenido al Formulario Principal !</h1>
            <div className="panel">
                <div>
                    <h3>Registro de usuarios</h3>
                    <h2 id="message"></h2>

                    <div>
                        1. Registro de clientes, llene el siguiente formulario
                        <br /><br />
                        <form id="formulario1" onSubmit={handleSubmit}>
                            <div className="container">
                                <label>Ingresa Identificacion</label><br />
                                <input type="text" name="id1" id="id1" placeholder="Ingresa Identificacion" onChange={(event) => setIdentificacion(event.target.value)} required /><br /><br />

                                <label>Ingresa Email</label><br />
                                <input type="text" name="email1" id="email1" placeholder="Ingresa email" onChange={(event) => setEmail(event.target.value)} required /><br /><br />

                                <label>Ingresa Nombre</label><br />
                                <input type="text" name="name1" id="name1" placeholder="Ingresa Nombre" onChange={(event) => setNombre(event.target.value)} required /><br /><br />

                                <label>Ingresa Edad</label><br />
                                <input type="text" name="age1" id="age1" placeholder="Ingresa Edad" onChange={(event) => setEdad(event.target.value)} required /><br /><br />

                                <label>Ingresa Tipo de cuenta</label><br />
                                <select name="accountType1" id="accountType1" onChange={(event) => setTipoCuenta(event.target.value)}>
                                    <option value="">           Seleccione: </option>
                                    <option value="ahorros">    1. Ahorros</option>
                                    <option value="corriente">  2. Corriente</option>
                                </select>

                            </div>

                            <input type="submit" value="Guardar" className="btn btn-success" />

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}