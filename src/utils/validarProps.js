export function validarProps(componente, nombreProps, valor, tipoEsperado){
    const tipoReal = typeof valor;
    if (valor !== undefined && tipoReal !== tipoEsperado) {
        console.warn(
            ` [${componente}] Las props "${nombreProps}" deberia ser ` + 
            `${tipoEsperado}, pero llego ${tipoReal}.` +
            `(Valor recibido: ${JSON.stringify(valor)})`
        );
    };
}

export function validarOpcion(componente, nombreProp, valor, opcionesValidas){
    if (valor !== undefined && !opcionesValidas.includes(valor)) {
        console.warn(
            ` [${componente}] La props "${nombreProp}" debe ser una de: ` +
            `${opcionesValidas.join(', ')}, pero se recibió: ${valor}.`
        )
    }
} 

