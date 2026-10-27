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
            throw new Error("Error loading the JSON file");
        }

        const data = await response.json();

        if (category === "countries") {
            return data.countries.flatMap(country => country.cities);
        }

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

    console.log(data)

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


