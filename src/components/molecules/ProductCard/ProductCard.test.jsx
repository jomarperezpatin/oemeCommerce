import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest'
import ProductCard from './ProductCard';

const productoFake = {
    id: 1,
    nombre: 'Producto de prueba',
    precio: 100,
    stock: 50,
    descripcion: 'Descripción del producto de prueba',
    imagen: 'https://via.placeholder.com/150',
}


describe('ProductCard', () => {
    function renderCard (props = {}){
        return render(
            <MemoryRouter>
                <ProductCard producto={productoFake} onAgregar={() => {}}{...props}/>
            </MemoryRouter>
        );
    }

    test('Muestra el nombre del producto', () => {
        renderCard();
        expect(screen.getByText('Producto de prueba')).toBeInTheDocument();
    });

    test('Muestra la descripción del producto', () => {
        renderCard();
        expect(screen.getByText('Descripción del producto de prueba')).toBeInTheDocument();
    });

    test('Llama a OnAgregar con el producto al hacer clic', () => {
        const onAgregar = vi.fn(); 
        renderCard({onAgregar});

        const boton = screen.getByRole('button', {name: /agregar al carrito/i});
        fireEvent.click(boton)

        expect(onAgregar).toHaveBeenCalledWith(productoFake)
    });

    test('Deshabilita el boton cuando no hay stock', () =>{
        renderCard({producto:{...productoFake, stock:0}})
        const boton = screen.getByRole('button', {name: /sin disponibilidad/i})
        expect(boton).toBeDisabled();
    })

})
