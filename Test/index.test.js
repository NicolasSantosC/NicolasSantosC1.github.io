/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

// Cargar el archivo HTML simulado
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Prueba del menú desplegable', () => {
    let menuToggle;
    let menu;

    beforeEach(() => {
        // Simular el HTML en el DOM
        document.documentElement.innerHTML = html.toString();

        // Seleccionar los elementos necesarios
        menuToggle = document.querySelector('.menu-toggle');
        menu = document.querySelector('nav ul');
    });

    test('El menú se activa o desactiva cuando se hace clic en el botón de menú', () => {
        // Simular el evento de clic
        menuToggle.click();
        expect(menu.classList.contains('active')).toBe(true);

        // Simular otro clic
        menuToggle.click();
        expect(menu.classList.contains('active')).toBe(false);
    });
});
