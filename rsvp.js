function tryMe() {
  alert("testing testing 1 2 3");
}

function searchGuest(firstName, lastName) {
}

function showResults(results) {
  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No users found.</p>";
    return;
  }
  const userCard = results.map(user => `
    <div class="user-card">
    <h3>${user.firstName + " " + user.lastName}</h3>
    <p>Test Line 1</p>
    <p>???: ${user.languagePreference}</p>
    </div>
  `).join(""); // Join array of strings into a single HTML string
 
  resultsContainer.innerHTML = userCard;
}

document.getElementById("guestSearch").addEventListener("click", tryMe);
//const guestName = document.getElementById("guestSearch").addEventListener("click", tryMe);
//const results = document.getElementById("results");

