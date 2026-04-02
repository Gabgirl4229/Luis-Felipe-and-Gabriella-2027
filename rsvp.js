function searchGuest() {
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  document.getElementById("validate").classList.remove("hidden");
  document.getElementById("searchResult").innerHTML = "Welcome, " + fname + " " + lname + "!";
}

function tryMe() {
  alert("YIPPEE");
}

function validateGuestName() {
  //const guests = JSON.parse(response)
  fetch('guests.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Now you have the JSON data to work with
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  for (const guest in guests) {

  }

  tryMe();
}

//document.getElementById("guestSearch").addEventListener("click", sayName());
