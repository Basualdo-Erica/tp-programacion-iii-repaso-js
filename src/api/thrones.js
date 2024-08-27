const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function fetchCharacters() {
    try {
        const response = await fetch('https://thronesapi.com/api/v2/Characters');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const characters = await response.json();
        return characters;
    } catch (error) {
        console.error('Error en el fetch:', error);
        return null;
    }
}

function formatearCharacter(character) {
    return console.log(`ID = ${character.id}
Nombre = ${character.firstName}
Apellido = ${character.lastName}
Nombre completo = ${character.fullName}
Título = ${character.title}
Familia = ${character.family}
Imagen = ${character.image}
ImagenUrl = ${character.imageUrl}\n`);
}

async function fetchCharacter(nombre, apellido) {
    const characters = await fetchCharacters();
    let idBuscado = characters.findIndex(objeto => objeto.firstName === nombre && objeto.lastName === apellido);
    try {
        const response = await fetch(`https://thronesapi.com/api/v2/Characters/${idBuscado}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const character = await response.json();
        formatearCharacter(character);
    } catch (error) {
        console.error('Error en el fetch:', error);
    }
}

async function showCharacters() {
    const characters = await fetchCharacters();
    if (characters) {
        console.log(characters);
    } else {
        console.log('No se pudieron obtener los personajes.');
    }
}

async function saveJson() {
    const characters = await fetchCharacters();
    if (characters) {
        const json = JSON.stringify(characters, null, 2);
        fs.writeFileSync(path.join(__dirname, 'data', 'personajes.json'), json);
        console.log('Archivo personajes.json creado.');
    } else {
        console.log('No se pudieron obtener los personajes.');
    }
}

function readLocalFile() {
    const file = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'personajes.json'), 'utf-8'));
    return file;
}

function familyFilter(family) {
    let familyList = readLocalFile().filter(personaje => personaje.family === family);
    console.log(`La familia ${family} está compuesta por: `);
    familyList.map(personaje => formatearCharacter(personaje));
}

function addCharacter() {
    const file = readLocalFile();
    let newId = file.length;
    const newCharacter = {
        "id": newId,
        "firstName": "James",
        "lastName": "Fraser",
        "fullName": "James Alexander Malcolm MacKenzie Fraser",
        "title": "Laird Fraser of Broch Tuarach",
        "family": "Fraser",
        "image": "jamie.jpg",
        "imageUrl": "https://ar.pinterest.com/pin/7740630590310472/"
    };

    file.push(newCharacter);
    console.log(`Se agregó el personaje ${newCharacter.fullName}`);
    formatearCharacter(newCharacter);
    fs.writeFileSync(path.join(__dirname, 'data', 'personajes.json'), JSON.stringify(file, null, 2));
    console.log('Archivo actualizado.');
}

function filterById() {
    let hasta25 = readLocalFile().filter(personaje => personaje.id <= 25);
    fs.writeFileSync(path.join(__dirname, 'data', 'personajes.json'), JSON.stringify(hasta25, null, 2));
    console.log('Archivo personajes.json actualizado.');
}

module.exports = { fetchCharacter, showCharacters, saveJson, familyFilter, addCharacter, filterById };
