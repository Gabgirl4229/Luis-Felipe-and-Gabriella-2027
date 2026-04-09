function tryMe() {
  alert("YIPPEE");
}

function searchGuest() {
  // Collect input of first and last name
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;

  // Read the guest list
  fetch('http://localhost:3000/guests')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  // Check for a match between first + last name
  .then(data => {
    const guest = data.find(g => 
      (g.firstName == fname && g.lastName == lname) || 
      (g.groupMembers && g.groupMembers.includes(fname + " " + lname))
    );

    // Reveal results of the search
    if (guest) {

      const phoneLast4 = guest.phoneNumber.substring(guest.phoneNumber.length - 4);
      document.getElementById("displayGuestName").innerHTML += guest.firstName + " " + guest.lastName + ".";
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

  fetch('http://localhost:3000/guests')
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

    // Reveal results of validation
    if (guest) {
      document.getElementById("answerQuestions").classList.remove("hidden");
      document.getElementById("verifyIdentity").classList.add("hidden");
      document.getElementById("displayGuestName").innerHTML = guest.firstName + " " + guest.lastName;
    } else {
      document.getElementById("validateFailure").classList.remove("hidden");
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function collectResponses() {
  const phone = document.getElementById("phone").value;
  
  const attendanceValue = document.querySelector('input[name="attendance"]:checked')?.value;
  const attending = attendanceValue === "yes" ? "Y" : "N";

  const selectedLanguage = document.querySelector('input[name="language"]:checked')?.value;

  let foodRestrictions = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(cb => cb.value);

  const allergyChecked = document.getElementById("restriction8").checked;
  const allergyText = document.getElementById("allergy").value;

  if (allergyChecked && allergyText) {
    foodRestrictions = foodRestrictions.filter(r => r !== "Allergy");
    foodRestrictions.push("Allergy: " + allergyText);
  }

  const otherChecked = document.getElementById("restriction9").checked;
  const otherText = document.getElementById("otherRestriction").value;

  if (otherChecked && otherText) {
    foodRestrictions = foodRestrictions.filter(r => r !== "Other");
    foodRestrictions.push("Other: " + otherText);
  }

  const message = document.getElementById("comment").value;

  fetch('http://localhost:3000/update-guest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phone,
      attending: attending,
      preferredLanguage: selectedLanguage,
      foodRestrictions: foodRestrictions,
      messages: message
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Saved!', data);
    alert("RSVP submitted successfully!");
  })
  .catch(error => {
    console.error('Error saving RSVP:', error);
  });

}
