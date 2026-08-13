import { createContext, useState, useEffect, useReducer, useCallback, useMemo} from "react";
import { carritoReducer } from "../reducers/carritoReducer";
import {memo} from 'react';


export const CartContext = createContext();

export function CartProvider({children}) {
    const [carrito, dispatch]= useReducer(carritoReducer, [], () => {
        const carritoGuardado = localStorage.getItem("carrito");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    const agregarAlCarrito = useCallback((producto) => {
        dispatch({type: 'agregar', producto});
    }, [dispatch]);

    const quitarDelCarrito = useCallback((id) => {
        dispatch({type: 'quitar', id});
    }, [dispatch]);

    const cambiarCantidad = useCallback((id, delta) => {
        dispatch({type: 'cambiarCantidad', id, delta});
    }, [dispatch]);

    const vaciarElCarrito = useCallback(() => {
        dispatch({type: 'vaciar'});
    }, [dispatch]);

    const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const totalPrecio = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0); 

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);



    const valor = useMemo(() => ({ 
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        cambiarCantidad,
        vaciarElCarrito,
        totalItems,
        totalPrecio,
    }), [carrito, agregarAlCarrito, quitarDelCarrito, cambiarCantidad, vaciarElCarrito, totalItems, totalPrecio]);

    return (
        <CartContext.Provider value={valor}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;

//El dispatch es una función que se utiliza para enviar acciones al reducer y actualizar el estado del carrito. En este caso, se utiliza para agregar, quitar, cambiar la cantidad y vaciar el carrito de compras. Esto permite que los componentes que consumen el contexto puedan interactuar con el estado del carrito de manera sencilla y consistente.

//El useCallback es un hook que se utiliza para memorizar funciones y evitar que se vuelvan a crear en cada renderizado del componente.

//memo es un hook que se utiliza para memorizar valores y evitar que se vuelvan a calcular en cada renderizado del componente.
