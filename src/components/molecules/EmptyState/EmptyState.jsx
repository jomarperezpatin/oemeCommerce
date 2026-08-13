import './EmptyState.css';
import Boton from '../../atoms/Boton/Boton';

function EmptyState({icono, titulo, descripcion, accion}){
    return (
        <div className= "empty-state">
            {icono && <div className="empty-state-icono">{icono}</div>} 
            <h3 className="empty-state-titulo">{titulo}</h3>
            {descripcion && <p className="empty-state-descripcion">{descripcion}</p>}
            {accion &&(
                <Boton texto={accion.label} onClick={accion.onClick} /> 
            )}
        </div>
    );
}

export default EmptyState;