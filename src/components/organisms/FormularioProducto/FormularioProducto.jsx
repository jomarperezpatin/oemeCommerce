import './FormularioProducto.css';
import { useState } from 'react';
import Boton from '../../atoms/Boton/Boton';
import { useProductos } from '../../../hooks/useProductos';

const estadoInicial = {
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    descripcion: ''
};

function FormularioProducto(){
    const {agregarProducto} = useProductos();
    const [producto, setProducto] = useState(estadoInicial);
    const [errores, setErrores] = useState({});
    const [mostrarForm, setMostrarForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value
        });
    };
    
    const handleLimpiar = () => {
        setProducto(estadoInicial);
        setErrores({});
    }

    const handleSubmit = () =>{
        const nuevosErrores = {
            nombre: producto.nombre.length < 3 ? "El minimo son 3 caracteres" : '',
            precio: Number(producto.precio) <= 0 ? "El precio tiene que ser mayor a 0": '',
            stock: producto.stock === '' ? "El stock es obligatorio" : '',
            imagen: !producto.imagen ? "La URL es obligatoria" : '',
            descripcion: producto.descripcion.length < 10 ? "Minimo 10 caracteres" : '',
        };

        setErrores(nuevosErrores);

        const hayErrores = Object.values(nuevosErrores).some(error => error !== '');

        if (!hayErrores){
            agregarProducto(producto);
            setProducto(estadoInicial);
            setErrores({});
            setMostrarForm(false);
        }
    }

    return(
        <div>
            <div className='form-toggle'>
                <Boton
                    texto={mostrarForm ? "Ocultar Formulario" : "Nuevo Producto"}
                    variante='primary'
                    onClick={() => setMostrarForm(!mostrarForm)}
                />
            </div>

        {mostrarForm && (
        <div className='formulario'>
            <h2 className='formulario-titulo'>Agregar Producto</h2>

            <div className='campo'>
                <label className='campo-label'>Nombre del producto</label>
                <input
                    type = "text"
                    name = "nombre"
                    className='campo-input'
                    value={producto.nombre}
                    onChange={handleChange}
                    placeholder='EJ. Laptop'
                />
                {errores.nombre && <p className='campo-error'>{errores.nombre} </p>}
            </div>

            <div className='campo'>
                <label className='campo-label'>Precio del producto</label>
                <input
                    type = "number"
                    name = "precio"
                    className='campo-input'
                    value={producto.precio}
                    onChange={handleChange}
                    placeholder='EJ. 15800'
                />
                {errores.precio && <p className='campo-error'>{errores.precio} </p>}
            </div>

            <div className='campo'>
                <label className='campo-label'>Stock del producto</label>
                <input
                    type = "number"
                    name = "stock"
                    className='campo-input'
                    value={producto.stock}
                    onChange={handleChange}
                    placeholder='EJ. 10'
                />
                {errores.stock && <p className='campo-error'>{errores.stock} </p>}
            </div>

            <div className='campo'>
                <label className='campo-label'>Imagen del producto</label>
                <input
                    type = "text"
                    name = "imagen"
                    className='campo-input'
                    value={producto.imagen}
                    onChange={handleChange}
                    placeholder='EJ. https://...'
                />
                {errores.imagen && <p className='campo-error'>{errores.imagen} </p>}
            </div>

            <div className='campo'>
                <label className='campo-label'>Descripcion del producto</label>
                <textarea
                    name = "descripcion"
                    className='campo-input'
                    value={producto.descripcion}
                    onChange={handleChange}
                    placeholder='Describe tu producto...'
                    rows="3"
                />
                {errores.descripcion && <p className='campo-error'>{errores.descripcion} </p>}
            </div>

            <div className='formulario-acciones'>
                <Boton
                    texto="Crear Producto"
                    variante='primary'
                    onClick={handleSubmit}
                />
                <Boton
                    texto="Reset"
                    variante='danger'
                    onClick={handleLimpiar}
                />
            </div>
        </div>
        )}
    </div>
    );
}

export default FormularioProducto;