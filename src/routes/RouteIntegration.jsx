import { FirstProvider } from "../context/FirstProvider.jsx";

/*  Este Archivo se crea para no tocar main, y aprovechar migrar lo que tenia el componente inicial (Que contenia la logica y la bd) */
// Documentacion React Route agrega
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import ErrorPage from "../error-page";

// Documentacion React Route agrega
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* migration de mi documento Inicial, para poder manejar las rutas por aparte*/
import { useState } from "react";
import Swal from 'sweetalert2';

/* migration de mi documento Inicial, para poder manejar las rutas por aparte*/
import { FormularioRegistro } from '../components/FormularioRegistro/FormularioRegistro';
import { FormularioDeposito } from '../components/FormularioDeposito/FormularioDeposito';
import { FormularioRetiro } from '../components/FormularioRetiro/FormularioRetiro';
import { FormularioTransferencia } from '../components/FormularioTransferencia/FormularioTransferencia';
import { Tabla } from '../components/Tabla/Tabla';

export const RouteIntegration = () => {

    /* migration de mi documento Inicial, para poder manejar las rutas por aparte*/
    const [items, setItems] = useState([]);                 // usamos las herramientas de useSate de react, Estos son hooks

    /* migration de mi documento Inicial, para poder manejar las rutas por aparte*/
    // const handleAdd = (cli) => {                        // Funcion que se encarga de traer el usuario, como un objeto, mediante comunicacion hijo - padre  

    //     const buscarCliente = items.find(cliente => cliente.id === cli.id);

    //     if (buscarCliente !== undefined) {
    //         Swal.fire({
    //             title: 'Error!', text: 'Esta cuenta ya existe', icon: 'error', confirmButtonText: 'Cool'
    //         })

    //         return false;
    //     }

    //     setItems((prevState) => [...prevState, cli]);   // es una función de actualización del estado. Toma el estado anterior como argumento (prevState) y      

    //     Swal.fire({
    //         title: 'Hecho !', text: 'Se agrego exitosamente el cliente, revise la tabla', icon: 'success', confirmButtonText: 'Entendido'
    //     })

    // };

    /* migration de mi documento Inicial, para poder manejar las rutas por aparte*/
    // const handleAddDeposit = (id, deposito) => {

    //     const buscarCliente = items.find(cliente => cliente.id === id)

    //     console.log(buscarCliente);

    //     if (buscarCliente === undefined) {
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'La cuenta No existe',
    //             icon: 'error',
    //             confirmButtonText: 'Cool'
    //         })
    //         return false;
    //     }

    //     if (buscarCliente.status === 'inactive') {
    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'La cuenta esta inactiva',
    //             icon: 'error',
    //             confirmButtonText: 'Cool'
    //         })
    //         return false;
    //     }

    //     let response = buscarCliente.agregarSaldo(deposito);               // Usando la funionalidad del modeloclassName

    //     if (response === true) {
    //         setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza      
    //         Swal.fire({
    //             title: 'Hecho !',
    //             text: 'Se agrego correctamente',
    //             icon: 'success',
    //             confirmButtonText: 'Cool'
    //         })
    //     }
    // };

    /* migration de mi documento Inicial, para poder manejar las rutas por aparte*/
    // const handleAddWithdrawal = (id, retiro) => {
    //     const buscarCliente = items.find(cliente => cliente.id === id)

    //     if (buscarCliente === undefined) {
    //         Swal.fire({
    //             title: 'Hecho !',
    //             text: 'No se encontro la cuenta',
    //             icon: 'error',
    //             confirmButtonText: 'Cool'
    //         })
    //     }

    //     let response = buscarCliente.sacarSaldo(retiro);                   // Usando la funionalidad del modeloclassName

    //     if (response === true) {
    //         setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza      
    //         Swal.fire({
    //             title: 'Hecho !',
    //             text: 'Se Retiro correctamente',
    //             icon: 'success',
    //             confirmButtonText: 'Cool'
    //         })
    //     } else {
    //         Swal.fire({
    //             title: 'Error !',
    //             text: 'Saldo insuficiente',
    //             icon: 'error',
    //             confirmButtonText: 'Cool'
    //         })
    //     }

    //     setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza              
    // };

    /* migration de mi documento Inicial, para poder manejar las rutas por aparte*/
    const handleAddTransfer = (id, id2, transferencia) => {

        const buscarClienteA = items.find(cliente => cliente.id === id)
        const buscarClienteB = items.find(cliente => cliente.id === id2)

        let result = buscarClienteA.sacarSaldo(transferencia);      // Usando la funionalidad del modeloclassName
        if (result) {
            buscarClienteB.agregarSaldo(transferencia);               // Usando la funionalidad del modeloclassName
            Swal.fire({
                title: 'HECHO !',
                text: 'Se realizo la transaccion correctamente',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        } else {
            Swal.fire({
                title: 'Error !',
                text: 'Saldo insuficiente',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza              
    };

    /* migration de mi documento Inicial, para poder manejar las rutas por aparte*/
    // const handleChangeStatus = (id) => {
    //     const buscarCliente = items.find(cliente => cliente.id === id)
    //     buscarCliente.changeStatus();                       // Usando la funionalidad del modeloclassName
    //     setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza      
    // };

    // Documentacion React Route agrega
    /* Dashboard seria el contenedor para usar los componentes Hijos */
    const router = createBrowserRouter([
        {
            path: "/",
            // element: <div>Hello world!</div>,
            element: <Dashboard />,
            errorElement: <ErrorPage />,
            children: [
                // {
                //   path: "contacts/:contactId",
                //   element: <Contact />,
                // },
                // {
                //     path: "Inicial",
                //     element: <Inicial />,
                // },
                {
                    /* Componente tabla, qu envia props(items,title) y recibe onChangeStatus (Osea algo que envio un componente hijo) */
                    path: "tabla",
                    element: <Tabla />,
                    // element: <Tabla items={items} title={"Clientes ingresados"} onChangeStatus={handleChangeStatus} />,
                },
                {
                    /* Componente formularioregistro, recibe onChangeStatus(Osea algo que envio un componente hijo) */
                    path: "formularioregistro",
                    element: <FormularioRegistro />,
                },
                {
                    /* Componente formulariodeposito, recibe onChangeStatus(Osea algo que envio un componente hijo) */
                    path: "formulariodeposito",
                    element: <FormularioDeposito />,
                },
                {
                    /* Componente formularioretiro, recibe onChangeStatus(Osea algo que envio un componente hijo) */
                    path: "formularioretiro",
                    element: <FormularioRetiro />,
                },
                {
                    /* Componente formulariotransferencia, recibe onChangeStatus(Osea algo que envio un componente hijo) */
                    path: "formulariotransferencia",
                    element: <FormularioTransferencia />,
                },
            ],
        },
        // {
        //   path: "contacts/:contactId",
        //   element: <Contact />,
        // },
    ]);

    return (
        <>
            <FirstProvider>
                {/*  Documentacion React Route agrega (Dice que usemos el RouterProvider) */}
                <RouterProvider router={router} />
            </FirstProvider>
        </>
    )

}

export default RouteIntegration;