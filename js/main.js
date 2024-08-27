function elegiTuMate (){
    const productos = [
        { nombre: "Imperial", stock: 0 },
        { nombre: "Torpedo", stock: 2 },
        { nombre: "Camionero", stock: 0 }
    ];
    let nproducto = prompt("Elegi tu futuro mate :  \n Imperial \n Torpedo \n Camionero");



    for (let i = 0; i< productos.length; i++){
        //console.log (productos[i].nombre)
    
        if (productos[i].nombre == nproducto){
            if (productos[i].stock > 0){
                alert ("En este momento hay stock disponible")
            }else{
            alert ("En este momento no hay stock disponible")
            }
        }
    }
}

elegiTuMate ();