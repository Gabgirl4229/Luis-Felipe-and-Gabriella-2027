let pageIndex = 1;

// Translate text.
function t(key) {
  language = localStorage.getItem("site-language");
  return translations[language]?.[key]
      ?? translations.en[key]
      ?? key;
}

// Make the pages appear and disappear
function loadPages(startPage) {
  document.getElementById("page-left")?.classList.add("active");
  document.getElementById("page-right")?.setAttribute("class", "owo");
  document.getElementById("page-center")?.setAttribute("class", "owo");

  const container = document.getElementById("groupRSVP");
}

// Turn the page
function turnPage(direction) {
  switch (direction) {
    case "next":
      pageIndex++;
      if (pageIndex > 10) {
        pageIndex = 10;
      }
      alert("turn to page: " + pageIndex);
      break;
    case "previous":
      pageIndex--;
      if (pageIndex < 1) {
        pageIndex = 1;
      }
      alert("turn to page: " + pageIndex);
      
      break;
  }
  loadPages(pageIndex);
}
