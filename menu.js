    // Allow nav bar to open and close
    function toggleMenu() {
      var x = document.getElementById("navLinks");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
    // Enable smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
