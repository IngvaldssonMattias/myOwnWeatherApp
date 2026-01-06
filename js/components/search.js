import { createCordinatesURL } from "../services/url.js";

export function initSearchUI(onCitySelect) {
  const input = document.getElementById("search-field");
  const suggestions = document.getElementById("suggestions");

  // Hämta städer från API
  async function fetchCities(query) {
    if (!query) return [];
    try {
      const response = await fetch(createCordinatesURL(query));
      if (!response.ok) return [];
      const data = await response.json();
      return data.results ? data.results.map(r => r.name) : [];
    } catch (err) {
      console.error("fetchCities error:", err);
      return [];
    }
  }

  // Uppdatera listan med förslag
  async function updateSuggestions() {
    const value = input.value.trim();

    // Visa endast förslag om minst 4 tecken skrivits
    if (value.length < 4) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
      return;
    }

    const cities = await fetchCities(value);
    if (!cities.length) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
      return;
    }

    // Visa max 20 städer i listan, men endast 4 syns utan scroll
    suggestions.innerHTML = "";
    cities.slice(0, 20).forEach(city => {
      const li = document.createElement("li");
      li.textContent = city;
      li.style.padding = "5px 10px"; // justera efter din styling
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        input.value = city;
        suggestions.style.display = "none";
        onCitySelect(city);
      });
      suggestions.appendChild(li);
    });

    // Sätt bredd och position under inputfältet
    const inputRect = input.getBoundingClientRect();
    suggestions.style.width = `${inputRect.width}px`;
    suggestions.style.position = "absolute";
    suggestions.style.top = `${input.offsetTop + input.offsetHeight + 2}px`;
    suggestions.style.left = `${input.offsetLeft}px`;
    suggestions.style.backgroundColor = "#fff";
    suggestions.style.border = "1px solid #ccc";
    suggestions.style.zIndex = "1000";

    // Bestäm maxhöjd baserat på 4 listpunkter
    const liHeight = 30; // justera om dina <li> är högre/lägre
    suggestions.style.maxHeight = `${liHeight * 4}px`;
    suggestions.style.overflowY = "auto";
    suggestions.style.display = "block";
  }

  // Koppla event
  input.addEventListener("input", updateSuggestions);

  // Dölj suggestions om input tappar fokus
  input.addEventListener("blur", () => {
    setTimeout(() => {
      suggestions.style.display = "none";
    }, 100); // timeout för att hinna klicka på förslag
  });

  // Visa suggestions om man fokuserar igen och redan har text
  input.addEventListener("focus", updateSuggestions);
}
