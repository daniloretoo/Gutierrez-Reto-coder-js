let carrito = []; 
const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");


const API_URL = 'https://fakestoreapi.com/products';


function cargarProductos() {
    axios.get(API_URL)
        .then(response => {
            mostrarProductos(response.data);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
            contenedorProductos.innerHTML = "<p>Error al cargar los productos.</p>";
        });
}

function mostrarProductos(productos) {
    contenedorProductos.innerHTML = ""; 
    if (productos.length === 0) {
        contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    productos.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("col-md-4", "producto");
        div.innerHTML = `
            <div class="card">
                <img class="producto-img card-img-top" src="${producto.image}" alt="${producto.title}">
                <div class="card-body">
                    <h3 class="card-title">${producto.title}</h3>
                    <p class="card-text">$${producto.price}</p>
                </div>
            </div>
        `;

        let button = document.createElement("button");
        button.classList.add("btn", "btn-primary");
        button.innerText = "Agregar al carrito";
        button.addEventListener("click", () => {
            agregarAlCarrito({
                id: producto.id,
                titulo: producto.title,
                precio: producto.price,
                img: producto.image
            });
        });

        div.append(button);
        contenedorProductos.append(div);
    });
}


function actualizarCarrito() {
    carritoProductos.innerHTML = "";
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoTotal.innerHTML = "";
        return;
    }

    carritoVacio.classList.add("d-none");
    let total = 0;
    carrito.forEach((producto, index) => {
        let div = document.createElement("div");
        div.classList.add("producto-carrito");
        div.innerHTML = `
            <img src="${producto.img}" alt="${producto.titulo}" style="width: 50px;">
            <span>${producto.titulo}</span>
            <span>$${producto.precio.toFixed(2)}</span>
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoProductos.append(div);
        total += producto.precio;
    });

    carritoTotal.innerHTML = `$${total.toFixed(2)}`;

    let btnComprar = document.createElement("button");
    btnComprar.classList.add("btn", "btn-primary", "me-2");
    btnComprar.innerText = "Comprar";
    btnComprar.onclick = () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
        } else {
            alert("Compra realizada con éxito!");
            carrito = []; 
            actualizarCarrito(); 
        }
    };

    let btnVaciar = document.createElement("button");
    btnVaciar.classList.add("btn", "btn-primary", "me-2");
    btnVaciar.innerText = "Vaciar Carrito";
    btnVaciar.onclick = () => {
        carrito = []; 
        actualizarCarrito();
    };


    carritoTotal.appendChild(btnComprar);
    carritoTotal.appendChild(btnVaciar);
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito(); 
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito(); 
}


document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarCarrito(); 
});
