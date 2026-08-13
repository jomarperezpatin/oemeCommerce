import './ProductCard.css'
import PrecioTag from '../../atoms/PrecioTag/PrecioTag';
import DisponibilidadBadge from '../../atoms/DisponibilidadBadge/DisponibilidadBadge';
import Boton from '../../atoms/Boton/Boton';
import { validarProps } from '../../../utils/validarProps';
import {Link} from 'react-router';
import { memo } from 'react'
import { motion } from 'framer-motion';


function ProductCard({ producto = {}, onAgregar }) {
    validarProps('ProductCard', 'producto', producto, 'object');
    validarProps('ProductCard', 'onAgregar', onAgregar, 'function');
    const {id, nombre, precio, stock, imagen, descripcion} = producto;

    const handleAgregar= () => {
        onAgregar(producto);
    };
    
    return (
        <motion.div className='product-card'
        initial={{ opacity:0, y:30}}
        animate={{ opacity:1, y:0}}
        transition={{ duration: 0.3}}
        >
            <Link to={`/producto/${id}` } className='product-link'>
                <img
                    src={imagen}
                    alt={nombre}
                    className='product-image'
                />
                <h2 className='product-name'>{nombre}</h2>
            </Link>
            <div className='product-body'>
                <p className='product-description'>{descripcion}</p>
                <PrecioTag precio={precio} />
                <DisponibilidadBadge stock={stock} />
                <Boton 
                    texto = {stock > 0 ? "Agregar al carrito" : "Sin disponibilidad"}
                    disabled = {stock === 0}
                    onClick={handleAgregar}
                />
            </div>
        </motion.div>
    )
}

export default memo(ProductCard);