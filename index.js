//=====================================================
// Register the service worker
if ("serviceWorker" in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener("load", async () => {
    // Try to register the service worker.
    try {
      // Capture the registration for later use, if needed
      let reg;

      // Use ES Module version of our Service Worker in development
      if (import.meta.env?.DEV) {
        reg = await navigator.serviceWorker.register("/sw.js", {
          type: "module",
        });
      } else {
        // In production, use the normal service worker registration
        reg = await navigator.serviceWorker.register("/sw.js");
      }

      console.log("Service worker registered! 😎", reg);
    } catch (err) {
      console.log("😥 Service worker registration failed: ", err);
    }
  });
}

//=====================================================

const diceOne = '<i class="fa-solid fa-dice-one"></i>';
const diceTwo = '<i class="fa-solid fa-dice-two"></i>';
const diceThree = '<i class="fa-solid fa-dice-three"></i>';
const diceFour = '<i class="fa-solid fa-dice-four"></i>';
const diceFive = '<i class="fa-solid fa-dice-five"></i>';
const diceSix = '<i class="fa-solid fa-dice-six"></i>';
const preRoll = '<i class="fa-solid fa-dice fa-shake"></i>';

var numberOfDice = 1;
var total = 0;

document.querySelector("#diceDisplay").innerHTML = preRoll;

function updateDice() {
  numberOfDice = parseInt(document.getElementById("numberOfDiceChoice").value);
  document.querySelector("#diceDisplay").innerHTML = preRoll;
  document.querySelector("#totalDisplay").innerHTML = "";
}

function roll() {
  var num = Math.floor(Math.random() * 6) + 1;
  return num;
}

function show() {
  var display = document.querySelector("#diceDisplay").innerHTML;
  if (display === preRoll) {
    document.querySelector("#diceDisplay").innerHTML = "";
    total = 0;
    for (let i = 0; i < numberOfDice; i++) {
      var diceRoll = roll();
      loadImage(diceRoll);
      total += diceRoll;
    }
    document.querySelector("#totalDisplay").innerHTML = total;
  } else {
    document.querySelector("#diceDisplay").innerHTML = preRoll;
    document.querySelector("#totalDisplay").innerHTML = "";
  }
}

function loadImage(number) {
  if (number === 1) {
    document.querySelector("#diceDisplay").innerHTML += diceOne;
  } else if (number === 2) {
    document.querySelector("#diceDisplay").innerHTML += diceTwo;
  } else if (number === 3) {
    document.querySelector("#diceDisplay").innerHTML += diceThree;
  } else if (number === 4) {
    document.querySelector("#diceDisplay").innerHTML += diceFour;
  } else if (number === 5) {
    document.querySelector("#diceDisplay").innerHTML += diceFive;
  } else if (number === 6) {
    document.querySelector("#diceDisplay").innerHTML += diceSix;
  } else {
    console.log("error");
  }
}

//// SECTION ON INSTALL /////

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
