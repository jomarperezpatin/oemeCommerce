import { Link } from 'react-router';
import CarritoLista from '../../components/organisms/CarritoLista/CarritoLista';
import Checkout from '../Checkout/Checkout';

function Carrito(){
    return(
        <div className='pagina-carrito'>
            <h1>Tu Carrito</h1>
            <CarritoLista/>
            <Checkout/>
        </div>
    );
}

export default Carrito;