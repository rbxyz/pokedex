/* Funções de manipulação */

const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.log(error))
}

pokeApi.getPokemonTypes = () => {
    const url = `https://pokeapi.co/api/v2/type`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .catch((error) => console.log(error))
}

pokeApi.getPokemonsByType = (typeName) => {
    const url = `https://pokeapi.co/api/v2/type/${typeName}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.pokemon.map((pokemonSlot) => pokemonSlot.pokemon))
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.log(error))
}

pokeApi.getAllPokemons = () => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .catch((error) => console.log(error))
}