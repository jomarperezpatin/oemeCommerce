import { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router';
import "./Checkout.css";

export default function Checkout() {
    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        direccion: ""
    });
    const [editando, setEditando] = useState(true);
    const [mensaje, setMensaje] = useState("");

    // Estado para el carrito
    const [carrito, setCarrito] = useState([]);

    // refs para evitar parseos/updates redundantes
    const lastCarritoRaw = useRef("");
    const lastPerfilRaw = useRef("");

    useEffect(() => {
        async function cargarUsuario() {
            try {
                const res = await fetch("/api/user", { credentials: "include" });
                if (res.ok) {
                    const u = await res.json();
                    const nuevo = {
                        nombre: u.name || u.nombre || "",
                        email: u.email || "",
                        direccion: u.address || u.direccion || ""
                    };
                    setFormulario(nuevo);
                    lastPerfilRaw.current = JSON.stringify(nuevo);
                    return;
                }
            } catch (err) {
                // fallback to localStorage
            }

            try {
                const raw = localStorage.getItem("perfil") || "";
                if (raw) {
                    lastPerfilRaw.current = raw;
                    const p = JSON.parse(raw);
                    setFormulario({
                        nombre: p.nombre || p.name || "",
                        email: p.email || "",
                        direccion: p.direccion || p.address || ""
                    });
                }
            } catch (e) {
                // ignore parse errors
            }
        }

        function cargarCarritoLocal() {
            try {
                const raw = localStorage.getItem("carrito") || "[]";
                lastCarritoRaw.current = raw;
                const c = JSON.parse(raw);
                setCarrito(Array.isArray(c) ? c : []);
            } catch (e) {
                setCarrito([]);
                lastCarritoRaw.current = "";
            }
        }

        cargarUsuario();
        cargarCarritoLocal();

        // storage event para otras pestañas/ventanas
        function onStorage(e) {
            if (!e) return;
            if (e.key === 'carrito') {
                try {
                    const raw = e.newValue || '[]';
                    lastCarritoRaw.current = raw;
                    const c = JSON.parse(raw);
                    setCarrito(Array.isArray(c) ? c : []);
                } catch (err) {
                    // ignore
                }
            }
            if (e.key === 'perfil') {
                try {
                    const raw = e.newValue || '';
                    lastPerfilRaw.current = raw;
                    if (raw) {
                        const p = JSON.parse(raw);
                        setFormulario({
                            nombre: p.nombre || p.name || "",
                            email: p.email || "",
                            direccion: p.direccion || p.address || ""
                        });
                    }
                } catch (err) {
                    // ignore
                }
            }
        }

        window.addEventListener('storage', onStorage);

        // Polling fallback para detectar cambios en la misma pestaña (solo carrito)
        const interval = setInterval(() => {
            try {
                const rawCar = localStorage.getItem('carrito') || '[]';
                if (rawCar !== lastCarritoRaw.current) {
                    lastCarritoRaw.current = rawCar;
                    const c = JSON.parse(rawCar);
                    setCarrito(Array.isArray(c) ? c : []);
                }
            } catch (err) {
                // ignore
            }
        }, 800);

        return () => {
            window.removeEventListener('storage', onStorage);
            clearInterval(interval);
        };
    }, []);

    const total = useMemo(() => {
        return carrito.reduce((s, item) => {
            const precio = Number(item.price ?? item.precio ?? 0) || 0;
            const cantidad = Number(item.cantidad ?? item.qty ?? item.quantity ?? 1) || 0;
            return s + precio * cantidad;
        }, 0);
    }, [carrito]);

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

        if (!carrito || carrito.length === 0) {
            setMensaje("El carrito está vacío. Agrega productos antes de confirmar.");
            return;
        }

        setMensaje("Procesando su pedido...");

        try {
            const payload = {
                name: formulario.nombre,
                email: formulario.email,
                address: formulario.direccion,
                cart: carrito,
                total: total
            };

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                const orderId = data?.orderId ?? data?.id ?? null;
                setMensaje("Pedido confirmado. N°: " + (orderId ?? "-"));

                localStorage.removeItem("carrito");
                lastCarritoRaw.current = "";
                setCarrito([]);
                setEditando(false);
            } else {
                const txt = await res.text();
                setMensaje("Error al confirmar: " + txt);
            }
        } catch (err) {
            setMensaje("Error de red: " + (err?.message ?? err));
        }
    };

    return (
        <div className="pagina-checkout">
            <h1>Checkout</h1>

            {/* Resumen del carrito */}
            <section className="checkout-cart">
                <h2>Tu carrito</h2>
                {carrito && carrito.length > 0 ? (
                    <table className="carrito-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio unit.</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((item) => {
                                const precio = Number(item.price ?? item.precio ?? 0) || 0;
                                const cantidad = Number(item.cantidad ?? item.qty ?? item.quantity ?? 1) || 0;
                                const subtotal = precio * cantidad;
                                return (
                                    <tr key={item.id ?? item.sku ?? Math.random()}>
                                        <td>{item.name ?? item.titulo ?? item.title ?? "—"}</td>
                                        <td>{cantidad}</td>
                                        <td>${precio.toFixed(2)}</td>
                                        <td>${subtotal.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                                <td style={{ fontWeight: 'bold' }}>${total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                ) : (
                    <p>Tu carrito está vacío.</p>
                )}
            </section>

            <form className="checkout-form" onSubmit={handleSubmit}>
                <label>
                    Nombre
                    <input
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                    />
                </label>

                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={formulario.email}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                    />
                </label>

                <label>
                    Dirección
                    <textarea
                        name="direccion"
                        rows="3"
                        value={formulario.direccion}
                        onChange={handleChange}
                        placeholder="Calle, número, colonia, ciudad..."
                    />
                </label>

                <div className="acciones">
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