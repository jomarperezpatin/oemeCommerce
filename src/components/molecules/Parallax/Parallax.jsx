import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Children, useRef } from 'react';

export default function Parallax({ children,}){
    const target = useRef(null);
    const hero = Children.toArray(children)[0]; //Esto hace que el primer hijo sea el hero, y el segundo sea la sección que queremos que tenga el efecto
    const section = Children.toArray(children)[1]; 
    const section2 = Children.toArray(children)[2];

    const { scrollYProgress } = useScroll({
        target,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0,1], ['0%', '70%']);
    const scale = useTransform(scrollYProgress, [0,1], [1, 0.8]); 
    const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]); 
    
    const scale2 = useSpring(useTransform(scrollYProgress, [0,1], [0.8,1])) //Esto hace que la sección se vea más grande al hacer scroll, y luego vuelva a su tamaño original

    const x = useTransform(scrollYProgress, [0, 1], ['70%', '-70%']);
    const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0.8, 1]));
    const opacityX = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

    return(
        <motion.div ref={target} style={{ overflow: 'hidden' }}>
            <motion.div style={{y, scale, opacity}}>
                {hero}
            </motion.div>
            <motion.div style={{scale: scale2}}>
                {section}
            </motion.div>
            <motion.div style={{ x, scale: scaleX, opacity: opacityX }}>
                {section2}
            </motion.div>
        </motion.div>
    )
}



//useSpring es un hook que permite crear animaciones suaves y naturales en React. se utiliza para animar valores numéricos, como la posición, el tamaño o la opacidad de un elemento, y proporciona una transición más fluida entre los valores iniciales y finales. Esto mejora la experiencia del usuario al hacer que las animaciones se vean más realistas y agradables a la vista.