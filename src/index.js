//Archivo principal para probar los ejercicios

//fakeStore
const { obtenerTodosLosProductos, numeroLimitadoProductos, agregarProducto, fetchProductById, deleteProduct } = require('./api/fakeStore');

(async () => {
    console.log('obteniendo todos los productos...')
    await obtenerTodosLosProductos();
    
    await numeroLimitadoProductos(5);  

    const nuevoProducto = {
        title: 'Nuevo producto',
        price: 30,
        description: 'Este es un producto para probar',
        image: 'https://i.pravatar.cc',
        category: 'electronics'
    };

    console.log('nuevo producto agregado')
    await agregarProducto(nuevoProducto);

    await numeroLimitadoProductos(5);
    const productId = 1;
    console.log(`Buscando producto con ID ${productId}...`);
    await fetchProductById(productId);


    console.log(`Eliminando producto con ID ${productId}...`);
    await deleteProduct(productId);
})();


//Pruebas para la API de Thrones.
const { fetchCharacter, showCharacters, saveJson, familyFilter, addCharacter, filterById } = require('./api/thrones');

//punto 1 - muestra los detalles de un personaje en particular
const nombre = 'Ned';
const apellido = 'Stark';
fetchCharacter(nombre, apellido);

//punto 2 - muestra lista de personajes
showCharacters();

//punto 3 - Guarda lista personajes en un archivo json
saveJson();

//punto 4a - Filtrar por familia
const family = "House Stark";
familyFilter(family);

//punto 4b - Agregar personaje y actualizar
const newCharacter = {
    "id": 0,
    "firstName": "James",
    "lastName": "Fraser",
    "fullName": "James Alexander Malcolm MacKenzie Fraser",
    "title": "Laird Fraser of Broch Tuarach",
    "family": "Fraser",
    "image": "jamie.jpg",
    "imageUrl": "https://ar.pinterest.com/pin/7740630590310472/"
    }
addCharacter(newCharacter);

//punto 4c - Filtrar personajes por ID y actualizar
filterById();