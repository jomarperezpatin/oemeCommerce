import './contenedor.css'
import {validarProps} from '../../../utils/validarProps';   

function Contenedor({ titulo, children }) {
    validarProps('Contenedor', 'titulo', titulo, 'string');
    return (
        <div className='contenedor'>
            {titulo && <h3 className='contenedor-titulo'>{titulo}</h3>}
            {children}
        </div>
    );
}

export default Contenedor;

//El children es una propiedad especial que permite a los componentes anidar otros componentes o elementos dentro de ellos. En este caso, el componente Contenedor utiliza children para renderizar cualquier contenido que se pase entre las etiquetas de apertura y cierre del componente. Esto permite crear contenedores flexibles y reutilizables que pueden envolver diferentes tipos de contenido en la interfaz de usuario.