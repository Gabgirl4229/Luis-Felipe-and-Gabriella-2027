const SUPABASE_URL = "https://jgrbmhfdlctagwchclkg.supabase.co";
const SUPABASE_KEY = "sb_publishable_reN-mHjmzkjaDsHH3xOWnw_y9kzTpmK";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let currentGuest = null;

function tryMe() {
  alert("YIPPEE");
}

async function searchGuest() {
  // Collect input of first and last name
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();

  if (!fname || !lname) {
    return;
  }

  // Search for said guest
  const { data: exactMatch, error: exactError } = await supabase
    .from("guests")
    .select("*")
    .eq("firstName", fname)
    .eq("lastName", lname)
    .maybeSingle();

  if (exactError) {
    console.error("Error searching for guest:", exactError);
    showSearchFailure();
    return;
  }

  // Display success or failure
  let guest = exactMatch;

  if (guest) {
    currentGuest = guest;

    const phoneLast4 = String(guest.phoneNumber).slice(-4);

    document.getElementById("displayGuestName").textContent =
      `We found your invitation under the name of ${guest.firstName} ${guest.lastName}.`;

    document.getElementById("displayPhoneNumber").textContent =
      `Please confirm your identity by entering the digits of your phone number ending in ${phoneLast4}:`;

    document.getElementById("searchFailure").classList.add("hidden");
    document.getElementById("validateFailure").classList.add("hidden");
    document.getElementById("searchSuccess").classList.remove("hidden");

  } else {
    currentGuest = null;
    document.getElementById("searchSuccess").classList.add("hidden");
    document.getElementById("searchFailure").classList.remove("hidden");
  }
}

function validateGuest() {
  const phone = document.getElementById("phone").value.trim();

  if (!currentGuest) {
    return;
  }
  
  // Reveal results of validation
  if (String(currentGuest.phoneNumber) === phone) {
    document.getElementById("answerQuestions").classList.remove("hidden");
    document.getElementById("verifyIdentity").classList.add("hidden");
    document.getElementById("validateFailure").classList.add("hidden");
    document.getElementById("displayGuestNameConfirmed").textContent = `${currentGuest.firstName} ${currentGuest.lastName}`;
  } else {
    document.getElementById("validateFailure").classList.remove("hidden");
  }
}

async function collectResponses() {  
  if (!currentGuest) {
    console.error("No guest is currently selected.");
    return;
  }
  
  const attendanceValue = document.querySelector('input[name="attendance"]:checked')?.value;
  if (!attendanceValue) {
    alert("Please select whether you will be attending.");
    return;
  }
  const attending = attendanceValue === "yes" ? "Y" : "N";

  const selectedLanguage = document.querySelector('input[name="language"]:checked')?.value || null;

  let foodRestrictions = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(cb => cb.value);

  const allergyChecked = document.getElementById("restriction8").checked;
  const allergyText = document.getElementById("allergy").value;

  if (allergyChecked && allergyText) {
    foodRestrictions = foodRestrictions.filter(r => r !== "Allergy");
    foodRestrictions.push(`Allergy: ${allergyText}`);
  }

  const otherChecked = document.getElementById("restriction9").checked;
  const otherText = document.getElementById("otherRestriction").value;

  if (otherChecked && otherText) {
    foodRestrictions = foodRestrictions.filter(r => r !== "Other");
    foodRestrictions.push(`Other: ${otherText}`);
  }

  const message = document.getElementById("comment").value.trim();
  const messages = message ? [message] : [];

  console.log({
  phoneNumber: currentGuest.phoneNumber,
  attending: attending,
  preferredLanguage: selectedLanguage,
  foodRestrictions: foodRestrictions,
  messages: message
  });

  // Update Supabase with guest responses
  const { data, error } = await supabase
    .from("guests")
    .update({
      attending: attending,
      preferredLanguage: selectedLanguage,
      foodRestrictions: foodRestrictions,
      messages: messages
    })
    .eq("id", currentGuest.id)
    .select();

   if (error) {
    console.error("Error saving RSVP:", error);
    alert("There was a problem submitting your RSVP. Please try again.");
    return;
  }

  console.log("RSVP saved:", data);
  alert("RSVP submitted successfully!");
}
