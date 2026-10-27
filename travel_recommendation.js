const typeOfRecommendation = {
    temple: "temples",
    beach: "beaches",
    country: "countries"
};

async function search() {
    const searchInput = document
        .getElementById("search-input")
        .value.trim()
        .toLowerCase();

    const category = typeOfRecommendation[searchInput];

    if (!category) {
        return [];
    }

    try {
        const response = await fetch("travel_recommendation_api.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar o arquivo JSON");
        }

        const data = await response.json();

        return data[category] ?? [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function searchResult() {
    const searchResults = document.getElementById("search-results");
    const data = await search();

    searchResults.innerHTML = "";

    if (data.length === 0) {
        searchResults.classList.remove("visible");
        return;
    }

    searchResults.classList.add("visible");

    data.forEach((item) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <img src="./images/${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;

        searchResults.appendChild(div);
    });
}

function clearResults() {
    document.getElementById("search-input").value = "";
    document.getElementById("search-results").innerHTML = "";
}


