/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

// Simular localStorage
global.localStorage = {
    store: {},
    getItem(key) {
        return this.store[key] || null;
    },
    setItem(key, value) {
        this.store[key] = String(value);
    },
    removeItem(key) {
        delete this.store[key];
    },
    clear() {
        this.store = {};
    }
};

// Cargar el archivo HTML
const html = fs.readFileSync(path.resolve(__dirname, '../carrito.html'), 'utf8');

// Cargar carrito.js aquí
require(path.resolve(__dirname, '../carrito.js'));

describe('Pruebas del carrito de compras', () => {
    beforeEach(() => {
        localStorage.clear(); // Limpiar localStorage antes de cada prueba
        document.body.innerHTML = html.toString(); // Configurar el documento HTML
    });

    test('Cargar productos en el carrito desde localStorage', () => {
        const carritoItems = [
            { nombre: 'Ilustración Digital 1', precio: 10000, img: 'imagen1.jpg' },
            { nombre: 'Ilustración Digital 2', precio: 12000, img: 'imagen2.jpg' }
        ];
        localStorage.setItem('carrito', JSON.stringify(carritoItems));

        cargarCarrito();  // Llamar a la función que carga el carrito

        const items = document.querySelectorAll('.carrito-item');
        expect(items.length).toBe(2);  // Espera que haya 2 elementos en el carrito

        const total = document.getElementById('total').innerText;
        expect(total).toBe('22000.00');  // Verificar el total
    });

    test('Vaciar el carrito correctamente', () => {
        const carritoItems = [{ nombre: 'Ilustración Digital 1', precio: 10000, img: 'imagen1.jpg' }];
        localStorage.setItem('carrito', JSON.stringify(carritoItems));

        cargarCarrito();
        document.getElementById('vaciar-carrito').click();  // Simular el clic en el botón de vaciar carrito

        // Aquí debes verificar que el localStorage está vacío
        expect(localStorage.getItem('carrito')).toBeNull(); // El carrito debe estar vacío

        // Comprobar que no hay elementos en el DOM
        const items = document.querySelectorAll('.carrito-item');
        expect(items.length).toBe(0); // No debe haber elementos en el carrito
    });
});
