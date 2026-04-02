function tryMe() {
  alert("YIPPEE");
}

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

      const phoneLast4 = guest.phoneNumber.substring(guest.phoneNumber.length - 4);
      document.getElementById("displayGuestName").innerHTML += fname + " " + lname + ".";
      document.getElementById("displayPhoneNumber").innerHTML += phoneLast4 + ":"; 
      if (!(document.getElementById("searchFailure").classList.contains("hidden"))) {
        document.getElementById("searchFailure").classList.add("hidden");
      }
      document.getElementById("searchSuccess").classList.remove("hidden");
    } else {
      if (!(document.getElementById("searchSuccess").classList.contains("hidden"))) {
        document.getElementById("searchSuccess").classList.add("hidden");
      }
      document.getElementById("searchFailure").classList.remove("hidden");
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function validateGuest() {
  phone = document.getElementById("phone").value;

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
      g.phoneNumber == phone
    );

    // Reveal results of the search
    if (guest) { 
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

  tryMe();
}
