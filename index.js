let numberOfDice = 1;
let total = 0;
const diceDisplay = document.querySelector("#diceDisplay");
let rolling = true;

// function to reset dice images
const resetRoll = () => {
  const preRoll = document.createElement("img");
  preRoll.setAttribute("src", "./dices.png");
  preRoll.setAttribute("alt", ".dice-images");
  preRoll.classList.add("preRoll", "dice-shake");
  return preRoll;
};

// function to create dice images
const setDice = (num) => {
  // create img element
  const newDice = document.createElement("img");
  // set attributes and class
  newDice.setAttribute("src", `./dice${num}.png`);
  newDice.setAttribute("alt", `dice-image-${num}`);
  newDice.classList.add("dice");
  // return element
  return newDice;
};

// set initial display to roll
diceDisplay.appendChild(resetRoll());

// update the display when the user toggles the number of dice to roll
function updateDice() {
  //get the number of dice
  numberOfDice = parseInt(document.getElementById("numberOfDiceChoice").value);
  // clear display
  diceDisplay.innerHTML = "";
  // set display to preRoll image
  diceDisplay.appendChild(resetRoll());
  // clear the displayed total number
  document.querySelector("#totalDisplay").innerHTML = "";
}

// gets a random number between 1 and 6
function roll() {
  var num = Math.floor(Math.random() * 6) + 1;
  return num;
}

// shows the output of the roll(s)
function show() {
  if (rolling) {
    // clear display and set total to 0
    diceDisplay.innerHTML = "";
    total = 0;
    // loop through number of dice to get each
    for (let i = 0; i < numberOfDice; i++) {
      var diceRoll = roll();
      // for each roll, create and display dice image
      diceDisplay.appendChild(setDice(diceRoll));
      // add each roll to the total
      total += diceRoll;
    }
    // display total of rolls
    document.querySelector("#totalDisplay").innerHTML = total;
    // set rolling back to false
    rolling = false;
  } else if (!rolling) {
    // if not rolling, clear display dice
    diceDisplay.innerHTML = "";
    // reset to preRoll image
    diceDisplay.appendChild(resetRoll());
    // clear out displayed total number
    document.querySelector("#totalDisplay").innerHTML = "";
    // set rolling back to true
    rolling = true;
  }
}

// =============================================================================
// Cache and service worker
// =============================================================================

// Register service worker to control making site work offline
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/dice-app-pwa/sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}

// Code to handle install prompt on desktop
let deferredPrompt;
const addBtn = document.getElementById("install-button");
addBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block";

  addBtn.addEventListener("click", () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
