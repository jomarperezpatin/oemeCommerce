import './Boton.css';
import {validarProps} from '../../../utils/validarProps';
import { validarOpcion } from '../../../utils/validarProps';
import { motion } from 'framer-motion';

function Boton({
    texto = "Boton", 
    variante = "primary",
    tamano = "normal",
    disabled = false,
    activo = false,
    onClick
    }) {
    validarProps('Boton', 'texto', texto, 'string');
    validarProps('Boton', 'variante', variante, 'string');
    validarProps('Boton', 'tamano', tamano, 'string');
    validarProps('Boton', 'disabled', disabled, 'boolean');
    validarProps('Boton', 'activo', activo, 'boolean');
    validarProps('Boton', 'onClick', onClick, 'function');
    validarOpcion('Boton', 'variante', variante, ['primary', 'secondary', 'danger']);
    validarOpcion('Boton', 'tamano', tamano, ['normal', 'pequeno', 'grande']);
    const variantesValidas = ['primary', 'secondary', 'danger'];
    const varianteSegura = variantesValidas.includes(variante) ? variante : 'primary';
    const clases = `boton ${varianteSegura} ${tamano === 'normal' ? '' : tamano } ${activo ? "activo" : ""}`; // tamano === 'normal' ? '' : tamano para no agregar clase extra si es normal

    return(
        <motion.button 
            className={clases.trim()}
            disabled={disabled}
            onClick={onClick}
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.95}}
        >
            {texto}
        </motion.button>
    )
}

export default Boton;

// Los atomos son componentes que representan elementos basicos de la interfaz de usario, como botones, inputs, etiquetas, etc. Son los bloques de construcción de la interfaz y no tienen estado ni logica compleja. Se utilizan para crear componentes más complejos y se pueden reutilizar en diferentes partes de la aplicación.

//Los props son propiedades que se pasan a los componentes para personalizar su comportamiento y apariencia. En este caso, el componente Boton recibe props como texto, variante, tamano, disabled, activo y onClick para definir cómo se verá y cómo se comportará el botón.

