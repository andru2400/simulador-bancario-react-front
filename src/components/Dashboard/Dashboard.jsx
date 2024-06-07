import { Outlet, Link } from "react-router-dom";
import './Dashboard.css'

// Usando el Contexto
import { UseFirst } from "../../context/UseFirst";

export default function Dashboard() {

  const { user } = UseFirst();

  let superMessage = null;

  if (user != null) {
    superMessage = `Hello ${user.name} again!`;
  }

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            {/* <li>
                <Link to={`contacts/1`}>Your Name</Link>                
              </li>
              <li>
                <Link to={`contacts/2`}>Your Friend</Link>                
              </li> */}
            <li>
              <Link to={`login`}>Login.</Link>
            </li>
            <li>
              <Link to={`/`}>Inicio.</Link>
            </li>
            <li>
              <Link to={`tabla`}>Ver tabla.</Link>
            </li>
            <li>
              <Link to={`formularioregistro`}>Realizar Registro.</Link>
            </li>
            <li>
              <Link to={`formulariodeposito`}>Realizar deposito.</Link>
            </li>
            <li>
              <Link to={`formularioretiro`}>Realizar retiro.</Link>
            </li>
            <li>
              <Link to={`formulariotransferencia`}>Realizar transferencia.</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <h1>Bienvenido a la plataforma de Simulador Bancario </h1><h1 className="supermessage">{superMessage}</h1>
        <Outlet />
      </div>
    </>
  );
}