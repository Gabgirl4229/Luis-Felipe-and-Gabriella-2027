let pageIndex = 1;
let deviceType;

// Translate text do something else
function t(key) {
  language = localStorage.getItem("site-language");
  return translations[language]?.[key]
      ?? translations.en[key]
      ?? key;
}

function createMobilePage(container, page) {
  container.innerHTML = ""; // Clear out the container before adding anything to it

  switch (page) {
    case 1:
      // Once Upon a Time
      title = document.createElement("h2");
      title.className = "fancy";
      title.textContent = t("115");
      title.style = "margin: 5%;"
      container.appendChild(title);
      
      // Flower Divider (bigger screens only)
      image1 = document.createElement("img");
      image1.src = "images/ui/divider3.png";
      image1.style = "padding: 0 20%;";
      container.appendChild(image1);
      
      // Fancy Intro
      subtitle1 = document.createElement("h3");
      subtitle1.className = "fancy";
      subtitle1.textContent = t("116") + ",";
      subtitle1.style = "margin-top: 5%;";
      container.appendChild(subtitle1);

      subtitle2 = document.createElement("h3");
      subtitle2.className = "fancy";
      subtitle2.textContent = t("117");
      subtitle2.style = "margin-top: 1%;";
      container.appendChild(subtitle2);

      subtitle3 = document.createElement("h3");
      subtitle3.className = "fancy";
      subtitle3.textContent = t("118");
      subtitle3.style = "margin-top: 1%;";
      container.appendChild(subtitle3);

      subtitle4 = document.createElement("h3");
      subtitle4.className = "fancy";
      subtitle4.textContent = t("119");
      subtitle4.style = "margin-top: 1%;";
      container.appendChild(subtitle4);
      
      break;
    case 2:
      // Chapter 1 Title
      chapterTitle = document.createElement("h2");
      chapterTitle.className = "fancy";
      chapterTitle.textContent = t("129");
      chapterTitle.style = "margin: 5%;";
      container.appendChild(chapterTitle);

      // Paragraph 1
      paragraph = document.createElement("p");
      paragraph.textContent = t("130");
      paragraph.style = "text-align: left;";
      container.appendChild(paragraph);
      
      break;

    case 3:
      // Paragraph 2
      paragraph = document.createElement("p");
      paragraph.textContent = t("131");
      paragraph.style = "margin-top: 5%; text-align: left;";
      container.appendChild(paragraph);

      break;

    case 4:
      // Chapter 2 Title
      chapterTitle = document.createElement("h2");
      chapterTitle.className = "fancy";
      chapterTitle.textContent = t("132");
      chapterTitle.style = "margin: 5%;";
      container.appendChild(chapterTitle);

      // Paragraph 1
      paragraph = document.createElement("p");
      paragraph.textContent = t("133");
      paragraph.style = "text-align: left;";
      container.appendChild(paragraph);

      break;
      
  }
}

function createTabletPage(container, page) {
  container.innerHTML = ""; // Clear out the container before adding anything to it

  switch (page) {
    case 1:
      // Once Upon a Time
      title = document.createElement("h1");
      title.className = "fancy";
      title.textContent = t("115");
      title.style = "margin-top: 10%; margin-bottom: 8%;";
      container.appendChild(title);
      
      // Flower Divider (bigger screens only)
      image1 = document.createElement("img");
      image1.src = "images/ui/divider3.png";
      image1.style = "padding: 0 15%;";
      container.appendChild(image1);
      
      // Fancy Intro
      subtitle1 = document.createElement("h3");
      subtitle1.className = "fancy";
      subtitle1.textContent = t("116");
      subtitle1.style = "margin-top: 10%;";
      container.appendChild(subtitle1);
      
      subtitle2 = document.createElement("h3");
      subtitle2.className = "fancy";
      subtitle2.textContent = t("117");
      subtitle2.style = "margin-top: 10%; margin-right: 40%;";
      container.appendChild(subtitle2);
      
      subtitle3 = document.createElement("h3");
      subtitle3.className = "fancy";
      subtitle3.textContent = t("118");
      subtitle3.style = "margin-top: 2%; margin-left: 40%;";
      container.appendChild(subtitle3);
      
      subtitle4 = document.createElement("h3");
      subtitle4.className = "fancy";
      subtitle4.textContent = t("119");
      subtitle4.style = "margin: 10% 20%;";
      container.appendChild(subtitle4);
      
      break;
    case 2:
      break;

  }
}

