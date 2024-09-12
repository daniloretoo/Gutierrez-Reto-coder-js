function elegiTuMate() {
    let mates = [];
    let continuar = true;
    let preciototal = 0;




    while (continuar) {
        const nmate = prompt("Ingresa el tipo de mate: \n Imperial \n Torpedo \n Camionero").toLocaleLowerCase();
        const cantidad = parseFloat(prompt("Ingresa la cantidad"));

        if (isNaN(cantidad) || cantidad < 0 || cantidad > 10) {
            alert("Ingresa una cantidad válida");
        } else {
            let productoEncontrado = productos.find((nproducto) => nproducto.nombre === nmate);
            console.log(productoEncontrado);
            preciototal = preciototal + (cantidad * productoEncontrado.precio);
            console.log(preciototal);
        }
        const respuesta = prompt("Quieres seguir comprando? Si/No").toLocaleLowerCase();
        if(respuesta === "si"){
            continuar = true;
        } else {
            prompt ("El precio final es: " + preciototal)
            continuar = false
            
        }
    }

    console.log("Mates seleccionados:", mates);
}

const productos = [
    {
        nombre: "imperial",
        precio: 15000
    },
    {
        nombre: "torpedo",
        precio: 16000
    },
    {
        nombre: "camionero",
        precio: 17000
    }
];


elegiTuMate();
