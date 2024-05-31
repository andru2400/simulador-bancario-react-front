import { useState } from "react";
import Swal from 'sweetalert2';

// Componenetes personalizados a usar
import {FormularioRegistro} from '../FormularioRegistro/FormularioRegistro';
import {FormularioDeposito} from '../FormularioDeposito/FormularioDeposito';
import {FormularioRetiro} from '../FormularioRetiro/FormularioRetiro';
import {FormularioTransferencia} from '../FormularioTransferencia/FormularioTransferencia';
import {Tabla} from '../Tabla/Tabla';
import { NavBar } from "../NavBar/NavBar";

function Inicial(){
 
    const [items, setItems] = useState([]);                 // usamos las herramientas de useSate de react, Estos son hooks
    const itemsNavBar = [
                            {'nombre'   : 'example1'},
                            {'nombre'   : 'example2'},
                            {'nombre'   : 'example3'}
                        ];                 // usamos las herramientas de useSate de react, Estos son hooks

    const handleAdd = (cli) => {                        // Funcion que se encarga de traer el usuario, como un objeto, mediante comunicacion hijo - padre  
        
        const buscarCliente = items.find(cliente =>cliente.id===cli.id);
        
        if(buscarCliente !== undefined){
            Swal.fire({
                title: 'Error!',
                text: 'Esta cuenta ya existe',
                icon: 'error',
                confirmButtonText: 'Cool'
            })

            return false;
        }
        
        setItems((prevState) => [...prevState, cli]);   // es una función de actualización del estado. Toma el estado anterior como argumento (prevState) y      
    };

    const handleAddDeposit = (id, deposito) => {

        const buscarCliente = items.find(cliente =>cliente.id===id)

        console.log(buscarCliente);

        if(buscarCliente === undefined){
            Swal.fire({
                title: 'Error!',
                text: 'La cuenta No existe',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            return false;
        }

        if(buscarCliente.status === 'inactive'){
            Swal.fire({
                title: 'Error!',
                text: 'La cuenta esta inactiva',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            return false;
        }

        let response = buscarCliente.agregarSaldo(deposito);               // Usando la funionalidad del modeloclassName

        if(response === true){
            setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza      
            Swal.fire({
                title: 'Hecho !',
                text: 'Se agrego correctamente',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        }
    };    

    const handleAddWithdrawal = (id, retiro) => {    
        const buscarCliente = items.find(cliente =>cliente.id===id)

        if(buscarCliente === undefined){            
            Swal.fire({
                title: 'Hecho !',
                text: 'No se encontro la cuenta',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

        let response = buscarCliente.sacarSaldo(retiro);                   // Usando la funionalidad del modeloclassName

        if(response === true){
            setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza      
            Swal.fire({
                title: 'Hecho !',
                text: 'Se Retiro correctamente',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        }else{
            Swal.fire({
                title: 'Error !',
                text: 'Saldo insuficiente',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

        setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza              
    };    

    const handleAddTransfer = (id,id2, transferencia) => {    

        const buscarClienteA = items.find(cliente =>cliente.id===id)
        const buscarClienteB = items.find(cliente =>cliente.id===id2)

        let result = buscarClienteA.sacarSaldo(transferencia);      // Usando la funionalidad del modeloclassName
        if(result){
            buscarClienteB.agregarSaldo(transferencia);               // Usando la funionalidad del modeloclassName
            Swal.fire({
                title: 'HECHO !',
                text: 'Se realizo la transaccion correctamente',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        }else{
            Swal.fire({
                title: 'Error !',
                text: 'Saldo insuficiente',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza              
    };    

    const handleChangeStatus = (id) => {    
        const buscarCliente = items.find(cliente =>cliente.id===id)
        buscarCliente.changeStatus();                       // Usando la funionalidad del modeloclassName
        setItems((prevState) => [...prevState]);            // Crea uno nuevo con la modificacion y renderiza      
    };    

    return (
        <>
            <NavBar itemsNavBar={itemsNavBar} />

            <h1> Bienvenido al simulador bancario  💵💵💵  </h1>                        

            <Tabla items={items} title={"Clientes ingresados"} onChangeStatus={handleChangeStatus} />
            {/* 
                Envia como Padre - Hijo 
                    items
                    title
                    
                Recibe de Hijo a Padre
                    onChangeStatus                    
            */}            

            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Formulario de registro de clientes
                    </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">

                        <FormularioRegistro onCliente={handleAdd}/>
                        {/*                                     
                            Recibe de Hijo a Padre                    
                                onCliente                    
                        */}

                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Formulario de Deposito
                    </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                        
                        <FormularioDeposito onClienteDeposito={handleAddDeposit}/>
                        {/*                                     
                            Recibe de Hijo a Padre                    
                                onClienteDeposito                    
                        */}

                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Formulario de Retiro
                    </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">

                        <FormularioRetiro onClienteRetiro={handleAddWithdrawal}/>
                        {/*                                     
                            Recibe de Hijo a Padre                    
                                onClienteRetiro                    
                        */}    

                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Formulario de Transferencia
                    </button>
                    </h2>
                    <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">

                        <FormularioTransferencia onClienteTranferencia={handleAddTransfer}/>
                        {/*                                     
                            Recibe de Hijo a Padre                    
                                onClienteTranferencia                    
                        */}

                    </div>
                    </div>
                </div>
            </div>
        
        </>
    );

}

export default Inicial;