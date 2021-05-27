# coder-house-clase-07
Desafío: Servidor con express
Proyecto de servidor basado en node.js que utiliza el middleware express e implementa tres endpoints en el puerto 8080:
1) Ruta get '/items' que responda un objeto con todos los productos y su cantidad total en el siguiente formato: { items: [productos], cantidad: (cantidad productos) }
2) Ruta get '/item-random' que devuelva un producto elegido al azar desde un array de productos que se encuentran en el archivo 'productos.txt'. El formato de respuesta será: { item: {producto} }
3) Ruta get '/visitas' devuelve un objeto que indica cuantas veces se visitó la ruta del punto 1 y cuantas la ruta del punto 2. Contestar con el formato:  { visitas : { items: cantidad, item: cantidad } }

Utilizar import para importar las dependencias necesarias.
Representar por consola el puerto de conexión del servidor y mensajes de error si los hubiese.
