// Usando el Contexto
import { UseFirst } from "../../context/UseFirst";

// Importamos para manejar los hooks, o variables que van a cambiar con la funcion especial
import { useState } from "react";

// Exportar hay dos formas, Tambien se usa a forma de comunicaion hijo - padre enviamos onCliente, onTask etc... 
export const FormularioDeposito = () => {

    // usamos las herramientas de useSate de react, Estos son hooks
    const [identificacion, setIdentificacion] = useState("");
    const [deposito, setDeposito] = useState("");

    const { addDeposit } = UseFirst();

    // Funcion para el click al boton enviar del formulario, podemos llamarlo de cualquier forma, pero por lo general handle + Como lo Definamos
    const handleSubmit = (event) => {
        event.preventDefault();

        // manndando una señal al Context        
        addDeposit(identificacion, deposito);
    }

    return (
        <>
            <h1> Bienvenido al Formulario de Deposito </h1>
            <div className="panel">
                <div>
                    <h3>Formulario de deposito</h3>
                    <h2 id="message"></h2>

                    <div>

                        1. Ingreso de deposito, llene el siguiente formulario
                        <br /><br />

                        <form id="formulario2" onSubmit={handleSubmit}>
                            <div className="container">
                                <label>Ingresa Identificacion</label><br />
                                <input type="text" name="id1" id="id1" placeholder="Ingresa Identificacion" onChange={(event) => setIdentificacion(event.target.value)} required /><br /><br />

                                <label>Ingresa monto del deposito</label><br />
                                <input type="text" name="deposito1" id="deposito1" placeholder="Ingresa Deposito" onChange={(event) => setDeposito(event.target.value)} required /><br /><br />
                            </div>

                            <input type="submit" value="Guardar" className="btn btn-success" />

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}