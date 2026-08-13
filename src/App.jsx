import './App.css';
import { lazy, Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import CatalogoProductos from './components/organisms/CatalogoProductos/CatalogoProductos';
import Header from './components/organisms/Header/Header';
import Footer from './components/organisms/Footer/Footer';
import FormularioProducto from './components/organisms/FormularioProducto/FormularioProducto';
import { ProductosProvider } from './context/ProductosContext';
import MiniCarrito from './components/molecules/MiniCarrito/MiniCarrito';
import { Routes, Route } from 'react-router';
import Home from './pages/Home/Home';
import Navbar from './components/organisms/Navbar/Navbar';
import Catalogo from './pages/Catalogo/Catalogo';
import Carrito from './pages/Carrito/Carrito';
import NotFound from './pages/NotFound/NotFound';
import Perfil from './pages/Perfil/Perfil';
import ProductoDetalle from './pages/ProductoDetalle/ProductoDetalle';
import Checkout from './pages/Checkout/Checkout';



function App() {

  //const titulo = carrito.length === 0 ? "Reto-Shop" : `Reto-Shop (${carrito.length})`;

  //useDocumentTitle(titulo);
  return (
    <ProductosProvider>
      <CartProvider>
        <Navbar/>
        <Suspense fallback={<div className='page-loader'> Cargando...</div>}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/catalogo' element={<Catalogo />} />
            <Route path= '/producto/:id' element={<ProductoDetalle />} />
            <Route path='/Carrito' element ={<Carrito />} />
            <Route path='/Checkout' element={<Checkout />} />
            <Route path='/Perfil' element={<Perfil />} />
            <Route path='*' element ={<NotFound/>} />
          </Routes>
        </Suspense>
        <Footer />
      </CartProvider>
    </ProductosProvider>
  );
}

export default App;

//onAgregarCarrito es una función que se pasa como prop al componente CatalogoProductos, y se llama cada vez que se agrega un producto al carrito. Esta función actualiza el estado del carrito en el componente App, lo que a su vez actualiza la cantidad de productos en el carrito que se muestra en el Header.

//const total = carrito.reduce((suma, producto) => suma + producto.precio, 0) lo que hace esta funcion es recorrer el array del carrito y sumar el precio de cada producto para obtener el total de la compra. El resultado se almacena en la variable total, que se puede usar para mostrar el total de la compra en el componente Header o en cualquier otro lugar de la aplicación.