// index.js

// Seleccionamos el botón de menú desplegable y el menú de navegación
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav ul');

// Añadimos un evento click al botón para alternar la visibilidad del menú
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active'); // Agregar o quitar la clase 'active'
});

// Lógica de añadir productos al carrito
const productos = document.querySelectorAll('.producto button');

productos.forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.parentElement;
        const nombre = producto.querySelector('h3').innerText;
        const precio = parseFloat(producto.querySelector('p').innerText.replace('$', '').replace('.', ''));
        const img = producto.querySelector('img').src;

        const item = { nombre, precio, img };

        // Guardar en el local storage
        let carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoItems.push(item);
        localStorage.setItem('carrito', JSON.stringify(carritoItems));

        alert(`${nombre} ha sido añadido al carrito.`);
    });
});
// Función para cargar los productos del carrito
function cargarCarrito() {
    const carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoDiv = document.querySelector('.carrito-items');
    const totalSpan = document.getElementById('total');
    carritoDiv.innerHTML = ''; // Limpiar el carrito

    let total = 0;

    carritoItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('carrito-item');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.nombre}">
            <span>${item.nombre} - $${item.precio}</span>
            <button class="eliminar-item" data-nombre="${item.nombre}">Eliminar</button>
        `;
        carritoDiv.appendChild(div);
        total += item.precio;
    });

    totalSpan.innerText = total.toFixed(2); // Mostrar el total con dos decimales
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Elimina el carrito del localStorage
    cargarCarrito(); // Vuelve a cargar el carrito para actualizar el DOM
}

// Cargar el carrito al inicio y agregar eventos después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();

    // Evento para vaciar el carrito
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    // Evento para eliminar un producto del carrito
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('eliminar-item')) {
            const nombre = e.target.dataset.nombre;
            let carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];
            carritoItems = carritoItems.filter(item => item.nombre !== nombre);
            localStorage.setItem('carrito', JSON.stringify(carritoItems));
            cargarCarrito(); // Recargar el carrito después de eliminar el item
        }
    });

    // Toggle del menú
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Añadir evento al botón de "Realizar Pago"
    const realizarPagoBtn = document.getElementById('realizar-pago');
    if (realizarPagoBtn) {
        realizarPagoBtn.addEventListener('click', function() {
            const mensajePago = document.getElementById('mensaje-pago');
            mensajePago.style.display = 'block'; // Hacer visible el mensaje
            this.style.display = 'none'; // Ocultar el botón después del pago
        });
    }
});
