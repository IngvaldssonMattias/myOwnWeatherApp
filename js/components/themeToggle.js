// components/themeToggle.js
export function initThemeToggle(themeToggleButton, root) {
  // Hämta sparat tema från localStorage
  const savedTheme = localStorage.getItem("preferred-theme");

  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }

  // Kontrollera om dark mode är aktivt
  function isDarkMode() {
    return root.getAttribute("data-theme") === "dark";
  }

  // Uppdatera knappens text beroende på tema
  function updateButtonLabel() {
    if (!isDarkMode()) {
      themeToggleButton.textContent = " 🔆 ";
    } else {
      themeToggleButton.textContent = " 🌙 ";
    }
  }

  updateButtonLabel();

  // Lyssna på knappklick för att växla tema
  themeToggleButton.addEventListener("click", () => {
    const nextTheme = isDarkMode() ? "light" : "dark";

    if (nextTheme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    updateButtonLabel();
    localStorage.setItem("preferred-theme", nextTheme);

    // Lägg till rotationseffekt
    themeToggleButton.classList.add("rotate");
    setTimeout(() => {
      themeToggleButton.classList.remove("rotate");
    }, 300);
  });
}
