let pageIndex = 1;

// Translate text.
function t(key) {
  language = localStorage.getItem("site-language");
  return translations[language]?.[key]
      ?? translations.en[key]
      ?? key;
}

function createPage(container, page) {
  // Helper: create a heading.
  function addHeading(text) {
    const heading = document.createElement("h3");
    heading.className = "green";
    heading.textContent = text;
    content.appendChild(heading);
  }

  // Helper: create a paragraph.
  function addParagraph(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    content.appendChild(paragraph);
  }

  // Master list of pages for creation
  switch (page) {
    case 1:
      const title = document.createElement("h1");
      title.className = "fancy mid";
      title.textContent = t("115");
      container.appendChild(title);
      const subtitle = document.createElement("h3");
      subtitle.className ="fancy mid";
      subtitle.textContent = t("116");
      container.appendChild(subtitle);
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
    case 9:
      break;
    case 10:
      break;
  }

}

// Make the pages appear and disappear
function loadPages(startPage) {
  // Find the empty pages
  const container1 = document.getElementById("page-center");
  if (!(document.getElementById("body").hasClass("mobile"))) {
    const container2 = document.getElementById("page-left");
    const container3 = document.getElementById("page-right");

    // Load content into a two-page setup
    createPage(container2, startPage);
    createPage(container3, startPage + 1);
  }
  // Load content into a one-page setup
  createPage(container1, startPage);
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
