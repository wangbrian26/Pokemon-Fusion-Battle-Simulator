// Nicole's Landing Page JS
let nameBox = document.getElementById("name-box");
let choiceButton1 = document.getElementById("button1");
let choiceButton2 = document.getElementById("button2");
let choiceButton3 = document.getElementById("button3");
let fakemon1 = document.getElementById("choice1");
let fakemon2 = document.getElementById("choice2");
let fakemon3 = document.getElementById("choice3");
let saveButton = document.querySelector(".button");
let charInfo = {};
let choice = 0;

let fakemonSet1 = [
  "./assets/images/fakemon/1.jpeg",
  "./assets/images/fakemon/2.jpeg",
  "./assets/images/fakemon/3.jpeg",
  "./assets/images/fakemon/4.jpeg",
  "./assets/images/fakemon/5.jpeg",
  "./assets/images/fakemon/6.jpeg",
  "./assets/images/fakemon/7.jpeg",
  "./assets/images/fakemon/8.jpeg",
];

let fakemonSet2 = [
  "./assets/images/fakemon/9.jpeg",
  "./assets/images/fakemon/10.jpeg",
  "./assets/images/fakemon/11.jpeg",
  "./assets/images/fakemon/12.jpeg",
  "./assets/images/fakemon/13.jpeg",
  "./assets/images/fakemon/14.png",
  "./assets/images/fakemon/15.png",
  "./assets/images/fakemon/16.jpeg",
];

let fakemonSet3 = [
  "./assets/images/fakemon/17.jpeg",
  "./assets/images/fakemon/18.jpeg",
  "./assets/images/fakemon/19.png",
  "./assets/images/fakemon/20.png",
  "./assets/images/fakemon/21.png",
  "./assets/images/fakemon/22.png",
  "./assets/images/fakemon/23.png",
  "./assets/images/fakemon/24.png",
];

fakemon1.src = fakemonSet1[Math.floor(Math.random() * 8)];
fakemon2.src = fakemonSet2[Math.floor(Math.random() * 8)];
fakemon3.src = fakemonSet3[Math.floor(Math.random() * 8)];

function changeButtonBorder() {
    choiceButton1.classList.remove("clicked");
    choiceButton2.classList.remove("clicked");
    choiceButton3.classList.remove("clicked");

    if (choice === 1) {
        choiceButton1.classList.add("clicked");

    } else if (choice === 2) {
        choiceButton2.classList.add("clicked");
    
    } else if (choice === 3) {
        choiceButton3.classList.add("clicked");    
    }
}

function displayNameBox() {
    if (choice !== 0) {
        // unhide name box
        nameBox.style.visibility = "visible";
    } else {
        nameBox.style.visibility = "hidden";
    }
}

function selectChoice(buttonId, fakemon) {
    if (choice !== buttonId) {
        choice = buttonId;
    } else if (choice === buttonId) {
        choice = 0;
    }
    changeButtonBorder();
    displayNameBox();
    charInfo.image = fakemon.src;
    // save charInfo to localStorage
    window.localStorage.setItem("image", JSON.stringify(charInfo.image));
}

choiceButton1.addEventListener("click", function(event) {
    event.preventDefault();
    selectChoice(1, fakemon1);
});

choiceButton2.addEventListener("click", function (event) {
    event.preventDefault();
    selectChoice(2, fakemon2);
})

choiceButton3.addEventListener("click", function (event) {
    event.preventDefault();
    selectChoice(3, fakemon3);
})

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
