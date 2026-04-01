function sayName() {
  fname = document.getElementById("fname");
lname = document.getElementById("lname");
  alert("Welcome, " + fname + " " + lname + "!");
}

document.getElementById("guestSearch").addEventListener("click", sayName());
