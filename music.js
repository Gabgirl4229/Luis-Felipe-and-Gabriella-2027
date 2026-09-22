const audio = document.getElementById("song");
const button = document.getElementById("audioToggle");
const icon = document.getElementById("speakerIcon");

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    icon.src = "images/ui/speaker_on.PNG";
    icon.alt = "Audio on";
    button.setAttribute("aria-label", "Mute audio");
  } else {
    audio.pause();
    icon.src = "images/ui/speaker_off.PNG";
    icon.alt = "Audio muted";
    button.setAttribute("aria-label", "Play audio");
  }
});
