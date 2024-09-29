// Seleccionamos el botón de menú desplegable y el menú de navegación
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav ul');

// Añadimos un evento click al botón para alternar la visibilidad del menú
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});
// index.js (añadir lógica de añadir productos al carrito)

const productos = document.querySelectorAll('.producto button');

productos.forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.parentElement;
        const nombre = producto.querySelector('h3').innerText;
        const precio = parseFloat(producto.querySelector('p').innerText.replace('$', ''));
        const img = producto.querySelector('img').src;

        const item = { nombre, precio, img };

        // Guardar en el local storage
        let carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoItems.push(item);
        localStorage.setItem('carrito', JSON.stringify(carritoItems));

        alert(`${nombre} ha sido añadido al carrito.`);
    });
});
