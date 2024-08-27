//Pruebas para la API de FakeStore.

const { obtenerTodosLosProductos, numeroLimitadoProductos, agregarProducto } = require('../src/api/fakeStore');

(async () => {
    console.log('Probando obtenerTodosLosProductos...');
    try {
        const productos = await obtenerTodosLosProductos();
        console.log('Productos obtenidos:', productos);
    } catch (error) {
        console.error('Error al probar obtenerTodosLosProductos:', error);
    }

    console.log('Probando numeroLimitadoProductos con límite 5...');
    try {
        const productosLimitados = await numeroLimitadoProductos(5);
        console.log('Productos limitados:', productosLimitados);
    } catch (error) {
        console.error('Error al probar numeroLimitadoProductos:', error);
    }

    const nuevoProducto = {
        title: 'nuevo producto',
        price: 30,
        description: 'Este es un producto para probar',
        image: 'https://i.pravatar.cc',
        category: "men's clothing"
    };

    console.log('Probando agregarProducto...');
    try {
        const productoAgregado = await agregarProducto(nuevoProducto);
        console.log('Producto agregado:', productoAgregado);
    } catch (error) {
        console.error('Error al probar agregarProducto:', error);
    }

    console.log('Probando numeroLimitadoProductos después de agregar un producto...');
    try {
        const productosActualizados = await numeroLimitadoProductos(5);
        console.log('Productos actualizados:', productosActualizados);
    } catch (error) {
        console.error('Error al probar numeroLimitadoProductos después de agregar un producto:', error);
    }
})();
