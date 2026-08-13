import { useState } from 'react';
import './contador.css';
import Boton from '../Boton/Boton';

function Contador(){
    const [cantidad, setCantidad] = useState(0);

    const incrementar = () => {
        setCantidad(cantidad + 1);
    };

    const decrementar = () => {
        setCantidad(cantidad - 1);
    };

    const reset = () => {
        setCantidad(0);
    };

    return(
        <div className='contador'>
            <h3>Practica UseState</h3>
            <div className='contador-valor'>{cantidad}</div>
            <div className='contador-botones'>
                <Boton texto='+'
                    variante= 'secondary'
                    onClick={incrementar}
                />
                <Boton texto='-'
                    variante= 'secondary'
                    onClick={decrementar}
                />
                <Boton texto='Reset'
                    variante= 'primary'
                    onClick={reset}
                />
            </div>
        </div>
    );
}

export default Contador;