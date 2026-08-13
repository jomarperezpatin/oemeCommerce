import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, test, vi } from 'vitest'
import { CartProvider } from '../context/CartContext'
import { ProductosProvider } from '../context/ProductosContext'
import CatalogoProductos from '../components/organisms/CatalogoProductos/CatalogoProductos'
import { obtenerProductos } from '../services/productServices'

vi.mock('../services/productServices');

describe('Catalogo con service mock', () => {
    test('Muestra los productos que el service devuelve', async () => {
        obtenerProductos.mockResolvedValue([
        {
            id: 3,
            nombre: 'Producto de prueba 3',
            precio: 200,
            stock: 10,
            descripcion: 'Descripción del producto de prueba 3',
            imagen: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            nombre: 'Producto de prueba 4',
            precio: 200,
            stock: 10,
            descripcion: 'Descripción del producto de prueba 4',
            imagen: 'https://via.placeholder.com/150',
        }
        ]);
        render(
            <MemoryRouter>
                <ProductosProvider>
                    <CartProvider>
                        <CatalogoProductos />
                    </CartProvider>
                </ProductosProvider>
            </MemoryRouter>
        );

        expect(await screen.findByText('Producto de prueba 3')).toBeInTheDocument();
        expect(await screen.findByText('Producto de prueba 4')).toBeInTheDocument();
    });
});