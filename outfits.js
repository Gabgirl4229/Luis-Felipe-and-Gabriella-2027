let slideIndexes = [1, 1];
showSlides(1,0);
showSlides(1,1);

// Next/previous controls
function plusSlides(n, num) {
  showSlides(slideIndexes[num] += n, num);
}

// Thumbnail image controls
function currentSlide(n, num) {
  showSlides(slideIndexes[num] = n, num);
}

function showSlides(n, num) {
  let i;
  let containers = document.getElementsByClassName("slideshow-container");
  let slides = containers[num].getElementsByClassName("mySlides");
  let dots = containers[num].parentElement.querySelectorAll(".dot");
  if (n > slides.length) {slideIndexes[num] = 1}
  if (n < 1) {slideIndexes[num] = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dots-active", "");
  }
  slides[slideIndexes[num]-1].style.display = "block";
  dots[slideIndexes[num]-1].className += " dots-active";
}

function togglePreference() {
  let styles = document.GetElementsByClassName("outfits");
  const toggleValue = document.querySelector('input[name="first-switch"]:checked')?.value;
  if (toggleValue == "masc") {
    containers[0].style.display = "none";
    containers[1].style.display = "none";
  } else if (toggleValue == "fem") {
    // do the same but for the female one
  }
}
