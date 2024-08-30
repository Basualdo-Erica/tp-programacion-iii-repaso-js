//Pruebas para la API de Thrones.
const fs = require ('fs');

async function fetchCharacters() {
    try {
        const response = await fetch ('https://thronesapi.com/api/v2/Characters');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const characters = await response.json();
        return characters;
    }  
        catch (error) {
            console.error('Error en el fetch:', error);
            return null;
        }
};

function formatearCharacter(character) {
    return console.log(`ID = ${character.id}
Nombre = ${character.firstName}
Apellido = ${character.lastName}
Nombre completo = ${character.fullName}
Título = ${character.title}
Familia = ${character.family}
Imagen = ${character.image}
ImagenUrl = ${character.imageUrl}\n`)
};

//punto1
async function fetchCharacter(nombre, apellido) {
    const characters = await fetchCharacters();
    let idBuscado = characters.findIndex (objeto => objeto.firstName == nombre && objeto.lastName == apellido);
    try {
        const response = await fetch(`https://thronesapi.com/api/v2/Characters/${idBuscado}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const charachter = await response.json();
        console.log("Muestro un personaje en particular:");
        formatearCharacter(charachter);
    }
        catch (error) {
            console.error('Error en el fetch:', error);
        }
};

//punto2
async function showCharacters() {
    const characters = await fetchCharacters();
    console.log("A continuación se muestran todos los personajes: \n")
    if (characters) {
        console.log(characters); 
    } else {
        console.log('No se pudieron obtener los personajes.');
    }
};

//punto 3
async function saveJson() {
    const characters = await fetchCharacters();
    if (characters) {
        const json = JSON.stringify(characters, null, 2);
        fs.writeFileSync('./data/personajes.json', json);
        console.log('\nSe creó el archivo personajes.json en la carpeta data.');
        } else {
            console.log('No se pudieron obtener los personajes.');
        }
};

//punto 4 
function readLocalFile() {
    const file = JSON.parse(fs.readFileSync('./data/personajes.json', 'utf-8'));
    return file;
};

//punto 4a 
function  familyFilter(family) {
    let familyList = readLocalFile().filter(personaje => personaje.family == family);
    console.log(`La familia ${family} está compuesta por:  \n`);
    familyList.map(personaje =>
        formatearCharacter(personaje)
    )
};

//punto 4b 
function addCharacter (character) {
    const file = readLocalFile();
    let newId = file.length;
    character.id = newId;

    file.push(character); //agrego el personaje nuevo
    console.log(`Se agregó el personaje ${character.fullName}. Sus datos son los siguientes: \n`);
    formatearCharacter(character);
    fs.unlinkSync('./data/personajes.json'); //elimino el archivo
    const newFile = JSON.stringify(file, null, 2); //convierto a json 
    fs.writeFileSync('./data/personajes.json', newFile); //escribo el archivo nuevo que tiene mi personaje agregado
};

//punto 4c 
function filterById() {
    let hasta25 = readLocalFile().filter(personaje => personaje.id <= 25); //flitro los personajes con id hasta 25
    const newFile = JSON.stringify(hasta25, null, 2); //convierto a json 
    fs.unlinkSync('./data/personajes.json'); //elimino el original
    fs.writeFileSync('./data/personajes.json', newFile); //guardo archivo con personajes id menores a 25
    console.log('Se filtraron los personajes con ID menores a 25 y se actualizó el archivo personajes.json.');
    console.log(readLocalFile());
};

module.exports = {
    fetchCharacter,
    showCharacters,
    saveJson,
    familyFilter,
    addCharacter,
    filterById
};












