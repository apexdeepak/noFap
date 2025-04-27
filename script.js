document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app-container");
  const mainText = document.getElementById("main-text");
  const quoteText = document.getElementById("quote-text");
  const actionButton = document.getElementById("action-button");
  // Optional: Get timer display element
  // const timerDisplay = document.getElementById('timer-display');

  const LOCAL_STORAGE_KEY = "lastFapTimestamp";
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // Milliseconds in one week

  // --- Add your motivational quotes here ---
  const motivationalQuotes = [
    "Discipline is choosing between what you want now and what you want most.",
    "Don't trade your potential for temporary pleasure.",
    "Regret is painful. Discipline is temporary. Choose your pain.",
    "Master your urges, master your life.",
    "The energy you conserve can build empires within you.",
    "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.",
    "Your habits determine your future. Choose them wisely.",
    "Strength does not come from winning. Your struggles develop your strengths.",
    "Focus on progress, not perfection.",
    "You are stronger than your urges.",
  ];
  // --- End of quotes ---

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return `"${motivationalQuotes[randomIndex]}"`;
  }

  function displayInitialState() {
    appContainer.classList.remove("state-final");
    appContainer.classList.add("state-initial");
    mainText.classList.remove("hidden");
    actionButton.classList.remove("hidden");
    quoteText.classList.add("hidden");
    // Optional: Hide timer
    // timerDisplay.classList.add('hidden');
  }

  function displayFinalState(quote) {
    appContainer.classList.remove("state-initial");
    appContainer.classList.add("state-final");
    mainText.classList.add("hidden");
    actionButton.classList.add("hidden");
    quoteText.textContent = quote;
    quoteText.classList.remove("hidden");
    // Optional: Show and update timer
    // updateTimerDisplay(); // You'd need to implement this function
    // timerDisplay.classList.remove('hidden');
  }

  function checkStateOnLoad() {
    const storedTimestampStr = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedTimestampStr) {
      const storedTimestamp = parseInt(storedTimestampStr, 10);
      const currentTime = Date.now();
      const timeElapsed = currentTime - storedTimestamp;

      if (timeElapsed < ONE_WEEK_MS) {
        // Still within the week, show the final state
        displayFinalState(getRandomQuote()); // Show a random quote on reload too
        console.log("State: Final (within 1 week)");
        // Optional: Calculate and display remaining time here if needed
      } else {
        // Week has passed, reset to initial state
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Clean up storage
        displayInitialState();
        console.log("State: Initial (1 week passed)");
      }
    } else {
      // No timestamp stored, show initial state
      displayInitialState();
      console.log("State: Initial (no timestamp)");
    }
  }

  actionButton.addEventListener("click", () => {
    const currentTime = Date.now();
    // Store the timestamp as a string in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, currentTime.toString());

    // Display the final state with a new random quote
    displayFinalState(getRandomQuote());
    console.log("Button clicked, state set to Final.");
  });

  // Check the state when the page loads
  checkStateOnLoad();
});
