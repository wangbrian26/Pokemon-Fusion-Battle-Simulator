// Nicole's Landing Page JS
let nameBox = document.getElementById("name-box");
let choiceButton1 = document.getElementById("button1");
let choiceButton2 = document.getElementById("button2");
let choiceButton3 = document.getElementById("button3");
let saveButton = document.querySelector(".button");
let charInfo = {};

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
];

let fakemon3 = [
  "./assets/images/fakemon/17.jpeg",
  "./assets/images/fakemon/18.jpeg",
  "./assets/images/fakemon/19.png",
  "./assets/images/fakemon/20.png",
  "./assets/images/fakemon/21.png",
  "./assets/images/fakemon/22.png",
  "./assets/images/fakemon/23.png",
  "./assets/images/fakemon/24.png",
];

document.getElementById("choice1").src =
  fakemon1[Math.floor(Math.random() * 8)];
document.getElementById("choice2").src =
  fakemon2[Math.floor(Math.random() * 8)];
document.getElementById("choice3").src =
  fakemon3[Math.floor(Math.random() * 8)];

document.getElementById("choice1").width = "300";
document.getElementById("choice1").height = "400";

document.getElementById("choice2").width = "300";
document.getElementById("choice2").height = "400";

document.getElementById("choice3").width = "300";
document.getElementById("choice3").height = "400";

choiceButton1.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.detail === 1) {
    // change border color to indicate selected fakemon
    choiceButton1.style.border = "5px solid #6DE072";
    // choiceButton1.style.borderRadius = "8px";
    choiceButton1.style.boxShadow = "0 0 20px #6DE072";
    // unhide name box
    nameBox.style.visibility = "visible";
    charInfo.image = event.target.src;
    // save charInfo to localStorage
    window.localStorage.setItem("image", JSON.stringify(charInfo.image));
    // disable other choice buttons
    choiceButton2.classList.add("unclickable");
    choiceButton3.classList.add("unclickable");
    choiceButton2.ariaDisabled = true; // NOT WORKING!! STILL CLICKABLE AND SAVE NEW IMAGE TO LOCAL STORAGE :((
    choiceButton3.ariaDisabled = true;
        
  } else if (event.detail === 2) {
      choiceButton1.style.border = "1px solid black";
      choiceButton1.style.boxShadow = "0 0 0px";
      nameBox.style.visibility = "hidden";
      choiceButton2.ariaDisabled = false;
      choiceButton3.ariaDisabled = false;
      choiceButton2.classList.remove("unclickable");
      choiceButton3.classList.remove("unclickable");
      choiceButton2.classList.add("card");
      choiceButton3.classList.add("card");
  }
});

choiceButton2.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.detail === 1) {
    // change border color to indicate selected fakemon
    choiceButton2.style.border = "5px solid #6DE072";
    // choiceButton1.style.borderRadius = "8px";
    choiceButton2.style.boxShadow = "0 0 20px #6DE072";
    // unhide name box
    nameBox.style.visibility = "visible";
    charInfo.image = event.target.src;
    // save charInfo to localStorage
    window.localStorage.setItem("image", JSON.stringify(charInfo.image));
    // disable other choice buttons
    choiceButton1.classList.add("unclickable");
    choiceButton3.classList.add("unclickable");
    choiceButton1.ariaDisabled = true; // NOT WORKING!! STILL CLICKABLE AND SAVE NEW IMAGE TO LOCAL STORAGE :((
    choiceButton3.ariaDisabled = true;
      
    } else if (event.detail === 2) {
      choiceButton2.style.border = "1px solid black";
      choiceButton2.style.boxShadow = "0 0 0px";
      nameBox.style.visibility = "hidden";
      choiceButton1.ariaDisabled = false;
      choiceButton3.ariaDisabled = false;
      choiceButton1.classList.remove("unclickable");
      choiceButton3.classList.remove("unclickable");
      choiceButton1.classList.add("card");
      choiceButton3.classList.add("card");
    }
});

choiceButton3.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.detail === 1) {
    // change border color to indicate selected fakemon
    choiceButton3.style.border = "5px solid #6DE072";
    // choiceButton1.style.borderRadius = "8px";
    choiceButton3.style.boxShadow = "0 0 20px #6DE072";
    // unhide name box
    nameBox.style.visibility = "visible";
    charInfo.image = event.target.src;
    // save charInfo to localStorage
    window.localStorage.setItem("image", JSON.stringify(charInfo.image));
    // disable other choice buttons
    choiceButton1.classList.add("unclickable");
    choiceButton2.classList.add("unclickable");
    choiceButton1.ariaDisabled = true; // NOT WORKING!! STILL CLICKABLE AND SAVE NEW IMAGE TO LOCAL STORAGE :((
    choiceButton2.ariaDisabled = true;
      
    } else if (event.detail === 2) {
      choiceButton3.style.border = "1px solid black";
      choiceButton3.style.boxShadow = "0 0 0px";
      nameBox.style.visibility = "hidden";
      choiceButton2.ariaDisabled = false;
      choiceButton1.ariaDisabled = false;
      choiceButton2.classList.remove("unclickable");
      choiceButton1.classList.remove("unclickable");
      choiceButton2.classList.add("card");
      choiceButton1.classList.add("card");
    }
});

saveButton.addEventListener("click", function (event) {
  event.preventDefault();
  saveName();
});

function saveName() {
  console.log("running saveName()");
  let nameInput = document.getElementById("name-input").value.trim();
  if (nameInput === "") {
    console.log("display alert to type name");
    let alert = document.createElement("p");
    console.log(alert);
    alert.textContent = "Must type a name to continue.";
    alert.style.fontStyle = "italic";
    alert.style.color = "red";
    nameBox.appendChild(alert);

    setTimeout(function () {
      alert.style.visibility = "hidden";
    }, 5000);

    return null;
  } else {
    console.log("save name to localStorage");
    window.localStorage.setItem("name", JSON.stringify(nameInput));
    window.location.href = 'battle.html';
  }
}
