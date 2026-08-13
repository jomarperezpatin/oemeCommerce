import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import "./Checkout.css";

export default function Checkout() {
    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        direccion: ""
    });
    const [editando, setEditando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        async function cargarUsuario() {
            try {
                const res = await fetch("/api/user", { credentials: "include" });
                if (res.ok) {
                    const u = await res.json();
                    setFormulario({
                        nombre: u.name || u.nombre || "",
                        email: u.email || "",
                        direccion: u.address || u.direccion || ""
                    });
                    return;
                }
            } catch (err) {

            }

            try {
                const raw = localStorage.getItem("perfil");
                if (raw) {
                    const p = JSON.parse(raw);
                    setFormulario({
                        nombre: p.nombre || p.name || "",
                        email: p.email || "",
                        direccion: p.direccion || p.address || ""
                    });
                }
            } catch (e) {

            }
        }
        cargarUsuario();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((s) => ({ ...s, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        if (!formulario.nombre || !formulario.email || !formulario.direccion) {
            setMensaje("Por favor, complete todos los campos.");
            return;
        }
        setMensaje("Procesando su pedido...");

        try {
            const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
            const payload = {
                name: formulario.nombre,
                email: formulario.email,
                address: formulario.direccion,
                cart: carrito
            };

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                setMensaje("Pedido confirmado. N°: " + data.orderId ?? "-");

                localStorage.removeItem("carrito");
                setEditando(false);
            } else {
                const txt = await res.text();
                setMensaje("Error al confirmar: " + txt);
            }
        } catch (err) {
            setMensaje("Error de red: " + err.message);
        }
    };
    return (
        <div className="pagina-checkout">
            <h1>Checkout</h1>

            <form className="checkout-form" onSubmit={handleSubmit}>
                <label>
                    Nombre
                    <input
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        readOnly={!editando}
                    />
                </label>

                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={formulario.email}
                        onChange={handleChange}
                        readOnly={!editando}
                    />
                </label>

                <label>
                    Dirección
                    <textarea
                        name="direccion"
                        rows="3"
                        value={formulario.direccion}
                        onChange={handleChange}
                        readOnly={!editando}
                    />
                </label>

                <div className="acciones">
                    <button type="button" onClick={() => setEditando((s) => !s)}>
                        {editando ? "Bloquear" : "Editar"}
                    </button>

                    <button type="submit">Confirmar pedido</button>

                    <Link to="/carrito" className="volver-link">Volver al carrito</Link>
                </div>
            </form>

            <div className="mensaje" role="status" aria-live="polite">
                {mensaje}
            </div>
        </div>
    );
}