function createLaptopPage(container, page) {
  container.innerHTML = ""; // Clear out the container before adding anything to it

  // Master list of pages for creation
  switch (page) {
    case 1:
      // Once Upon a Time
      title = document.createElement("h1");
      title.className = "fancy";
      title.textContent = t("115");
      title.style = "margin-top: 10%; margin-left: 11%; margin-bottom: 4%;";
      container.appendChild(title);
      
      // Flower Divider (bigger screens only)
      image1 = document.createElement("img");
      image1.src = "images/ui/divider3.png";
      image1.style = "padding: 0% 16% 4% 26%;";
      container.appendChild(image1);
      
      // Fancy Intro
      subtitle1 = document.createElement("h3");
      subtitle1.className = "fancy";
      subtitle1.textContent = t("116");
      subtitle1.style = "margin-left: 6%;";
      container.appendChild(subtitle1);
      
      subtitle2 = document.createElement("h3");
      subtitle2.className = "fancy";
      subtitle2.textContent = t("117");
      subtitle2.style = "margin-top: 5%; margin-right: 32%;";
      container.appendChild(subtitle2);
      
      subtitle3 = document.createElement("h3");
      subtitle3.className = "fancy";
      subtitle3.textContent = t("118");
      subtitle3.style = "margin-top: 2%; margin-left: 40%;";
      container.appendChild(subtitle3);
      
      subtitle4 = document.createElement("h3");
      subtitle4.className = "fancy";
      subtitle4.textContent = t("119");
      subtitle4.style = "margin: 5% 18% 0 18%;";
      container.appendChild(subtitle4);
      
      break;
    case 5:
      // Table of Contents Title
      title = document.createElement("h1");
      title.className = "fancy";
      title.textContent = t("128");
      title.style = "margin-top: 10%; margin-right: 15%; margin-bottom: 4%;";
      container.appendChild(title);
      
      // Links to Chapters
      chapter1 = document.createElement("a");
      chapter1.textContent = "1. " + t("129");
      chapter1.onclick = () => loadPages(3);
      chapter1.style = "margin-top: 10%; text-align: center; transform: translate(-22%, 0); color: black;";
      container.appendChild(chapter1);
      
      break;
    case 6:
      // Chapter Title
      chapterTitle = document.createElement("h1");
      chapterTitle.className = "fancy";
      chapterTitle.textContent = t("122");
      chapterTitle.style = "margin-top: 10%; margin-left: 11%; margin-bottom: 4%;";
      container.appendChild(chapterTitle);

      // Paragraphs
      paragraph1 = document.createElement("p");
      paragraph1.textContent = t("123");
      paragraph1.style = "margin: 4% 8% 0 16%; text-align: left;";
      container.appendChild(paragraph1);

      paragraph2 = document.createElement("p");
      paragraph2.textContent = t("124");
      paragraph2.style = "margin: 4% 8% 0 16%; text-align: left;";
      container.appendChild(paragraph2);
      
      break;
    case 7:
      // More Paragraphs
      paragraph3 = document.createElement("p");
      paragraph3.textContent = t("125");
      paragraph3.style = "margin: 14% 18% 0 6%; text-align: left;";
      container.appendChild(paragraph3);

      paragraph4 = document.createElement("p");
      paragraph4.textContent = t("126");
      paragraph4.style = "margin: 4% 18% 0 6%; text-align: left;";
      container.appendChild(paragraph4);
      
      break;
    case 8:
      // More Paragraphs
      paragraph5 = document.createElement("p");
      paragraph5.textContent = t("127");
      paragraph5.style = "margin: 14% 8% 0 16%; text-align: left;";
      container.appendChild(paragraph5);

      paragraph6 = document.createElement("p");
      paragraph6.textContent = t("128");
      paragraph6.style = "margin: 4% 8% 0 16%; text-align: left;";
      container.appendChild(paragraph6);
      break;
    case 9:
      break;
  }

}

// Make the pages appear and disappear
function loadPages(startPage, direction) {
  pageIndex = startPage;
  const container1 = document.getElementById("page-center"); // Load tablet/mobile container
  
  switch (deviceType) {
    case "book-laptop":
      // Make new containers
      const container2 = document.getElementById("page-left");
      const container3 = document.getElementById("page-right");

      // Make page adjustments
      if ((pageIndex % 2) == 0) {
        if (direction == "next") {
          pageIndex++;
        } else {
          pageIndex--;
        }
      }
      
      // Load content into a two-page setup
      createLaptopPage(container2, pageIndex);
      createLaptopPage(container3, pageIndex + 1);
      break;
    case "book-tablet":
      createTabletPage(container1, pageIndex);
      break;
    case "book-mobile":
      createMobilePage(container1, pageIndex);
      break;
  }
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

  loadPages(pageIndex, direction);
}

function getDeviceType(event) {
  deviceType = event.currentTarget.closest("#book-laptop, #book-tablet, #book-mobile")?.id;
}

// Get device type and display first page on startup
if (document.querySelector('#book-mobile')) {
  deviceType = "book-mobile";
} else if (window.getComputedStyle(document.querySelector('#book-tablet')).display == 'none') {
  deviceType = "book-tablet";
  loadPages(1, "previous");
  deviceType = "book-laptop";
} else {
  deviceType = "book-laptop";
  loadPages(1, "previous");
  deviceType = "book-tablet";
}
loadPages(1, "previous");
