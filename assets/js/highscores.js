function renderScores() {
    let scoreArray = JSON.parse(window.localStorage.getItem("scoreArray")) || []; // takes out array from localstorage or sets to empty array
    console.log('show array of objects');
    console.log(scoreArray);
    console.log('show first object in array');
    console.log(scoreArray[0]);

    scoreArray.sort((a, b) => { // sorts objects in array by score value in descending order
        return b.score - a.score;
    })

    for (let i = 0; i < scoreArray.length; i++) { 
        let scoreListElement = document.createElement('li'); // create a list element for every item in the array
        scoreListElement.textContent = scoreArray[i].name + ' ➡️ ' + scoreArray[i].score; // add text to list element

        let scoreList = document.querySelector("#score-list");
        scoreList.appendChild(scoreListElement); // append list elements to ordered list element
    }
}

function clearScores() {
    window.localStorage.removeItem("scoreArray");
    window.location.reload();
}

// import {winCount} from './battle'

function resetWinCount() {
    console.log("win count from last game:", winCount);
    winCount = 0;
    console.log("win count reset back to 0", winCount === 0);
}

document.querySelector("#clear-button").addEventListener("click", clearScores);
document.querySelector("#back-button").addEventListener("click", resetWinCount);

renderScores();