
const baseUrl = `https://pokeapi.co/api/v2/`

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=10) => {
    const url = `${baseUrl}pokemon?limit=${limit}&offset=${offset}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        // criando uma interação com o details que é uma segunda camada de api
        // transformar tudo em json
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        /*
        .then((pokemonsDetails) => { 
            debugger
            console.log(pokemonsDetails)})
        */
        .catch((error) => console.error(error))

}

