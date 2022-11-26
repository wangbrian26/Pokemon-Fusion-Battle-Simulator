// Nicole's Landing Page JS
let nameInput = document.getElementById("name-input").value.trim();
let nameBox = document.getElementById("name-box");
let choiceButton = document.querySelector(".card-section");
let saveButton = document.querySelector(".button");

let fakemon1 = [
  "./assets/images/fakemon/1.jpeg",
  "./assets/images/fakemon/2.jpeg",
  "./assets/images/fakemon/3.jpeg",
  "./assets/images/fakemon/4.jpeg",
  "./assets/images/fakemon/5.jpeg",
  "./assets/images/fakemon/6.jpeg",
  "./assets/images/fakemon/7.jpeg",
  "./assets/images/fakemon/8.jpeg",
];

let fakemon2 = [
  "./assets/images/fakemon/9.jpeg",
  "./assets/images/fakemon/10.jpeg",
  "./assets/images/fakemon/11.jpeg",
  "./assets/images/fakemon/12.jpeg",
  "./assets/images/fakemon/13.jpeg",
  "./assets/images/fakemon/14.png",
  "./assets/images/fakemon/15.png",
  "./assets/images/fakemon/16.jpeg",
]

let fakemon3 = [
  "./assets/images/fakemon/17.jpeg",
  "./assets/images/fakemon/18.jpeg",
  "./assets/images/fakemon/19.png",
  "./assets/images/fakemon/20.png",
  "./assets/images/fakemon/21.png",
  "./assets/images/fakemon/22.png",
  "./assets/images/fakemon/23.png",
  "./assets/images/fakemon/24.png",
]

document.getElementById("choice1").src = fakemon1[Math.floor(Math.random() * 8)];
document.getElementById("choice2").src = fakemon2[Math.floor(Math.random() * 8)];
document.getElementById("choice3").src = fakemon3[Math.floor(Math.random() * 8)];

document.getElementById("choice1").width = "300";
document.getElementById("choice1").height = "400";

document.getElementById("choice2").width = "300";
document.getElementById("choice2").height = "400";

document.getElementById("choice3").width = "300";
document.getElementById("choice3").height = "400";

choiceButton.addEventListener("click", function(event) {
    event.preventDefault();
    getChoice();
})

function getChoice() {
    console.log('running getChoice()');
    // change border color to indicate selected fakemon
    document.querySelector(".card").style.border = "1px solid #6DE072";
    document.querySelector(".card").style.boxShadow = "0 0 10px #6DE072";
    // unhide name box 
    nameBox.style.visibility = "visible";
}

saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveName();
})

function saveName() {
    console.log('running saveName()');
    if (nameInput === "") { // SOMETHING IS WRONG WITH THE CONDITION??
        console.log('display alert to type name');
        let alert = document.createElement("p");
        console.log(alert);
        alert.textContent = "Must type a name to continue.";
        alert.style.fontStyle = "italic";
        alert.style.color = "red";
        nameBox.appendChild(alert);

        setTimeout(function() {
            alert.style.visibility = "hidden";
        }, 5000);

        return null;
    
    } else {
        console.log('save name to localStorage');
        let nameArray = JSON.parse(window.localStorage.getItem('nameArray')) || [];
        let newName = nameInput;
        nameArray.push(newName);
        window.localStorage.setItem('nameArray', JSON.stringify(nameArray));
    }

}