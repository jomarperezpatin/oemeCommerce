import Boton from '../../atoms/Boton/Boton';
import Contenedor from '../../atoms/Contenedor/contenedor';
import ContadorCarrito from '../../atoms/ContadorCarrito/ContadorCarrito';
import './Header.css';
import {useCarrito} from '../../../hooks/useCarrito';
import PrecioTag from '../../atoms/PrecioTag/PrecioTag';


function Header() {
    const {totalItems, totalPrecio, vaciarElCarrito} = useCarrito();

    return (

        <header className='header'>
            <div>
                <h1 className='header.logo'>Reto-Shop</h1>
                <p className='header-subtitle'>Abrir consola del navegador con F12</p>
                <Contenedor titulo="¿Por que comprar con nosotros?">
                    <ul>
                        <li className='header-subtitle'><strong>Envio gratis</strong> Recibe tus productos sin costos de envio</li>
                        <li className='header-subtitle'><strong>Garantía de devolución</strong> Devuelve tu producto en 30 días</li>
                        <li className='header-subtitle'><strong>Atención al cliente</strong> Estamos para ayudarte en lo que necesites</li>
                    </ul>
                </Contenedor>
            </div>
            <div className='header-actions'>
                <PrecioTag precio={totalPrecio} />
                <ContadorCarrito cantidad={totalItems}/>
                <Boton 
                    texto="Ver carrito"
                    variante="primary"
                    tamano= "grande"
                    onClick={() => alert('Ver carrito proximamente... :)')}
                />
                <Boton 
                    texto="Vaciar"
                    variante="danger"
                    tamano= "pequeno"
                    disabled={totalItems === 0}
                    onClick={vaciarElCarrito}
                />
                
            </div>
        </header>
    );
}

export default Header;