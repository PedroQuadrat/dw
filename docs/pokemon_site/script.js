document
  .getElementById("pokemon-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("pokemon-name").value.toLowerCase();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const data = await response.json();

    if (response.ok) {
      document.getElementById("pokemon-data").innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_shiny}" alt="${data.name}">
            <p><strong>Tipo:</strong> ${data.types
              .map((type) => type.type.name)
              .join(", ")}</p>
            <p><strong>Habilidades:</strong> ${data.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
            <p><strong>Altura:</strong> ${data.height / 10} m</p>
        `;
    } else {
      document.getElementById("pokemon-data").innerHTML =
        "<p>Pokémon não encontrado</p>";
    }
  }); /*eu acho q tem algo a ver com documento by id tem q ser igual ao da api pelo visto*/
/*----------------------------------------------------------------------------------------*/

document
  .getElementById("pokemon-type-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const type = document
      .getElementById("pokemon-type-input")
      .value.toLowerCase();
    document.getElementById("pokemon-info").innerHTML;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!response.ok) throw new Error("Tipo não encontrado");

      const data = await response.json();

      const pokemonList = data.pokemon.slice(0, 10);

      const pokemonDetails = await Promise.all(
        pokemonList.map(async (p) => {
          const pokemonResponse = await fetch(p.pokemon.url);
          if (!pokemonResponse.ok)
            throw new Error(`Erro ao buscar dados de ${p.pokemon.name}`);
          return pokemonResponse.json();
        })
      );

      const pokemonHtml = pokemonDetails
        .map(
          (pokemon) => `
            <li>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" width="100">
                <p>${pokemon.name}</p>
            </li>
        `
        )
        .join("");

      document.getElementById("pokemon-info").innerHTML = `
            <h2>Pokémon do tipo "${type}"</h2>
            <ul style="list-style-type: none; padding: 0;">
                ${pokemonHtml}
            </ul>
        `;
    } catch (error) {
      document.getElementById(
        "pokemon-info"
      ).innerHTML = `<p>${error.message}</p>`;
    }
  });
/*-------------------------------------------------------------------------*/

(async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/region`);
        if (!response.ok) throw new Error("Erro ao buscar regiões");

        const regions = await response.json();
        const regionSelect = document.getElementById('pokemon-region-select');

        regions.results.forEach(region => {
            const option = document.createElement('option');
            option.value = region.name;
            option.textContent = region.name.charAt(0).toUpperCase() + region.name.slice(1);
            regionSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar regiões:", error);
        document.getElementById('pokemon-region').innerHTML = `<p>Erro ao carregar regiões.</p>`;
    }
})();

document.getElementById('pokemon-region-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const region = document.getElementById('pokemon-region-select').value;
    document.getElementById('pokemon-region').innerHTML = `<p>Carregando...</p>`;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/region`);
        if (!response.ok) throw new Error("Erro ao buscar regiões");

        const regions = await response.json();
        const selectedRegion = regions.results.find(r => r.name === region);
        if (!selectedRegion) throw new Error("Região não encontrada");

        const regionResponse = await fetch(selectedRegion.url);
        if (!regionResponse.ok) throw new Error("Erro ao buscar dados da região");

        const regionData = await regionResponse.json();
        const generationUrl = regionData.main_generation.url;

        const generationResponse = await fetch(generationUrl);
        if (!generationResponse.ok) throw new Error("Erro ao buscar dados da geração");

        const generationData = await generationResponse.json();
        const pokemonList = generationData.pokemon_species;


        const pokemonHtml = pokemonList.map(p => `<li>${p.name}</li>`).join('');
        document.getElementById('pokemon-region').innerHTML = `
            <h2>Pokémon da região ${region.charAt(0).toUpperCase() + region.slice(1)}</h2>
            <ul style="list-style-type: none; padding: 0;">
                ${pokemonHtml}
            </ul>
        `;
    } catch (error) {
        document.getElementById('pokemon-region').innerHTML = `<p>${error.message}</p>`;
    }
});