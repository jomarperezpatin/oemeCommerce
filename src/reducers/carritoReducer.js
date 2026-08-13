export function carritoReducer (estado, accion){
    switch (accion.type){
        case 'agregar': {
            const existe = estado.find((item) => item.id === accion.producto.id);
            if (existe){
                return estado.map((item) => item.id === accion.producto.id ?
                    {...item, cantidad: item.cantidad + 1}: item
                );
            }
            return [...estado, {...accion.producto, cantidad: 1}];
        }

        case 'quitar': {
            return estado.filter((item) => item.id !== accion.id);
        }

        case 'cambiarCantidad': {
            return estado.map((item) => item.id === accion.id
                ? {...item, cantidad: item.cantidad + accion.delta}
                : item
            )
            .filter((item) => item.cantidad > 0);
        }

        case 'vaciar': {
            return [];
        }
    
        default:
            return estado;
    }
}

//Los reducers son funciones puras que toman un estado y una acción como argumentos y devuelven un nuevo estado. En este caso, el carritoReducer maneja las acciones de agregar, quitar, cambiar la cantidad y vaciar el carrito de compras. Esto permite centralizar la lógica de actualización del estado del carrito y facilita su mantenimiento y escalabilidad.