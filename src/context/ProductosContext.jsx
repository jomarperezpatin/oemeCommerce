import { createContext, useState, useEffect} from "react";
import { obtenerProductos } from "../services/productServices";

export const ProductosContext = createContext();

export function ProductosProvider ({children}) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const cargarProductos = async () => {
        setCargando(true);
        setError(null);
    
        try{
            const productosCargados = await obtenerProductos();
            setProductos(productosCargados);
        } catch (error){
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    const agregarProducto = (producto) => {
        const productoConId = {
            ...producto,
            id: Date.now(),
            precio: Number(producto.precio),
            stock: Number(producto.stock)
        };
        setProductos([...productos, productoConId]);
    }

    useEffect(() => {
        cargarProductos();
    }, []);


    const valor = {
        productos,
        setProductos,
        cargando,
        setCargando,
        error,
        setError,
        cargarProductos,
        agregarProducto
    }

    return (
            <ProductosContext.Provider value={valor}>
                {children}
            </ProductosContext.Provider>
        );
}

//El useState es un hook que permite agregar estado a los componentes funcionales. En este caso, se utiliza para almacenar la lista de productos, el estado de carga y el estado de error lo cual te ayuda a que puedas modificar el estado del componente. El useEffect es otro hook que permite ejecutar efectos secundarios en los componentes funcionales. En este caso, se utiliza para cargar los productos desde un servicio externo cuando el componente se monta por primera vez.