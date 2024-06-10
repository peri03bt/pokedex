
/*
function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}


function convertPokemonLi(pokemon) {
    return `
            <li class="pokemon">
                
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.order}</span>
                
                
                <div class="detail">
                    <ol class="types">
                        ${convertPokemonTypesToLi(pokemon.types).join(' ')}
                    </ol>                    
                    <img class="animal" src="${pokemon.sprites.other.dream_world.front_default}" 
                            alt="${pokemon.name}">
                </div>
            </li>
    `
}
*/
function convertPokemonLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}">
                
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
                
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                    </ol>                    
                    <img class="animal" src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                </div>
            </li>
    `
}

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 0;
const maxRecords = 288

/* 
pokeApi.getPokemons().then((pokemons = []) => {
    
    const newList = pokemons.map((pokemon) => {
        return convertPokemonLi(pokemon)
    })

    console.log(newList)
    
    const newHtml = newList.join('')
    console.log(newHtml)
    
    pokemonList.innerHTML += newHtml
    
        / o map é uma outra forma de fazer essa mesma função,
        const listItems = []
        
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            //console.log(convertPokemonLi(pokemon))
            listItems.push(convertPokemonLi(pokemon))           
        }
        
        console.log(listItems)
        
    })
*/
    
/*
com conhecimento transformando toda essa função em uma linha: toda a fumção acima

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonLi).join('')
})
*/ 


//adaptando a paginação agora
function loadPokemonsItems(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `
            <li class="pokemon ${pokemon.type}">
                
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
                
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                    </ol>                    
                    <img class="animal" src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                </div>
            </li>
            `).join('')
        pokemonList.innerHTML += newHtml
     })
}
    
loadPokemonsItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    //console.log(offset)
    const qtdRecordNexPage = offset + limit
    
    if (qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        //console.log(newLimit)
        loadPokemonsItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItems(offset, limit)
    }

})