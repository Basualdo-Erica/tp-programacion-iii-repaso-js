// Funciones para interactuar con FakeStore API

const fetch = require('node-fetch');

async function obtenerTodosLosProductos() {  
    try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
            throw new Error(`Error al obtener los productos: ${respuesta.status}`);
        }
        const productos = await respuesta.json();
        console.log(productos);
        return productos;
    } catch (error) {
        console.error(error);
    }
}

async function numeroLimitadoProductos(limitado) {
    try {
        const respuesta = await fetch(`https://fakestoreapi.com/products?limit=${limitado}`);
        if (!respuesta.ok) {
            throw new Error(`Error al obtener un número limitado de productos: ${respuesta.status}`);
        }
        const limiteProductos = await respuesta.json();
        console.log(limiteProductos);
        return limiteProductos;
    } catch (error) {
        console.error(error);
    }
}

async function agregarProducto(nuevoProducto) {
    try {
        const respuesta = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            body: JSON.stringify(nuevoProducto),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!respuesta.ok) {
            throw new Error(`Error al agregar un nuevo producto: ${respuesta.status}`);
        }
        const productoAgregado = await respuesta.json();
        console.log('Producto agregado:', productoAgregado);
        return productoAgregado;
    } catch (error) {
        console.error(error);
    }
}
async function fetchProductById(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Producto encontrado:', data);
        return data;
    } catch (error) {
        console.error('Error al recuperar producto por ID:', error);
        return null;
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        console.log('Producto eliminado');
        return response.ok ? 'Producto eliminado' : 'Error al eliminar producto';
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return null;
    }
}

module.exports = {
    obtenerTodosLosProductos,  
    numeroLimitadoProductos,
    agregarProducto,
    fetchProductById, 
    deleteProduct
};
