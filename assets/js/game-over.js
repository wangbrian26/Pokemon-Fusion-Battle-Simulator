let winNumber = JSON.parse(window.localStorage.getItem("win-count"));
let submitButton = document.querySelector("#submit-button");

document.querySelector(
  "#win-number"
).textContent = `Number of Fusion Pokemon Beaten: ${winNumber}`;

// store scores in local object and link to score-record.html
function saveScores() {
  let nickname = document.querySelector("#nickname-input").value.trim();

  if (nickname !== "") {
    let scoreArray =
      JSON.parse(window.localStorage.getItem("scoreArray")) || []; // take out scoreArray from local storage if previous scores are there or set to empty array
    let newScore = {
      name: nickname,
      score: winNumber,
    };

    scoreArray.push(newScore); // add newScore to scoreArray every time submit button is clicked
    console.log(scoreArray);

    window.localStorage.setItem("scoreArray", JSON.stringify(scoreArray));

    window.location.href = "highscores.html";
  }
}

submitButton.addEventListener("click", saveScores); // runs saveScores() every time users click submit

var sfxDeath = new Audio("assets/sfx/death-sfx.mp3");
sfxDeath.volume = 0.2;

setTimeout(() => {
  sfxDeath.play();
}, "1000");
