let pageIndex = 1;

// Translate text
function t(key) {
  language = localStorage.getItem("site-language");
  return translations[language]?.[key]
      ?? translations.en[key]
      ?? key;
}

// Prep for different sizes
function getDevice() {
  const deviceType;
  if (document.body.classList.contains("mobile")) {
    deviceType = "mobile";
  } else if (getElementById("page-center").hasClass("hidden")) {
    deviceType = "laptop";
  } else {
    deviceType = "tablet";
  }
  return deviceType;
}

function stylePage(element) {
  return pagestyles[getDevice()][element];
}

function createPage(container, page) {

  // Master list of pages for creation
  switch (page) {
    case 1:
      // Once Upon a Time
      const title = document.createElement("h1");
      title.className = "fancy";
      title.style = "margin-top: 10%; margin-left: 8%;";
      title.textContent = t("115");
      container.appendChild(title);
      // Flower Divider
      const image1 = document.createElement("img");
      image1.src = "images/ui/divider3.png";
      image1.style = "padding: 0 15% 0 20%;";
      container.appendChild(image1);
      // Fancy Intro
      const subtitle1 = document.createElement("h3");
      subtitle1.className ="fancy";
      subtitle1.textContent = t("116");
      container.appendChild(subtitle1);
      const subtitle2 = document.createElement("h3");
      subtitle2.className ="fancy";
      subtitle2.style = "margin-top: 6%; margin-right: 40%;";
      subtitle2.textContent = t("117");
      container.appendChild(subtitle2);
      const subtitle3 = document.createElement("h3");
      subtitle3.className ="fancy";
      subtitle3.style = "margin-top: 4%; margin-left: 40%;";
      subtitle3.textContent = t("118");
      container.appendChild(subtitle3);
      const subtitle4 = document.createElement("h3");
      subtitle4.className ="fancy";
      subtitle4.style = "margin: 6% 20% 0 15%;";
      subtitle4.textContent = t("119");
      container.appendChild(subtitle4);
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
