
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.rawTypes = pokeDetail.types;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height / 10; // Convertido para metros
    pokemon.weight = pokeDetail.weight / 10; // Convertido para kg

    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    pokeDetail.stats.forEach((statSlot) => {
        const statName = statSlot.stat.name.replace('-', '');
        pokemon.stats[statSlot.stat.name.replace('-', '')] = statSlot.base_stat;
    });

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.fetchTypeAdvantages = async (rawTypes) => {
    const advantages = new Set();
    
    // Para cada tipo do Pokémon
    for (const typeObj of rawTypes) {
        const typeUrl = typeObj.type.url;
        const response = await fetch(typeUrl);
        const typeDetails = await response.json();
        // Adiciona os tipos contra os quais ele tem dano dobrado
        typeDetails.damage_relations.double_damage_to.forEach(t => advantages.add(t.name));
    }

    return Array.from(advantages);
}
