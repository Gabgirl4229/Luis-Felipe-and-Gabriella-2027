const SUPABASE_URL = "https://jgrbmhfdlctagwchclkg.supabase.co";
const SUPABASE_KEY = "sb_publishable_reN-mHjmzkjaDsHH3xOWnw_y9kzTpmK";

const supabaseClient = window.supabase.createClient(
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

  // Ask Supabase to search for said guest
  const { data, error } =
    await supabaseClient.functions.invoke(
      "wedding-rsvp",
      {
        body: {
          action: "search",
          firstName: fname,
          lastName: lname
        }
      }
    );

  // If guest not found
  if (error) {
    console.error("Search error:", error);
    document.getElementById("searchSuccess").classList.add("hidden");
    document.getElementById("searchFailure").classList.remove("hidden");
    return;
  }

  if (!data.found) {
    currentGuest = null;
    document.getElementById("searchSuccess").classList.add("hidden");
    document.getElementById("searchFailure").classList.remove("hidden");
    return;
  }

  // If guest found
  currentGuest = {
    id: data.guestId,
    guestName: data.guestName
  };

  console.log("Guest found:", data);
  console.log("currentGuest:", currentGuest);

  document.getElementById("displayGuestName").textContent =
    `We found your invitation under the name of ${data.guestName}.`;
  document.getElementById("displayPhoneNumber").textContent =
    `Please confirm your identity by entering the digits of your phone number ending in ${data.phoneLast4}:`;

  document.getElementById("searchFailure").classList.add("hidden");
  document.getElementById("validateFailure").classList.add("hidden");
  document.getElementById("searchSuccess").classList.remove("hidden");
}

async function validateGuest() {
  const phone = document.getElementById("phone").value.trim();

  console.log("VERIFY currentGuest:", currentGuest);
  console.log("VERIFY guestId:", currentGuest?.id);
  console.log("VERIFY phone:", phone);

  if (!currentGuest) {
    return;
  }

  // Ask Supabase to verify phone info
  const { data, error } =
    await supabaseClient.functions.invoke(
      "wedding-rsvp",
      {
        body: {
          action: "verify",
          guestId: currentGuest.id,
          phone: phone
        }
      }
    );

  // If phone doesn't match
  if (error) {
    if (error.context) {
      try {
        const errorBody = await error.context.json();
        console.error("Verification function response:", errorBody);
      } catch (e) {
        console.error("Could not read verification response:", e);
      }
    }
    document.getElementById("validateFailure").classList.remove("hidden");
    return;
  }

  // If phone does match
  if (data.verified) {
    currentGuest.phone = phone;
    document.getElementById("answerQuestions").classList.remove("hidden");
    document.getElementById("verifyIdentity").classList.add("hidden");
    document.getElementById("validateFailure").classList.add("hidden");
    document.getElementById("displayGuestNameConfirmed").textContent = data.guestName;
  } else {
    document.getElementById("validateFailure").classList.remove("hidden");
  }
}

async function collectResponses() {  
  if (!currentGuest || !currentGuest.phone) {
    console.error("Guest has not been verified.");
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
  phoneNumber: currentGuest.phone,
  attending: attending,
  preferredLanguage: selectedLanguage,
  foodRestrictions: foodRestrictions,
  messages: message
  });

  // Update Supabase with guest responses
  const { data, error } =
    await supabaseClient.functions.invoke(
      "wedding-rsvp",
      {
        body: {
          action: "submit",
          guestId: currentGuest.id,
          phone: currentGuest.phone,
          attending: attending,
          preferredLanguage: selectedLanguage,
          foodRestrictions: foodRestrictions,
          messages: messages
        }
      }
    );

   if (error) {
    console.log("RSVP response data:", data);
    console.log("RSVP response error:", error);
    console.error("Error saving RSVP:", error);
    alert("There was a problem submitting your RSVP. Please try again.");
    return;
  }

  if (!data.success) {
    alert("There was a problem submitting your RSVP. Please try again.");
    return;
  }
  
  alert("RSVP submitted successfully!");
}

// Start the correct functions when the corresponding buttons are clicked
document.getElementById("guestSearch").addEventListener("click", searchGuest);
document.getElementById("validateGuest").addEventListener("click", validateGuest);
document.getElementById("collectResponses").addEventListener("click", collectResponses);
