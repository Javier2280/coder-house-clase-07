import express from 'express';
import fs from 'fs';

const app = express();
const puerto = 8080;

//Inicializo contadores de visitas a los métodos.
let visitas1 = 0;
let visitas2 = 0;

//Función que me permite obtener un valor aleatorio entre 2 números
function obtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Función que me permite obterner el o los productos según la consigna que lo llama
function obtenerProductos(aleatorio) {
    let data = [];
    let productos = [];
    let cantidades;
    let respuesta = [];

    try {
        data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'));

        if (!aleatorio) {
            for (var i = 0; i < data.length; i++) {
                productos.push(data[i].title);
                cantidades = i + 1;
            }

            respuesta = {
                items: productos.join(),
                cantidad: cantidades
            };

        } else {
            let id = obtenerRandom(0, data.length);
            let producto = data[id].title;

            respuesta = {
                items: producto
            };

        }
    } catch (error) {
        console.log('error', error);
    }

    return respuesta;
}

//Como no tengo un método definido por default agrego un índice de los métodos en la raíz
app.get('/', (req, res) => {
    console.log('Ingresó por la raíz');
    let pagina = `<p>Seleccione una opción:</p><ul><li><a href="http://localhost:${puerto}/items">items<a></li><li><a href="http://localhost:${puerto}/item-random">item-random<a></li><li><a href="http://localhost:${puerto}/visitas">visitas<a></li></ul>`;
    res.send(pagina);
});

//Item 1 de la consigna
app.get('/items', (req, res) => {
    console.log('request para items recibido');

    if (visitas1 == undefined) {
        visitas1 = 1;
    } else {
        visitas1++;
    }

    let texto = JSON.stringify(obtenerProductos(false), null, '\n');
    res.send(texto);
});

//Item 2 de la consigna
app.get('/item-random', (req, res) => {
    console.log('request para item-random recibido');

    if (visitas2 == undefined) {
        visitas2 = 1;
    } else {
        visitas2++;
    }

    let texto = JSON.stringify(obtenerProductos(true), null, '\n');
    res.send(texto);
});

//Item 3 de la consigna
app.get('/visitas', (req, res) => {
    let respuesta = {
        visitas: {
            items: visitas1,
            item: visitas2
        }
    };
    console.log(`request para visitas recibido / cantidades: ${JSON.stringify(respuesta, null, '\n')}`);
    res.send(JSON.stringify(respuesta, null, '\n'));
});

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});