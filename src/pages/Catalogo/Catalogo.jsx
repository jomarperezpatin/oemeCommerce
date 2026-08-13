import FormularioProducto from '../../components/organisms/FormularioProducto/FormularioProducto';
import CatalogoProductos from '../../components/organisms/CatalogoProductos/CatalogoProductos';
import './Catalogo.css';

function Catalogo(){
    return(
        <div className='pagina-catalogo'>
            <h1>Nuestro Catalogo</h1>
            <FormularioProducto/>
            <CatalogoProductos/>
        </div>
    );
}

export default Catalogo;