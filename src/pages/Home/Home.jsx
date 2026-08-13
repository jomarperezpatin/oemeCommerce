import { Link } from 'react-router';
import { FaTruck, FaShieldAlt, FaUndoAlt, FaHeadset, FaLaptop, FaMobileAlt, FaHeadphones, FaGamepad } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Home.css';
import Parallax from '../../components/molecules/Parallax/Parallax';

const gridVariants = {
  hidden: {},
  visible : {transition: { staggerChildren: 0.15 }},
};

const cardVariants = {
  hidden: {opacity: 0, y: 30, scale: 0.9},
  visible: {opacity: 1, y: 0, scale: 1}
};


function Home() {
  const categorias = [
    {
      icono: <FaLaptop />,
      nombre: 'Laptops'
    },
    {
      icono: <FaMobileAlt />,
      nombre: 'Smartphones'
    },
    {
      icono: <FaGamepad />,
      nombre: 'Gaming'
    },
    {
      icono: <FaHeadphones />,
      nombre: 'Audio'
    }
  ];

  return (
    <main className="home">
      <Parallax>
        <section className="hero">
          <div className="hero-contenido">
            <h1>
              Tecnología para llevar tu experiencia al siguiente nivel
            </h1>

            <p>
              Descubre laptops, celulares, accesorios y mucho más con la mejor
              calidad y precios competitivos.
            </p>

            <Link to="/catalogo" className="hero-boton">
              Explorar catálogo
            </Link>
          </div>
        </section>

        <section className="beneficios">
          <div className="beneficio">
            <FaTruck className="beneficio-icono" />
            <h3>Envíos rápidos</h3>
            <p>Recibe tus productos en el menor tiempo posible.</p>
          </div>

          <div className="beneficio">
            <FaShieldAlt className="beneficio-icono" />
            <h3>Compra segura</h3>
            <p>Tus pagos están protegidos en todo momento.</p>
          </div>

          <div className="beneficio">
            <FaUndoAlt className="beneficio-icono" />
            <h3>Devoluciones fáciles</h3>
            <p>Realiza cambios o devoluciones sin complicaciones.</p>
          </div>

          <div className="beneficio">
            <FaHeadset className="beneficio-icono" />
            <h3>Soporte</h3>
            <p>Estamos disponibles para ayudarte cuando lo necesites.</p>
          </div>
        </section>
      </Parallax>

      <motion.section className="categorias"
      initial={{opacity: 0, y:40}}
      whileInView={{opacity: 1, y:0}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration:0.6}}>
        <h2>Explora nuestras categorías</h2>

          <motion.div className="categorias-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount:0.2}}>
            {categorias.map((categoria) => (
              <motion.div className="categoria-card" key={categoria.nombre}
              variants={cardVariants}
              whileHover={{y:-8, scale:1.03}}>
                <div className="categoria-icono">
                  {categoria.icono}
                </div>

                <h3>{categoria.nombre}</h3>
              </motion.div>
            ))}
          </motion.div>
      </motion.section>
      
      <motion.section className="cta"
      initial={{opacity: 0, y:40}}
      whileInView={{opacity: 1, y:0}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration:0.6}}>
        <h2>¿Listo para renovar tu tecnología?</h2>

        <p>
          Explora nuestro catálogo y encuentra el producto ideal para ti.
        </p>

        <Link to="/catalogo" className="cta-boton">
          Comprar ahora
        </Link>
      </motion.section>

    </main>
  );
}

export default Home;