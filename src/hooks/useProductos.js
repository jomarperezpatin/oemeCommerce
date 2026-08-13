import {useContext} from 'react';
import { ProductosContext } from '../context/ProductosContext';

export function useProductos() {
    const context = useContext(ProductosContext);

    if (!context){
        throw new Error("useCarrito debe de usarse dentro de un ProductosProvider");
    }
    return context;
}
