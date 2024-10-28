const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonInfo = document.getElementById('pokemon-info');

// Elements for displaying Pokemon data
const pokemonElements = {
    name: document.getElementById('pokemon-name'),
    id: document.getElementById('pokemon-id'),
    weight: document.getElementById('weight'),
    height: document.getElementById('height'),
    types: document.getElementById('types'),
    hp: document.getElementById('hp'),
    attack: document.getElementById('attack'),
    defense: document.getElementById('defense'),
    specialAttack: document.getElementById('special-attack'),
    specialDefense: document.getElementById('special-defense'),
    speed: document.getElementById('speed')
};

// API endpoint using freeCodeCamp's PokéAPI Proxy
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Function to clear all displayed data
const clearPokemonInfo = () => {
    Object.values(pokemonElements).forEach(element => {
        if (element) element.textContent = '';
    });
    const existingSprite = document.getElementById('sprite');
    if (existingSprite) {
        existingSprite.remove();
    }
};

// Function to update the UI with Pokemon data
const updatePokemonInfo = (pokemon) => {
    clearPokemonInfo();

    // Update name and ID
    pokemonElements.name.textContent = pokemon.name.toUpperCase();
    pokemonElements.id.textContent = pokemon.id;
    
    // Update height and weight (without labels)
    pokemonElements.height.textContent = pokemon.height;
    pokemonElements.weight.textContent = pokemon.weight;

    // Update stats
    const statsMap = {
        'hp': 'hp',
        'attack': 'attack',
        'defense': 'defense',
        'special-attack': 'specialAttack',
        'special-defense': 'specialDefense',
        'speed': 'speed'
    };

    pokemon.stats.forEach(stat => {
        const elementKey = statsMap[stat.stat.name];
        if (elementKey && pokemonElements[elementKey]) {
            pokemonElements[elementKey].textContent = stat.base_stat;
        }
    });

    // Add sprite
    const spriteContainer = document.querySelector('.sprite-container');
    const sprite = document.createElement('img');
    sprite.id = 'sprite';
    sprite.src = pokemon.sprites.front_default;
    sprite.alt = pokemon.name;
    spriteContainer.appendChild(sprite);

    // Add types
    pokemon.types.forEach(type => {
        const typeElement = document.createElement('div');
        const typeName = type.type.name.toUpperCase();
        typeElement.textContent = typeName;
        typeElement.classList.add(typeName);
        pokemonElements.types.appendChild(typeElement);
    });
};

// Function to fetch Pokemon data
const fetchPokemon = async (searchTerm) => {
    try {
        const response = await fetch(API_URL + searchTerm.toLowerCase());
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        updatePokemonInfo(data);
    } catch (error) {
        alert('Pokémon not found');
        clearPokemonInfo();
    }
};

// Event listeners
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchPokemon(searchTerm);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchPokemon(searchTerm);
        }
    }
});