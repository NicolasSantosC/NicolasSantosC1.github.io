const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav ul');

// Añadimos un evento click al botón para alternar la visibilidad del menú
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// carrito.js

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

    totalSpan.innerText = total.toFixed(2);
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    cargarCarrito();
}

// Evento para vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

// Evento para eliminar un producto del carrito
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('eliminar-item')) {
        const nombre = e.target.dataset.nombre;
        let carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoItems = carritoItems.filter(item => item.nombre !== nombre);
        localStorage.setItem('carrito', JSON.stringify(carritoItems));
        cargarCarrito();
    }
});

// Cargar el carrito al inicio
document.addEventListener('DOMContentLoaded', cargarCarrito);

// Añadir evento al botón de "Realizar Pago"
document.getElementById('realizar-pago').addEventListener('click', function() {
    // Mostrar el mensaje de pago realizado
    const mensajePago = document.getElementById('mensaje-pago');
    mensajePago.style.display = 'block'; // Hacer visible el mensaje
    // Opcional: puedes ocultar el botón de pago si ya no es necesario
    this.style.display = 'none'; // Ocultar el botón después del pago
});
