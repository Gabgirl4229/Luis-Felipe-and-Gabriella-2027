// Translate text.
function t(key) {
  language = localStorage.getItem("site-language");
  return translations[language]?.[key]
      ?? translations.en[key]
      ?? key;
}

// Turn the page
function turnPage(direction) {
  switch (direction) {
    case "next":
      alert("turn to next page");
      break;
    case "previous":
      alert("turn to previous page");
      break;
  }
}
