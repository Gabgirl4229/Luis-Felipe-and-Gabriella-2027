let pageIndex = 1;

// Translate text.
function t(key) {
  language = localStorage.getItem("site-language");
  return translations[language]?.[key]
      ?? translations.en[key]
      ?? key;
}

// Make the pages appear and disappear
function loadPages() {
  
}

// Turn the page
function turnPage(direction) {
  switch (direction) {
    case "next":
      alert("turn to next page");
      pageIndex++;
      break;
    case "previous":
      alert("turn to previous page");
      pageIndex--;
      break;
  }
  loadPages(pageIndex);
}
