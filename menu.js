// Allow nav bar to open and close
function toggleMenu() {
  var x = document.getElementById("navLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// Close the menu when you jump forward to a different section of the same page
function closeMenu() {
    document.getElementById("navLinks").style.display = "none";
}

// Enable smooth scrolling for anchor links
document.documentElement.style.scrollBehavior = 'smooth';
