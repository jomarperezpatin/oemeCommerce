import './Navbar.css';
import { NavLink } from 'react-router';
import {useCarrito} from '../../../hooks/useCarrito';
const precargarCatalogo = () => import('../../../pages/Catalogo/Catalogo');
const precargarCarrito = () => import('../../../pages/Carrito/Carrito');
const precargarPerfil = () => import('../../../pages/Perfil/Perfil');
const precargarCheckout = () => import('../../../pages/Checkout/Checkout');

function NavBar(){
    const { totalItems } = useCarrito();

    return(
        <nav className='navbar'>
            <NavLink to='/' className='navbar-logo'>Reto-shop</NavLink>
            <div className='navbar-links'>
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/catalogo' onClick={precargarCatalogo}>Catálogo</NavLink>
                <NavLink to='/carrito' onClick={precargarCarrito}>Carrito ({totalItems})</NavLink>
                <NavLink to='/Perfil' onClick={precargarPerfil}>Perfil</NavLink>
                <NavLink to='/Checkout'>Checkout</NavLink>
            </div>
        </nav>
    );
}

export default NavBar;