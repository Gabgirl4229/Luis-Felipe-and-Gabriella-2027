let pageIndex = 1;

// Translate text do something else
function t(key) {
  language = localStorage.getItem("site-language");
  return translations[language]?.[key]
      ?? translations.en[key]
      ?? key;
}


function createPage(container, page) {
  const deviceType = container.parentElement.id;

  // Master list of pages for creation
  switch (page) {
    case 1:
      // Once Upon a Time
      title = document.createElement("h1");
      title.className = "fancy";
      title.textContent = t("115");
      title.style = pagestyles[deviceType]["1"];
      container.appendChild(title);
      
      // Flower Divider (bigger screens only)
      image1 = document.createElement("img");
      image1.src = "images/ui/divider3.png";
      image1.style = pagestyles[deviceType][2];
      container.appendChild(image1);
      
      // Fancy Intro
      subtitle1 = document.createElement("h3");
      subtitle1.className = "fancy";
      subtitle1.textContent = t("116");
      subtitle1.style = pagestyles[deviceType][3];
      container.appendChild(subtitle1);
      
      subtitle2 = document.createElement("h3");
      subtitle2.className = "fancy";
      subtitle2.textContent = t("117");
      subtitle2.style = pagestyles[deviceType][4];
      container.appendChild(subtitle2);
      
      subtitle3 = document.createElement("h3");
      subtitle3.className = "fancy";
      subtitle3.textContent = t("118");
      subtitle3.style = pagestyles[deviceType][5];
      container.appendChild(subtitle3);
      
      subtitle4 = document.createElement("h3");
      subtitle4.className = "fancy";
      subtitle4.textContent = t("119");
      subtitle4.style = pagestyles[deviceType][6];
      container.appendChild(subtitle4);
      
      break;
    case 2:
      // Table of Contents Title
      title = document.createElement("h1");
      title.className = "fancy";
      title.textContent = t("120");
      title.style = pagestyles[deviceType][7];
      container.appendChild(title);
      
      // Links to Chapters
      chapter1 = document.createElement("a");
      chapter1.textContent = t("121");
      chapter1.style = pagestyles[deviceType][8];
      chapter1.onclick = "loadPage(3)";
      container.appendChild(chapter1);
      
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
  if (!document.body.classList.contains("mobile")) {
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
