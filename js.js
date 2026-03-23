// AAC Board - Text to Speech (Universal Version)
const phrases = {
  "Eat": "I want to eat",
  "Drink": "I want to drink",
  "Help": "I need help",
  "Pain": "I am in pain",
  "Yes": "Yes",
  "No": "No",
  "Bathroom": "I need to use the bathroom",
  "Happy": "I am happy",
  "Sad": "I am sad",
  "Home": "I want to go home",
  "Stop": "Stop",
  "More": "I want more"
};

function speak(text) {
  return new Promise((resolve) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onend = resolve;
    // Small delay — fixes Chrome bug where speech sometimes doesn't fire
    setTimeout(() => window.speechSynthesis.speak(utterance), 100);
  });
}

// Wait for full page to load before attaching listeners
window.addEventListener("load", () => {
  // Attach click listeners to all action buttons
  document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const span = btn.querySelector("span");
      if (span) {
        const label = span.textContent.trim();
        const phrase = phrases[label];
        if (phrase) {
          await speak(phrase);
        }
      }
    });
  });

  // Also handle any regular buttons if needed
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", async () => {
      const label = btn.textContent.trim();
      const phrase = phrases[label];
      if (phrase) {
        await speak(phrase);
      }
    });
  });
});