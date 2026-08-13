import './Footer.css';
import Boton from '../../atoms/Boton/Boton';
import {memo} from 'react';

function Footer(){
    return(
        <footer className='footer'>
            <h3 className ='footer_titulo'>Reto-Shop</h3>
            <p className='footer.info'> El eCommerce del curso de React Indaptados 2026</p>
            <div className='footer_redes'>
                <Boton 
                texto='Facebook' 
                variante='secondary'
                tamano='pequeno'
                onClick={() => alert ("Redes Sociales - Proximamente")}
                />

                <Boton 
                texto='Instagram' 
                variante='secondary'
                tamano='pequeno'
                onClick={() => alert ("Redes Sociales - Proximamente")}
                />

                <Boton 
                texto='github' 
                variante='secondary'
                tamano='pequeno'
                onClick={() => alert ("Redes Sociales - Proximamente")}
                />
                
            </div>
            <p className='footer-creditos'>Creado con React</p>

        </footer>
    )
}

export default memo(Footer);