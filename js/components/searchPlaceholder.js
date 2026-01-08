// Ta bort placeholder när man fokuserar i fältet
export function initPlaceholder(input, placeholderText = "Sök efter en stad") {
  input.addEventListener("focus", () => {
    input.placeholder = "";
  });

  // Återställ placeholder om fältet är tomt när man lämnar fältet
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.placeholder = placeholderText;
    }
  });
}
