const audio = document.getElementById("audio");
const button = document.getElementById("audioToggle");
const icon = document.getElementById("speakerIcon");

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    icon.src = "speaker-on.svg";
    icon.alt = "Audio on";
    button.setAttribute("aria-label", "Mute audio");
  } else {
    audio.pause();
    icon.src = "speaker-off.svg";
    icon.alt = "Audio muted";
    button.setAttribute("aria-label", "Play audio");
  }
});
