import { useEffect, useState, useMemo } from 'react';
import './CatalogoProductos.css';
import ProductCard from '../../molecules/ProductCard/ProductCard';
import { obtenerProductos, obtenerProductosporId } from '../../../services/productServices';
import Boton from '../../atoms/Boton/Boton';
import {useCarrito} from '../../../hooks/useCarrito';
import {useProductos} from '../../../hooks/useProductos';
import ProductCartSkeleton from '../../molecules/ProductCartSkeleton/ProductCartSkeleton';
import EmptyState from '../../molecules/EmptyState/EmptyState';

function CatalogoProductos() {
  const {productos, setProductos, cargando, setCargando, error, setError, cargarProductos} = useProductos();
  const { agregarAlCarrito } = useCarrito();
  const [busqueda, setBusqueda] = useState('');
  const [hora, setHora] = useState();
  const [disponibilidad, setDisponibilidad] = useState('todos');
  const [precioMax, setPrecioMax] = useState('');


  const buscarPorId= async () => {
    const termino = busqueda.trim();

    if (termino === ''){
      cargarProductos();
      return;
    }

    if (isNaN(termino)){
      return;
    }

    setCargando(true);
    setError(null);

    try{
      const producto = await obtenerProductosporId(termino);
      setProductos([producto]);
    } catch (error){
      setError(error.message);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };


  const normalizar = (texto) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); 

  const productosFiltrados = productos.filter((producto) => {
    if (busqueda.trim() !== '' && !isNaN(busqueda.trim())){
      return true;
    }
    return normalizar(producto.nombre).includes(normalizar(busqueda));
  })
  
  const productosDisponibles = productosFiltrados.filter((producto) => {
    if (disponibilidad === 'disponibles'){
      return producto.stock > 0;
    }
    if (disponibilidad === 'agotados'){
      return producto.stock === 0;
    }
    return true;
  });

  const productosVisibles = useMemo(() =>{
    
    const Filtrados = productos.filter((producto) => {
      if (busqueda.trim() !== '' && !isNaN(busqueda.trim())){
        return true;
      }
      return normalizar(producto.nombre).includes(normalizar(busqueda));
      }); //El useMemo aquí se utiliza para memorizar el resultado de la función de filtrado de productos, evitando que se vuelva a calcular en cada renderizado del componente. Esto mejora el rendimiento al reducir la cantidad de cálculos innecesarios cuando los productos o los filtros no han cambiado. 

    const Disponibles = Filtrados.filter((producto) => {
      if (disponibilidad === 'disponibles'){
        return producto.stock > 0;
      }
      if (disponibilidad === 'agotados'){
        return producto.stock === 0;
      }
      return true;
    });

    return Disponibles.filter((producto) => {
      if (precioMax === '') return true;
      return producto.precio <= Number(precioMax);
    });
  }, [productos, busqueda, disponibilidad, precioMax]);
  
  
  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(()=> {
    setHora (new Date().toLocaleTimeString());
  }, [productos]);

  useEffect(()=> {
    if (busqueda.trim() === ''){
      cargarProductos();
    }
  }, [busqueda]);

  const limpiarFiltros = () => {
    setBusqueda('');
    setDisponibilidad('todos');
    setPrecioMax('');
  }
  return (
    <div className='catalogo'>
      <div className='catalogo-filtros'>
        <Boton
          texto="Todos"
          variante='secondary'
          activo={disponibilidad === 'todos'}
          onClick={() => setDisponibilidad('todos')}
        />
        <Boton
          texto="En stock"
          variante='secondary'
          activo={disponibilidad === 'disponibles'}
          onClick={() => setDisponibilidad('disponibles')}
        />
        <Boton
          texto="Agotados"
          variante='secondary'
          activo={disponibilidad === 'agotados'}
          onClick={() => setDisponibilidad('agotados')}
        />
      </div>
      <div className='catalogo-busqueda'>
        <div className='filtro-precio'>
          <label>Precio maximo: </label>
          <input
            type='number'
            placeholder='Precio'
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>
        <input
          type="text"
          className='busqueda-input'
          placeholder="Buscar producto por nombre o Id"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') buscarPorId();
          }}
        />
        <Boton
          texto = {cargando ? "Buscando..." : "Buscar"}
          onClick={buscarPorId}
          variante='secondary'
          disabled={cargando}>
        </Boton>
      </div>
      <div className='catalogo-acciones'>
        <Boton
        texto = {cargando ? "Cargando..." : "Recargar Productos"}
        onClick={cargarProductos}
        disabled={cargando}>      
        </Boton>
        <Boton
          texto="Limpiar Filtros"
          variante='secondary'
          onClick={limpiarFiltros}
        />
      </div>
      {!error && (
        <div className='ultima-actualizacion'>
          <span>Mostrando {productosVisibles.length} de {productos.length} productos</span>
        </div>
      )}
      {error && (
        <div className='catalogo-error'>
          <p>Ups, lo sentimos, no pudimos cargar los productos</p>
          <Boton 
            texto = "Reintentar"
            onClick={cargarProductos}>
          </Boton> 
        </div>
      )}
      {cargando && (
        <div className= "catalogo-grid">
          {Array.from({length: 5}).map((_, i) =>(
            <ProductCartSkeleton key={i} />
          ))}
        </div>
      )}
      {!error && (
        productosVisibles.length === 0 ? (
          <EmptyState
            icono='🔎'
            titulo='Sin resultados'
            descripcion='No se encontraron productos que coincidan con tu búsqueda.'
            accion={{label: 'Limpiar filtros', onClick: limpiarFiltros}}
          />
        ) : (
          <div className='catalogo-grid'>
            {productosVisibles.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onAgregar = {agregarAlCarrito}
              />
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default CatalogoProductos