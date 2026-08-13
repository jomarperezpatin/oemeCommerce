import './MiniCarrito.css';
import Boton from '../../atoms/Boton/Boton';
import { useCarrito } from '../../../hooks/useCarrito';

function MiniCarrito(){
    const {carrito, cambiarCantidad, quitarDelCarrito, totalPrecio} = useCarrito();

    if(carrito.length === 0){
        return <p className='mini-carrito-vacio'>Tu carrito esta vacio</p>
    }

    return (
        <div className='mini-carrito'>
            <h3>Tu carrito</h3>
            {carrito.map((item) => (
                <div key={item.id} className='mini-carrito-item'>
                    <span>{item.nombre} - ${item.precio} x {item.cantidad}</span>
                    <div className='mini-carrito-controladores'>
                        <Boton 
                            texto='-'
                            variante= 'secondary'
                            tamano='pequeno'
                            onClick={() => cambiarCantidad(item.id, -1)}
                        />
                        <span>{item.cantidad}</span>
                        <Boton 
                            texto='+'
                            variante= 'secondary'
                            tamano='pequeno'
                            onClick={() => cambiarCantidad(item.id, +1)}
                        />
                        <Boton 
                            texto='Quitar'
                            variante= 'danger'
                            tamano='pequeno'
                            onClick={() => quitarDelCarrito(item.id)}
                        />
                    </div>
                </div>
            ))}
            <p className='mini-carrito-total'>Total: ${totalPrecio}</p>
        </div>
    );
}

export default MiniCarrito;