
function setLanguage(language) {
  if (!translations[language]) {
    language = "en";
  }

  // Remember the selected language
  localStorage.setItem("site-language", language);

  // Update the document language
  document.documentElement.lang = language;

  // Update translated elements
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const text = translations[language][key];

    if (text !== undefined) {
      element.textContent = text;
    }
  });
}

function getLanguage() {
  const saved = localStorage.getItem("site-language");

  if (saved && translations[saved]) {
    return saved;
  }

  const preferences = navigator.languages || [
    navigator.language
  ];

  for (const preference of preferences) {
    const language = preference.toLowerCase().split("-")[0];

    if (translations[language]) {
      return language;
    }
  }

  return "en";
}

// Apply the preferred language on page load
setLanguage(getLanguage());
