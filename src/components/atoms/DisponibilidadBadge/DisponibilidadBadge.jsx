import './DisponibilidadBadge.css';
import {validarProps} from '../../../utils/validarProps';  
import {memo} from 'react'; 

function DisponibilidadBadge({ stock = 0 }) {
    validarProps('DisponibilidadBadge', 'stock', stock, 'number');
    const disponible = stock > 0;
    const clase = disponible ? 'disponible' : 'agotado';
    const texto = disponible ? `En stock (${stock})` : 'Agotado';

    return (
        <span className={`disponibilidad-badge ${clase}`}>
            {texto}
        </span>
    )
}

export default memo(DisponibilidadBadge);