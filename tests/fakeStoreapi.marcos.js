const url_api = 'https://fakestoreapi.com/products';

// Punto 1
async function buscarDatos() {
    try {
        const response = await fetch(url_api);
        if (!response.ok){
            throw new Error("Error con los datos:", response.status);
        }

        const datos = await response.json();
        console.log(datos);
    } catch (error){
        console.log(error);
    }
}

// Punto 2
const url_api_limitada = 'https://fakestoreapi.com/products';
async function buscarDatosLimitados(cant) {
    try {
        const res2 = await fetch(url_api_limitada + '?limit=' + cant);
        if (!res2.ok){
            throw new Error("Error con los datos:", res2.status);
        }

        const datos_limitados = await res2.json();
        console.log("Punto 2", datos_limitados);
    } catch (error){
        console.log(error);
    }
}

// Punto 3
const url_api_agregar = 'https://fakestoreapi.com/products';
async function agregarProducto(producto) {
    try {
        const res3 = await fetch(url_api_agregar, {
            method: "POST",
            body: JSON.stringify(producto)
        });
        if (!res3.ok){
            throw new Error("Error con los datos:", res3.status);
        }

        const id_producto = await res3.json();
        console.log("Punto 3", id_producto);
    } catch (error){
        console.log("errorrr", error);
    }
}

// Punto 4
async function buscarProducto(id) {
    try {
        const response = await fetch(url_api + '/' + id);
        if (!response.ok){
            throw new Error("Error con los datos:", response.status);
        }

        const datos = await response.json();
        console.log(datos);
    } catch (error){
        console.log(error);
    }
}

//Punto 5
async function eliminarProducto(id) {
    try {
        const res5 = await fetch(url_api + '/' + id, {
            method: "DELETE"
        });
        if (!res5.ok){
            throw new Error("Error con los datos:", res5.status);
        }

        const id_producto = await res5.json();
        console.log("Punto 5", id_producto);
    } catch (error){
        console.log("errorrr", error);
    }
}

module.exports = {
    buscarDatos,  
    buscarDatosLimitados,
    buscarProducto,
    eliminarProducto,
    agregarProducto
};