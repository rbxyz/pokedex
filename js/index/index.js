// puxar da api do poke-api

// Estado do app
const appState = {
    allPokemons: [],
    filteredPokemons: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchTerm: '',
    selectedType: '',
    isLoading: false
}

function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToHtmlLi(pokemon) {
    const paddedOrder = String(pokemon.order).padStart(3, '0')
    return `
    <li class="pokemon">
        <span class="number">#${paddedOrder}</span>
        <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon.types).join('')} 
                </ol>
                <img
                src="${pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}"
                alt="${pokemon.name}"
                />
            </div>
    </li>
    `
}

function filterPokemons() {
    let filtered = [...appState.allPokemons]
    if (appState.selectedType) {
        filtered = filtered.filter(pokemon =>
            pokemon.types.some(typeSlot => typeSlot.type.name === appState.selectedType)
        )
    }

    // Filtro por busca (nome) -- filtro pelo array # otimizar depois 
    if (appState.searchTerm) {
        const searchLower = appState.searchTerm.toLowerCase()
        filtered = filtered.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchLower)
        )
    }

    appState.filteredPokemons = filtered
    appState.currentPage = 1 // Reset para primeira página ao filtrar
    renderPokemons()
    updatePagination()
}

function getPaginatedPokemons() {
    const startIndex = (appState.currentPage - 1) * appState.itemsPerPage
    const endIndex = startIndex + appState.itemsPerPage
    return appState.filteredPokemons.slice(startIndex, endIndex)
}

function renderPokemons() {
    const pokemonList = document.getElementById('pokemonList')
    const paginatedPokemons = getPaginatedPokemons()

    if (appState.isLoading) {
        pokemonList.innerHTML = '<li class="loading">Carregando...</li>'
        return
    }

    if (paginatedPokemons.length === 0) {
        pokemonList.innerHTML = '<li class="no-results">Nenhum Pokémon encontrado</li>'
        return
    }

    pokemonList.innerHTML = paginatedPokemons.map(convertPokemonToHtmlLi).join('')
}

function updatePagination() {
    const totalPages = Math.ceil(appState.filteredPokemons.length / appState.itemsPerPage)
    const pageInfo = document.getElementById('pageInfo')
    const prevButton = document.getElementById('prevButton')
    const nextButton = document.getElementById('nextButton')

    pageInfo.textContent = `Página ${appState.currentPage} de ${totalPages || 1} (${appState.filteredPokemons.length} Pokémon${appState.filteredPokemons.length !== 1 ? 's' : ''})`

    prevButton.disabled = appState.currentPage === 1 || appState.isLoading
    nextButton.disabled = appState.currentPage >= totalPages || appState.isLoading || totalPages === 0
}

function loadPokemonTypes() {
    pokeApi.getPokemonTypes().then((types) => {
        const typeFilter = document.getElementById('typeFilter')
        const pokemonTypes = types.filter(type => {
            const excludedTypes = ['unknown', 'shadow']
            return !excludedTypes.includes(type.name)
        })

        pokemonTypes.forEach(type => {
            const option = document.createElement('option')
            option.value = type.name
            option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1)
            typeFilter.appendChild(option)
        })
    })
}

function loadAllPokemons() {
    appState.isLoading = true
    renderPokemons()

    pokeApi.getPokemons(0, 10000).then((pokemons) => {
        appState.allPokemons = pokemons
        appState.filteredPokemons = pokemons
        appState.isLoading = false
        filterPokemons()
    }).catch((error) => {
        console.error('Erro ao carregar Pokémon:', error)
        appState.isLoading = false
        renderPokemons()
    })
}

console.log(appState)
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput')
    const typeFilter = document.getElementById('typeFilter')
    const prevButton = document.getElementById('prevButton')
    const nextButton = document.getElementById('nextButton')

    searchInput.addEventListener('input', (e) => {
        appState.searchTerm = e.target.value
        filterPokemons()
    })

    typeFilter.addEventListener('change', (e) => {
        appState.selectedType = e.target.value
        filterPokemons()
    })
    // maybe funcione
    console.log(appState.selectedType)

    // Paginação
    prevButton.addEventListener('click', () => {
        if (appState.currentPage > 1) {
            appState.currentPage--
            renderPokemons()
            updatePagination()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    })

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(appState.filteredPokemons.length / appState.itemsPerPage)
        if (appState.currentPage < totalPages) {
            appState.currentPage++
            renderPokemons()
            updatePagination()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    })

    // init
    loadPokemonTypes()
    loadAllPokemons()
})

/*
trocado por map
pokeApi.getPokemons().then((pokemons) => {
    const listItems = []

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItems.push(convertPokemonToHtmlLi(pokemon))
    }
    // não usar dentro do for, pode dar problema de re-render 
    pokemonList.innerHTML += listItems
})

*/