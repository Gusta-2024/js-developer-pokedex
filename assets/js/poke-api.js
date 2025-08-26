
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
<<<<<<< HEAD
    pokemon.rawTypes = pokeDetail.types;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height / 10; // Convertido para metros
    pokemon.weight = pokeDetail.weight / 10; // Convertido para kg

    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    pokeDetail.stats.forEach((statSlot) => {
        const statName = statSlot.stat.name.replace('-', '');
        pokemon.stats[statSlot.stat.name.replace('-', '')] = statSlot.base_stat;
    });

=======

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

>>>>>>> 627a1ca6aebeb81b88429225fe0a5754e6a58a33
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

<<<<<<< HEAD
pokeApi.getPokemons = (offset = 0, limit = 10) => {
=======
pokeApi.getPokemons = (offset = 0, limit = 5) => {
>>>>>>> 627a1ca6aebeb81b88429225fe0a5754e6a58a33
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
<<<<<<< HEAD

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
=======
>>>>>>> 627a1ca6aebeb81b88429225fe0a5754e6a58a33
