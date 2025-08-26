<<<<<<< HEAD
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const modalContainer = document.getElementById('modal');

const maxRecords = 151;
const limit = 10;
let offset = 0;
let pokemonData = [];

function convertPokemonToLi(pokemon) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png`;
    
    return `
        <li class="pokemon-card ${pokemon.type}" data-id="${pokemon.number}">
            <div class="card-wrapper">
                <div class="card-bg"></div>
            </div>
            <span class="name">${pokemon.name}</span>
            <img src="${imageUrl}" class="character-image" alt="${pokemon.name}">
        </li>
    `;
}

// MUDANÇA: Adicionamos o parâmetro "advantages"
function createModalContent(pokemon, advantages) {
    const statNames = {
        hp: "HP",
        attack: "Ataque",
        defense: "Defesa",
        specialattack: "Ataque Especial",
        specialdefense: "Defesa Especial",
        speed: "Velocidade",
    };

    return `
        <img class="modal-pokemon-image" src="${pokemon.photo}" alt="${pokemon.name}">
        <div class="modal-card ${pokemon.type}">
            <button class="close-button" onclick="closeModal()">×</button>
            <div class="modal-header">
                <div>
                    <span class="name">${pokemon.name}</span>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>
                </div>
                <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
            </div>
            <div class="modal-body">
                <h3>Atributos Base</h3>
                <ul class="stats-list">
                    ${Object.entries(pokemon.stats).map(([stat, value]) => `
                        <li>
                            <span class="stat-name">${statNames[stat] || stat}</span>
                            <strong class="stat-value">${value}</strong>
                            <div class="stat-bar">
                                <div style="width: ${Math.min(value, 150) / 1.5}%;"></div>
                            </div>
                        </li>
                    `).join('')}
                </ul>
                
                <!-- MUDANÇA: Seção de Habilidades trocada por Vantagens -->
                <h3 style="margin-top: 1rem;">Vantagens</h3>
                <p>Causa dano dobrado contra:</p>
                <div class="advantage-types">
                    ${advantages.length > 0 ? advantages.map(type => `<span class="type ${type}">${type}</span>`).join('') : '<span class="no-advantage">Nenhuma</span>'}
                </div>

            </div>
        </div>
    `;
}

// MUDANÇA: A função agora é "async" para esperar as vantagens
async function openModal(pokemonId) {
    const pokemon = pokemonData.find((p) => p.number === pokemonId);
    if (pokemon) {
        // Mostra um estado de carregamento enquanto busca os dados
        modalContainer.innerHTML = `<div class="modal-content" style="padding: 2rem; text-align: center; color: black;">Carregando detalhes...</div>`;
        modalContainer.style.display = "flex";

        // Busca as vantagens usando a nova função
        const advantages = await pokeApi.fetchTypeAdvantages(pokemon.rawTypes);

        // Renderiza o modal completo com as vantagens
        modalContainer.innerHTML = createModalContent(pokemon, advantages);
    }
}

function closeModal() {
    modalContainer.style.display = "none";
    modalContainer.innerHTML = "";
=======
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
>>>>>>> 627a1ca6aebeb81b88429225fe0a5754e6a58a33
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
<<<<<<< HEAD
        pokemonData.push(...pokemons);
        const newHtml = pokemons.map(convertPokemonToLi).join("");
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

pokemonList.addEventListener('click', (event) => {
    const clickedLi = event.target.closest('.pokemon-card');
    if (clickedLi) {
        const pokemonId = parseInt(clickedLi.dataset.id);
        openModal(pokemonId);
    }
});

modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        closeModal();
    }
});
=======
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
>>>>>>> 627a1ca6aebeb81b88429225fe0a5754e6a58a33
