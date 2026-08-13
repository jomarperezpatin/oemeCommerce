import './ProductoDetalle.css';
import { useParams, Link } from 'react-router';
import { useProductos } from '../../hooks/useProductos';
import PrecioTag from '../../components/atoms/PrecioTag/PrecioTag';
import DisponibilidadBadge from '../../components/atoms/DisponibilidadBadge/DisponibilidadBadge';
import Boton from '../../components/atoms/Boton/Boton';
import {useCarrito} from '../../hooks/useCarrito';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';


function ProductoDetalle() {
    const { id } = useParams();
    const { productos, cargando } = useProductos();
    const { agregarAlCarrito } = useCarrito();
    const establecerTitulo = useDocumentTitle('Reto-Shop');
    const producto = productos.find((p) => p.id === Number(id));



    if(!producto && !cargando){
        return(
            <div className="detalle">
                <p>Producto no encontrado</p>
                <Link to="/catalogo">Volver al catálogo</Link>
            </div>
        );
    }

    if(cargando){
        return(
            <p className="detalle-mensaje">Cargando producto...</p>
        )
    }

    const otros = productos.filter((p) => p.id !== Number(id));
    
    
    return (
        <div className="detalle">
            <img 
                src={producto.imagen}
                alt={producto.nombre}
                className="detalle-imagen"
            />
            <div className="detalle-info">        
                <h1 className="detalle-nombre">{producto.nombre}</h1>
                <p className="detalle-descripcion">{producto.descripcion}</p>
                <PrecioTag precio={producto.precio} />
                <DisponibilidadBadge stock={producto.stock} />
                <Boton
                    texto={producto.stock > 0 ? "Agregar al carrito" : "Sin disponibilidad"}
                    disabled={producto.stock === 0}
                    onClick={() => agregarAlCarrito(producto)}
                />
                <Link to="/catalogo" className='detalle-volver'>Volver al catálogo</Link>
                <div className="detalle-otros">
                    <h2>Otros productos</h2>
                    {otros.map((p) => <Link key={p.id} to={`/producto/${p.id}`}>{p.nombre}</Link>)}
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;