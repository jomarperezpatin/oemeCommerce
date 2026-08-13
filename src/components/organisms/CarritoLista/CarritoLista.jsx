import './CarritoLista.css';
import {Link, Navigate} from 'react-router';
import Boton from '../../atoms/Boton/Boton';
import { useCarrito } from '../../../hooks/useCarrito';
import EmptyState from '../../molecules/EmptyState/EmptyState';
import { useNavigate } from 'react-router';

function CarritoLista(){
    const {carrito, cambiarCantidad, quitarDelCarrito, vaciarElCarrito, totalPrecio} = useCarrito();
    const navigate = useNavigate();

    if(carrito.length === 0){
        return(
            <EmptyState
                icono='🛒'
                titulo='Carrito vacío'
                descripcion='Tu carrito está vacío. ¡Agrega algunos productos!'
                accion={{label: 'Ir al catálogo', onClick: () => navigate('/catalogo')}}
            />
        );
    }



    return (
        <div className='carrito-lista'>
            <h3>Tu carrito</h3>
            {carrito.map((item) => (
                <div key={item.id} className='carrito-item'>
                    <span>{item.nombre} - ${item.precio} x {item.cantidad}</span>
                    <div className='carrito-controladores'>
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
            <p className='carrito-total'>Total: ${totalPrecio}</p>
            <Boton
                texto= 'Vaciar Carrito'
                variante= 'danger'
                onClick={vaciarElCarrito}
            />
        </div>
    );
}

export default CarritoLista;