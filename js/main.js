let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productos = [ 
    {
        id: "mate1",
        titulo: "Mate Imperial",
        precio: 35000,
        img: "./img/imperialliso.png",
    },
    {
        id: "mate2",
        titulo: "Mate Torpedo",
        precio: 43000,
        img: "./img/torpedoliso.jpg",
    },
    {
        id: "mate3",
        titulo: "Mate Camionero", 
        precio: 54000,
        img: "./img/camioneroargentina.jpg",
    },
    {
        id: "mate4",
        titulo: "Mate Imperial liso",
        precio: 47000,
        img: "./img/imperialliso.png",
    },
    {
        id: "mate5",
        titulo: "Mate Acero Inox",
        precio: 23000,
        img: "./img/mateaceroinox.webp",
    },
    {
        id: "mate6",
        titulo: "Yerba Baldo",
        precio: 13000,
        img: "./img/yerbabaldo.webp",
    }
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });

    div.append(button);
    contenedorProductos.append(div);
});

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $${producto.precio * producto.cantidad}</p>
            `;

            let buttonAumentar = document.createElement("button");
            buttonAumentar.classList.add("carrito-producto-btn");
            buttonAumentar.innerText = "➕";
            buttonAumentar.addEventListener("click", () => {
                aumentarCantidad(producto);
            });
            div.append(buttonAumentar);

            let buttonReducir = document.createElement("button");
            buttonReducir.classList.add("carrito-producto-btn");
            buttonReducir.innerText = "➖";
            buttonReducir.addEventListener("click", () => {
                reducirCantidad(producto);
            });
            div.append(buttonReducir);

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "✖️";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });

            div.append(button);
            carritoProductos.append(div);
        });

        let buttonFinalizar = document.createElement("button");
        buttonFinalizar.classList.add("finalizar-btn");
        buttonFinalizar.innerText = "Finalizar Compra";
        buttonFinalizar.addEventListener("click", finalizarCompra);
        carritoProductos.append(buttonFinalizar);
    }
    actualizarTotal(); 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

function borrarDelCarrito(producto) {
    let indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);

    actualizarCarrito();
}

function actualizarTotal() {
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

function aumentarCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    itemEncontrado.cantidad++;

    actualizarCarrito();
}

function reducirCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado.cantidad >= 2) {
        itemEncontrado.cantidad--;
        actualizarCarrito();
    } else {
        borrarDelCarrito(itemEncontrado);
    }
}

function finalizarCompra() {
    const mensaje = document.getElementById("mensaje");

    if (carrito.length === 0) {
        mensaje.innerText = "El carrito está vacío.";
        mensaje.classList.remove("d-none");
        return;
    }

    mensaje.innerText = "¡Gracias por tu compra!";
    mensaje.classList.remove("d-none");

    carrito = []; 
    actualizarCarrito();
}

actualizarCarrito();
