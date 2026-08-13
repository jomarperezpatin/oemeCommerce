import './PrecioTag.css';
import {validarProps} from '../../../utils/validarProps';
import {memo} from 'react';

function PrecioTag({ precio = 0 }) {
    validarProps('Precio Tag', 'precio', precio, 'number');
    const precioNumero = Number(precio);
    const precioSeguro = isNaN(precioNumero) ? 0 : precioNumero;


    return (
        <p className= "precio-tag">
            ${precioSeguro} MXM
        </p>
    )
}

export default memo(PrecioTag);