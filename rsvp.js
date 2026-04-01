function sayName(fname, lname) {
  alert("Welcome, " + fname + " " + lname + "!");
}

fname = document.getElementById("fname");
lname = document.getElementById("lname");
document.getElementById("guestSearch").addEventListener("click", sayName(fname, lname));
