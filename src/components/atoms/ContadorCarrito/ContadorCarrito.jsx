import './ContadorCarrito.css';
import {validarProps} from '../../../utils/validarProps';

function ContadorCarrito({ cantidad = 0 }) {
    validarProps('ContadorCarrito', 'cantidad', cantidad, 'number');
    return (
        <div className='contador-carrito'>
            <span className='contador-carrito-numero'>{cantidad}</span>
            <span>items</span>
        </div>
    )
}

export default ContadorCarrito;