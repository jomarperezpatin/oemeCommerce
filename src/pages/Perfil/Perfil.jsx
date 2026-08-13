import { Link } from "react-router";
import { useState, useEffect} from "react";
import Boton from "../../components/atoms/Boton/Boton";
import "./Perfil.css";

function Perfil() {
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem("perfil");
        return guardado ? JSON.parse(guardado) : {
            nombre: "Omar", 
            email: "omarpere6@gmail.com", 
            ciudad: "Aguascalientes"
        };
    });
    const [editando, setEditando] = useState(false);
    const [formulario, setFormulario] = useState(usuario);

    const handleGuardar = () => {
        setUsuario(formulario);
        setEditando(false);
    };

    const handleCancelar = () => {
        setFormulario(usuario);
        setEditando(false);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormulario({...formulario, [name]: value});
    }

    useEffect(() => {
        localStorage.setItem("perfil", JSON.stringify(usuario));
    }, [usuario]);

    if (editando){
        return(
            <div className="perfil">
                <h1>Editar Perfil</h1>
                <label>Nombre: 
                    <input name= "nombre" value={formulario.nombre} onChange={handleChange}/>
                </label>
                <label>Email:
                    <input name= "email" value={formulario.email} onChange={handleChange}/>
                </label>
                <label>Ciudad:
                    <input name= "ciudad" value={formulario.ciudad} onChange={handleChange}/>
                </label>
                <Boton texto="Guardar" onClick={handleGuardar}/>
                <Boton texto="Cancelar" onClick={handleCancelar}
                variante="danger"/>
            </div>
        )
    }

    return (
        <div className="perfil">
            <h1>Mi Perfil</h1>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Ciudad:</strong> {usuario.ciudad}</p>
            <Boton texto="Editar" onClick={() => setEditando(true)}/>
        </div>
    )
}

export default Perfil;