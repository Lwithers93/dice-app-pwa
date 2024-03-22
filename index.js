const diceOne = document.createElement("img");
diceOne.setAttribute("src", "./dice1.png");
diceOne.setAttribute("alt", ".dice-images");
diceOne.classList.add("dice");

const diceTwo = document.createElement("img");
diceTwo.setAttribute("src", "./dice2.png");
diceTwo.setAttribute("alt", ".dice-images");
diceTwo.classList.add("dice");

const diceThree = document.createElement("img");
diceThree.setAttribute("src", "./dice3.png");
diceThree.setAttribute("alt", ".dice-images");
diceThree.classList.add("dice");

const diceFour = document.createElement("img");
diceFour.setAttribute("src", "./dice4.png");
diceFour.setAttribute("alt", ".dice-images");
diceFour.classList.add("dice");

const diceFive = document.createElement("img");
diceFive.setAttribute("src", "./dice5.png");
diceFive.setAttribute("alt", ".dice-images");
diceFive.classList.add("dice");

const diceSix = document.createElement("img");
diceSix.setAttribute("src", "./dice6.png");
diceSix.setAttribute("alt", ".dice-images");
diceSix.classList.add("dice");

let numberOfDice = 1;
let total = 0;
const diceDisplay = document.querySelector("#diceDisplay");
let rolling = true;

const resetRoll = () => {
  const preRoll = document.createElement("img");
  preRoll.setAttribute("src", "./dices.png");
  preRoll.setAttribute("alt", ".dice-images");
  preRoll.classList.add("preRoll", "dice-shake");
  return preRoll;
};

diceDisplay.appendChild(resetRoll());

function updateDice() {
  numberOfDice = parseInt(document.getElementById("numberOfDiceChoice").value);
  diceDisplayappendChild(preRoll);
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
    diceDisplay.innerHTML = "";
    total = 0;
    console.log("running");
    for (let i = 0; i < numberOfDice; i++) {
      var diceRoll = roll();
      loadImage(diceRoll);
      console.log("roll is " + diceRoll);
      total += diceRoll;
    }
    document.querySelector("#totalDisplay").innerHTML = total;
    rolling = false;
    console.log(rolling);
  } else if (!rolling) {
    diceDisplay.innerHTML = "";
    diceDisplay.appendChild(resetRoll());
    document.querySelector("#totalDisplay").innerHTML = "";
    rolling = true;
  }
}

function loadImage(number) {
  if (number === 1) {
    diceDisplay.appendChild(diceOne);
  } else if (number === 2) {
    diceDisplay.appendChild(diceTwo);
  } else if (number === 3) {
    diceDisplay.appendChild(diceThree);
  } else if (number === 4) {
    diceDisplay.appendChild(diceFour);
  } else if (number === 5) {
    diceDisplay.appendChild(diceFive);
  } else if (number === 6) {
    diceDisplay.appendChild(diceSix);
  } else {
    console.log("error");
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
