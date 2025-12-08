export function saveSearch(city, temp) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Ta bort duplicat om staden redan finns
    history = history.filter(item => item.city !== city);

    // Lägg till nya sökningen **längst fram** (index 0)
    history.unshift({ city: city, temperature: temp });

    // Håll bara de senaste 3 sökningarna
    if (history.length > 3) {
        history.pop(); // ta bort den sista (äldsta)
    }

    localStorage.setItem("searchHistory", JSON.stringify(history));
}
