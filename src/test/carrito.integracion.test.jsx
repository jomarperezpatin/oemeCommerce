import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router';
import { CartProvider } from '../context/CartContext';
import { useCarrito } from '../hooks/useCarrito';
import Navbar from '../components/organisms/Navbar/Navbar';
import ProductCard from "../components/molecules/ProductCard/ProductCard";
import { describe, expect, test } from "vitest";
import CarritoLista from "../components/organisms/CarritoLista/CarritoLista";

const productoFake = {
    id: 2,
    nombre: 'Producto de prueba 2',
    precio: 200,
    stock: 10,
    descripcion: 'Descripción del producto de prueba 2',
    imagen: 'https://via.placeholder.com/150',
}

function AppDePrueba () {
    const {agregarAlCarrito} = useCarrito();

    return(
        <> 
            <Navbar/>
            <ProductCard producto={productoFake} onAgregar={agregarAlCarrito}/>
            <CarritoLista/>
        </>
    );
}

describe('Integración: Agregar al carrito', () =>{
    test('al hacer click en Agregar, el contador del Navbar sube', () =>{
        localStorage.clear()
        render(
            <MemoryRouter>
                <CartProvider>
                    <AppDePrueba/>
                </CartProvider>
            </MemoryRouter>
        );
        expect(screen.getByText('Carrito (0)')).toBeInTheDocument();

        const boton = screen.getByRole('button', {name: /agregar al carrito/i});
        fireEvent.click(boton);

        expect(screen.getByText('Carrito (1)')).toBeInTheDocument();
    });

    test('Al hacer clic en Agregar, el total del carrito se actualiza'), () => {
        localStorage.clear();
        render(
            <MemoryRouter>
                <CartProvider>
                    <AppDePrueba/>
                </CartProvider>
            </MemoryRouter>
        );
        expect(screen.getByText('Tu carrito esta vacio')).toBeInTheDocument();

        const boton = screen.getByRole('button', {name: /agregar al carrito/i});
        fireEvent.click(boton);

        expect(screen.getByText('Total: $500')).toBeInTheDocument();
    }
});



// <></> Esto se llama fragment y es mejor que poner div

