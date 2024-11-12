document.getElementById('pokemon-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('pokemon-name').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('pokemon-data').innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_shiny}" alt="${data.name}">
            <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Habilidades:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
            <p><strong>Altura:</strong> ${data.height / 10} m</p>
        `;
    } else {
        document.getElementById('pokemon-data').innerHTML = '<p>Pokémon não encontrado</p>';
    }
});
