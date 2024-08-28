const { buscarDatos, buscarDatosLimitados, buscarProducto, eliminarProducto, agregarProducto } = require('./fakeStoreapi.marcos')

const producto = {
    title: 'Prueba',
    price: 22,
    description: 'Producto de prueba',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
}

//buscarDatos();
buscarDatosLimitados(6);
//buscarProducto(1);
//eliminarProducto(6);
//agregarProducto(producto);