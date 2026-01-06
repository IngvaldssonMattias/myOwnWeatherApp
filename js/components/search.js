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

    let cities = await fetchCities(value);
    if (!cities.length) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
      return;
    }

    // Visa max 4 städer men scrolla om fler finns
    suggestions.innerHTML = "";
    cities.slice(0, 20).forEach(city => { // max 20 i listan för scroll
      const li = document.createElement("li");
      li.textContent = city;
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
    suggestions.style.top = `${input.offsetTop + input.offsetHeight + 2}px`; // lite mellanrum
    suggestions.style.left = `${input.offsetLeft}px`;
    suggestions.style.maxHeight = "200px"; // max höjd
    suggestions.style.overflowY = "auto"; // scroll om fler
    suggestions.style.display = "block";
    suggestions.style.backgroundColor = "#fff"; // säkerställ bakgrund
    suggestions.style.border = "1px solid #ccc";
    suggestions.style.zIndex = "1000"; // lägg över andra element
  }

  // Koppla event
  input.addEventListener("input", updateSuggestions);

  // Dölj suggestions om input tappar fokus
  input.addEventListener("blur", () => {
    setTimeout(() => { // timeout för att hinna klicka på förslag
      suggestions.style.display = "none";
    }, 100);
  });

  // Visa suggestions om man fokuserar igen och redan har text
  input.addEventListener("focus", updateSuggestions);
}
