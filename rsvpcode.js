const SUPABASE_URL = "https://jgrbmhfdlctagwchclkg.supabase.co";
const SUPABASE_KEY = "sb_publishable_reN-mHjmzkjaDsHH3xOWnw_y9kzTpmK";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let currentGuest = null;
let currentGroup = [];

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
    
    await loadGuestGroup();

    // Resets orientation for mobile
    if(document.body.classList.contains("mobile")) {
      document.querySelector("#rsvp").scrollIntoView({
        behavior: "smooth"
      });
    }
    
  } else {
    document.getElementById("validateFailure").classList.remove("hidden");
  }
}


async function loadGuestGroup() {
  if (!currentGuest?.phone) return;

  const { data, error } =
    await supabaseClient.functions.invoke(
      "wedding-rsvp",
      {
        body: {
          action: "getGroup",
          guestId: currentGuest.id,
          phone: currentGuest.phone
        }
      }
    );

  if (error || !data?.success) {
    console.error("Could not load guest group:", error, data);
    alert("Unable to load your RSVP group. Please try again.");
    return;
  }

  currentGroup = data.members;

  if (currentGroup.length === 0) {
    alert("No guests were found for this invitation.");
    return;
  }

  renderGroupRSVP();
}


function renderGroupRSVP() {
  const container = document.getElementById("groupRSVP");
  container.replaceChildren();

  currentGroup.forEach((guest, index) => {
    const details = document.createElement("details");
    details.className = "guest-details";
    details.dataset.guestId = String(guest.id);

    // Open the first guest's section by default.
    details.open = index === 0;

    // The guest's name is the collapsible heading.
    const summary = document.createElement("summary");
    summary.textContent = `${guest.firstName} ${guest.lastName}`;
    details.appendChild(summary);

    const content = document.createElement("div");
    content.className = "guest-details-content";

    // Helper: create a heading.
    function addHeading(text) {
      const heading = document.createElement("h3");
      heading.className = "green";
      heading.textContent = text;
      content.appendChild(heading);
    }

    // Helper: create a paragraph.
    function addParagraph(text) {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      content.appendChild(paragraph);
    }

    // Helper: create a labeled input.
    function addTextInput(field, labelText, value = "") {
      const label = document.createElement("label");
      label.textContent = labelText;

      const input = document.createElement("input");
      input.type = "text";
      input.dataset.field = field;
      input.value = value;

      label.appendChild(input);
      content.appendChild(label);

      return input;
    }

    // Helper: create a radio option.
    function addRadio(groupName, value, labelText, checked) {
      const wrapper = document.createElement("div");
      wrapper.className = "radio-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${groupName}-${guest.id}`;
      input.value = value;
      input.checked = checked;
      input.dataset.field = groupName;

      const label = document.createElement("label");
      label.appendChild(input);
      label.appendChild(document.createTextNode(` ${labelText}`));

      wrapper.appendChild(label);
      content.appendChild(wrapper);
    }

    // Existing database values.
    const restrictions = Array.isArray(guest.foodRestrictions)
      ? guest.foodRestrictions
      : [];

    const messages = Array.isArray(guest.messages)
      ? guest.messages
      : [];

    const existingAllergy = restrictions.find(
      value => value === "Allergy" || value.startsWith("Allergy:")
    ) || "";

    const existingOther = restrictions.find(
      value => value === "Other" || value.startsWith("Other:")
    ) || "";

    const allergyText = existingAllergy.startsWith("Allergy:")
      ? existingAllergy.slice("Allergy:".length).trim()
      : "";

    const otherText = existingOther.startsWith("Other:")
      ? existingOther.slice("Other:".length).trim()
      : "";

    // ATTENDANCE
    addHeading("Attendance");
    addParagraph("Will you be attending our wedding?");

    const attendance = guest.attending || "";

    addRadio("attendance", "Y", "Yes", attendance === "Y");
    addRadio("attendance", "N", "No", attendance === "N");

    // DINING
    addHeading("Dining");
    addParagraph("Do you have any food restrictions?");

    const restrictionOptions = [
      ["Vegetarian", "Vegetarian"],
      ["Vegan", "Vegan"],
      ["Gluten-Free", "Gluten-Free"],
      ["Dairy-Free", "Dairy-Free"],
      ["Nut-Free", "Nut-Free"],
      ["Kosher", "Kosher"],
      ["Halal", "Halal"]
    ];

    restrictionOptions.forEach(([value, labelText]) => {
      const wrapper = document.createElement("div");
      wrapper.className = "checkbox-option";

      const label = document.createElement("label");
      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.value = value;
      checkbox.dataset.field = "restriction";
      checkbox.checked = restrictions.includes(value);

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${labelText}`));

      wrapper.appendChild(label);
      content.appendChild(wrapper);
    });

    // Allergy
    const allergyWrapper = document.createElement("div");
    allergyWrapper.className = "checkbox-option";

    const allergyLabel = document.createElement("label");
    const allergyCheckbox = document.createElement("input");

    allergyCheckbox.type = "checkbox";
    allergyCheckbox.value = "Allergy";
    allergyCheckbox.dataset.field = "restriction";
    allergyCheckbox.checked = Boolean(existingAllergy);

    allergyLabel.appendChild(allergyCheckbox);
    allergyLabel.appendChild(document.createTextNode(" Allergy: "));

    allergyWrapper.appendChild(allergyLabel);

    const allergyInput = document.createElement("input");
    allergyInput.type = "text";
    allergyInput.dataset.field = "allergy";
    allergyInput.placeholder = "Please describe the allergy";
    allergyInput.value = allergyText;

    allergyWrapper.appendChild(allergyInput);
    content.appendChild(allergyWrapper);

    // Other restriction
    const otherWrapper = document.createElement("div");
    otherWrapper.className = "checkbox-option";

    const otherLabel = document.createElement("label");
    const otherCheckbox = document.createElement("input");

    otherCheckbox.type = "checkbox";
    otherCheckbox.value = "Other";
    otherCheckbox.dataset.field = "restriction";
    otherCheckbox.checked = Boolean(existingOther);

    otherLabel.appendChild(otherCheckbox);
    otherLabel.appendChild(document.createTextNode(" Other: "));

    otherWrapper.appendChild(otherLabel);

    const otherInput = document.createElement("input");
    otherInput.type = "text";
    otherInput.dataset.field = "otherRestriction";
    otherInput.placeholder = "Please specify";
    otherInput.value = otherText;

    otherWrapper.appendChild(otherInput);
    content.appendChild(otherWrapper);

    // LANGUAGE
    addHeading("Language");
    addParagraph("What is your preferred language?");

    const language = guest.preferredLanguage || "";

    addRadio("language", "english", "English", language === "english");
    addRadio("language", "spanish", "Spanish", language === "spanish");
    addRadio(
      "language",
      "portuguese",
      "Portuguese",
      language === "portuguese"
    );

    // MESSAGES
    addHeading("Messages");
    addParagraph(
      "Share any questions, heartfelt sentiments, or messages with us."
    );

    const messageLabel = document.createElement("label");
    messageLabel.textContent = "Your message: ";

    const messageInput = document.createElement("textarea");
    messageInput.dataset.field = "comment";
    messageInput.rows = 4;
    messageInput.maxLength = 1000;
    messageInput.placeholder = "Type your message here...";
    messageInput.value = messages.join("\n");

    messageLabel.appendChild(messageInput);
    content.appendChild(messageLabel);

    details.appendChild(content);
    container.appendChild(details);
  });
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
