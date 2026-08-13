import { Link } from "react-router";

function NotFound() {
    return(
        <div style={{textAlign: 'center'}}>
            <h1>404</h1>
            <p>No existe la pagina</p>
            <Link to='/'>Volver al inicio</Link>
        </div>
    );
}

export default NotFound;