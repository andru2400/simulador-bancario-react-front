import Swal from 'sweetalert2';
import { useEffect } from "react";

import { getAllServer } from "../components/Network/allNetwork";

import { createContext, useState } from "react";

export const FirstContext = createContext();

export const FirstProvider = ({ children }) => {

    // Definimos todos los Datos que vamos a compartir  Hooks
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);
    const title = "Titulo desde el proveedor de contexto";

    useEffect(() => {
        getAllServer(setItems);
    }, []);

    /* Se migra las funcionalidades de RoutetIntegration o el documento donde habia una logica anterior*/

    /* ---------------------------------------------------------- Funcion para actualizar -------------------------------------------------------------- */
    const addClient = (cli) => {

        const buscarCliente = items.find(cliente => cliente.id === cli.id);

        if (buscarCliente !== undefined) {
            Swal.fire({
                title: 'Error!', text: 'Esta cuenta ya existe', icon: 'error', confirmButtonText: 'Cool'
            })
            return false;
        }

        setItems((prevState) => [...prevState, cli]);   // es una función de actualización del estado. Toma el estado anterior como argumento (prevState) y      

        Swal.fire({
            title: 'Hecho !', text: 'Se agrego exitosamente el cliente, revise la tabla', icon: 'success', confirmButtonText: 'Entendido'
        })
    };

    /* ----------------------------------------------------------Funcion para actualizar --------------------------------------------------------------- */
    const updateStateCliente = (id) => {
        const buscarCliente = items.find(cliente => cliente.id === id)
        buscarCliente.changeStatus();                                               // Usando la funionalidad del modeloclassName
        setItems((prevState) => [...prevState]);                                    // Crea uno nuevo con la modificacion y renderiza      

        Swal.fire({
            title: 'Hecho !', text: 'Se cambio exitosamente el estado del cliente, revise la tabla', icon: 'success', confirmButtonText: 'Entendido'
        })
    };

    /* ------------------------------------------------------------- Funcion para depositar ---------------------------------------------------------- */
    const addDeposit = (identificacion, deposito) => {
        const buscarCliente = items.find(cliente => cliente.id === identificacion)
        if (buscarCliente === undefined) {
            Swal.fire({
                title: 'Error!', text: 'La cuenta No existe', icon: 'error', confirmButtonText: 'Cool'
            })
            return false;
        }

        if (buscarCliente.status === 'inactive') {
            Swal.fire({
                title: 'Error!', text: 'La cuenta esta inactiva', icon: 'error', confirmButtonText: 'Cool'
            })
            return false;
        }

        let response = buscarCliente.agregarSaldo(deposito);               // Usando la funionalidad del modeloclassName

        if (response === true) {
            setItems((prevState) => [...prevState]);                        // Crea uno nuevo con la modificacion y renderiza      
            Swal.fire({
                title: 'Hecho !', text: 'Se agrego correctamente', icon: 'success', confirmButtonText: 'Cool'
            })
        }
    }

    /* ------------------------------------------------------------ Funcion para Sacar Dinero -------------------------------------------------------- */
    const withDrawals = (id, retiro) => {

        const buscarCliente = items.find(cliente => cliente.id === id)
        if (buscarCliente === undefined) {
            Swal.fire({
                title: 'Hecho !', text: 'No se encontro la cuenta', icon: 'error', confirmButtonText: 'Cool'
            })
            return;
        }

        let response = buscarCliente.sacarSaldo(retiro);                   // Usando la funionalidad del modeloclassName
        if (response === true) {
            Swal.fire({
                title: 'Hecho !', text: 'Se Retiro correctamente', icon: 'success', confirmButtonText: 'Cool'
            })
        } else {
            Swal.fire({
                title: 'Error !', text: 'Saldo insuficiente', icon: 'error', confirmButtonText: 'Cool'
            })
        }

        setItems((prevState) => [...prevState]);                        // Crea uno nuevo con la modificacion y renderiza      
    }

    /* ------------------------------------------------------------ Funcion Transferencia -------------------------------------------------------- */
    const addTransfer = (id, id2, transferencia) => {

        const buscarClienteA = items.find(cliente => cliente.id === id)
        const buscarClienteB = items.find(cliente => cliente.id === id2)

        let result = buscarClienteA.sacarSaldo(transferencia);          // Usando la funionalidad del modeloclassName
        if (result) {
            buscarClienteB.agregarSaldo(transferencia);                 // Usando la funionalidad del modeloclassName
            Swal.fire({
                title: 'HECHO !', text: 'Se realizo la transaccion correctamente', icon: 'success', confirmButtonText: 'Cool'
            })
        } else {
            Swal.fire({
                title: 'Error !', text: 'Saldo insuficiente', icon: 'error', confirmButtonText: 'Cool'
            })
        }
        setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza              
    };

    const getLoggedUser = () => {
        return user;
    };

    const loginUser = (user, token) => {
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };


    /* ------------------------------------------------------------- JSX ------------------------------------------------------------------------- */
    return (
        <FirstContext.Provider value={{ items, title, addClient, updateStateCliente, addDeposit, withDrawals, addTransfer, getLoggedUser, loginUser, user }}>
            {children}
        </FirstContext.Provider>
    );

};
