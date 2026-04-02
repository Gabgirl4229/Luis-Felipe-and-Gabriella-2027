function searchGuest() {
  // Collect input of first and last name
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;

  // Read the guest list
  fetch('guests.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  // Check for a match between first + last name
  .then(data => {
    const guest = data.find(g => 
      g.firstName == fname && 
      g.lastName == lname
    );

    // Reveal results of the search
    if (guest) {

      /* collect last 4 digits of phonen number here */
      document.getElementById("displayGuestName").innerHTML += " " + fname + " " + lname + ".";
      document.getElementById("displayPhoneNumber").innerHTML += " " + 
      if (!(document.getElementById("validateFailure").classList.contains("hidden"))) {
        document.getElementById("validateFailure").classList.add("hidden");
      }
      document.getElementById("validateSuccess").classList.remove("hidden");
    } else {
      if (!(document.getElementById("validateSuccess").classList.contains("hidden"))) {
        document.getElementById("validateSuccess").classList.add("hidden");
      }
      document.getElementById("validateFailure").classList.remove("hidden");
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function tryMe() {
  alert("YIPPEE");
}

function validateGuest() {

  tryMe();
}
