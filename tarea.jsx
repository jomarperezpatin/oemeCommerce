//function Usuario(props){
//    return(
//        <div>
//            <p>Nombre: {props.nombre}</p>
//            <p>Edad: {props.edad}</p>
//        </div>
//    );
//}

//Un componente te permite encapsular la lógica y la presentación de una parte específica de la interfaz de usuario. En este caso, hemos creado varios componentes como TarjetaProducto, Estadisticas, Catalogo y ResumenCarrito para organizar nuestro código y hacerlo más mantenible. Además, hemos utilizado hooks como useState, useMemo y useCallback para optimizar el rendimiento y evitar renders innecesarios.

//Eventos React

//const handleAgregar = (() => {
//    console.log("Producto agregado al carrito");
//}) Esta es una función que se ejecuta cuando el usuario hace clic en el botón "Agregar al carrito". En este caso, simplemente imprime un mensaje en la consola, pero en una aplicación real, esta función podría actualizar el estado del carrito de compras o realizar otras acciones relacionadas con la adición de productos.

//onClick = {hadleAgregar} El evento onClick es un manejador de eventos que se activa cuando el usuario hace clic en un elemento. En este caso, se utiliza para llamar a la función handleAgregar cuando se hace clic en el botón "Agregar al carrito". Esto permite que la aplicación responda a las acciones del usuario y actualice el estado del carrito de compras en consecuencia.

//onClick = {handleAgregar()} Este es la forma incorrecta de pasar la función al evento onClick. Al incluir los paréntesis, la función se ejecuta inmediatamente al renderizar el componente, en lugar de esperar a que el usuario haga clic en el botón. Esto puede causar problemas de rendimiento y comportamiento inesperado en la aplicación.

//const handleAgregarNombre = ((nombre) => {
//    return(console.log("Producto agregado al carrito: " , nombre));
//}) Esta es una función que recibe un parámetro nombre y lo utiliza para imprimir un mensaje en la consola cuando se agrega un producto al carrito. Esto permite personalizar el mensaje según el producto que se esté agregando, proporcionando información más útil al usuario o al desarrollador.

//onclick={() => handleAgregarNombre(nombre = "Producto 1")} //Esta es la forma correcta de pasar la función al evento onClick cuando se necesita pasar un argumento. Al envolver la llamada a handleAgregarNombre en una función anónima, se asegura que la función solo se ejecute cuando el usuario haga clic en el botón, y no al renderizar el componente. Esto permite que la aplicación responda correctamente a las acciones del usuario y actualice el estado del carrito de compras según el producto seleccionado.

//useEffect(() => {},[]) //El useEffect es un hook que permite ejecutar efectos cada que algo cambien en el componente, siempre va a ocupar un array de dependencias.

//El global context es un patrón de diseño que permite compartir datos y funciones entre diferentes componentes de una aplicación sin necesidad de pasar props manualmente a través de cada nivel del árbol de componentes. En React, esto se logra utilizando la API de Context, que permite crear un contexto global y proporcionar valores a los componentes que lo consumen. Esto facilita la gestión del estado y la comunicación entre componentes, especialmente en aplicaciones grandes y complejas.

//El prop drilling es un patron de diseño que ocurre cuando se pasan props a través de multiples niveles de componentes, lo que puede hacer que el código sea difícil de mantener y entender. Para evitar el prop drilling, se pueden utilizar soluciones como el global context, que permite compartir datos y funciones entre componentes sin necesidad de pasar props manualmente a través de cada nivel del árbol de componentes. Esto mejora la legibilidad y mantenibilidad del código, facilitando la gestión del estado y la comunicación entre componentes en aplicaciones grandes y complejas.

// useRef es un hook que permite crear una referencia mutable a un elemento del DOM o a un valor que persiste entre renderizados. Se utiliza para acceder directamente a elementos del DOM, almacenar valores que no requieren re-renderizado o mantener referencias a funciones y objetos. Esto es útil para manejar formularios, animaciones y otras interacciones con el DOM de manera eficiente en componentes funcionales de React.