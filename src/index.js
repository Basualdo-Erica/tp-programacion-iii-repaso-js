//Archivo principal para probar los ejercicios

//fakeStore
const { obtenerTodosLosProductos, numeroLimitadoProductos, agregarProducto } = require('./api/fakeStore');

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
}) (); 


//Pruebas para la API de Thrones.
