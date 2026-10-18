
function setLanguage(language) {
  if (!translations[language]) {
    language = "en";
  }

  // Remember the selected language
  localStorage.setItem("site-language", language);

  // Update the document language
  document.documentElement.lang = language;

  // Update translated text
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const text = translations[language][key];

    if (text !== undefined) {
      element.textContent = text;
    }
  });

  // Update images and audio
  switch (language) {
    case "en":
      document.getElementById("homepage-img")?.setAttribute("src", "images/ui/homepage-en.PNG");
      document.getElementById("home")?.setAttribute("src", "images/ui/homepage-en.PNG");
      document.getElementById("song").src = "audio/english_song.mp3";
      break;
    case "es":
      document.getElementById("homepage-img")?.setAttribute("src", "images/ui/homepage-es.PNG");
      document.getElementById("home")?.setAttribute("src", "images/ui/homepage-es.PNG");
      document.getElementById("song").src = "audio/spanish_song.mp3";
      break;
    case "pt":
      document.getElementById("homepage-img")?.setAttribute("src", "images/ui/homepage-pt.PNG");
      document.getElementById("home")?.setAttribute("src", "images/ui/homepage-pt.PNG");
      document.getElementById("song").src = "audio/portuguese_song.mp3";
      break;
  }
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
