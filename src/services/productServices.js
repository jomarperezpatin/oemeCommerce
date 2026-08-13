const productos = [{
    id : 1,
    nombre: "Funda de telefono",
    precio: 200,
    stock: 1,
    imagen: "https://lacasadelascarcasas.com.mx/213788-large_default/funda-ultra-suave-con-cubre-camara-para-iphone-17.jpg",
    descripcion: "Funda de telefono verde para iphone"
  },
  {
    id : 2,
    nombre: "Audífonos",
    precio: 500,
    stock: 5,
    imagen: "https://m.media-amazon.com/images/I/6126MzHPZtL._AC_UF1000,1000_QL80_.jpg",
    descripcion: "Audífonos para jugar"
  },
  {
    id : 3,
    nombre: "Teclado",
    precio: 230,
    stock: 3,
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Computer_keyboard_ES_layout.svg/1280px-Computer_keyboard_ES_layout.svg.png",
    descripcion: "Teclado de 1990"
  },
  {
    id : 4,
    nombre: "Lavadora",
    precio: 20000,
    stock: 20,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH8UAoL_bazUD3xZzt63bsL7gNe22yOUWMYw&s",
    descripcion: "Lavadora de Carga Superior Samsung WA20A3341GW/AX 20 kg Blanca"
  },
  {
    id : 5,
    nombre: "Mouse",
    precio: 1000,
    stock: 0,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTse8gMtYrx4xcC-W7uzE27AhyNJXErrKrUag&s",
    descripcion: "Mouse gamer Ground Gaming"
  },
];

const conReintentos = async (fn, intentos = 3) => {
  for(let i = 1; i<= intentos; i++){
    try{
      return await fn();
    }catch (error){
      if(i=== intentos) throw error;
      await new Promise((r) => setTimeout(r, 500 * i));
    }
  }
}

const pedirProductos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const huboError = Math.random() < 0.2;
            if (huboError) {
                reject(new Error("Error de conexion"));
            } else {
                resolve(productos);
            }
        }, 1000);
    });
};

export const obtenerProductos = () => conReintentos(pedirProductos, 3);

export const obtenerProductosporId = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          const productFound = productos.find((producto) => producto.id === Number(id));
          if (productFound){
            resolve(productFound);
          } else {
            reject(new Error("No exisite un producto con el id: ", id));
          }
        }, 1000);
    });
};