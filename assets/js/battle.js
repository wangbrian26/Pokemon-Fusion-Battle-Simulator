// Stat allocator for user character
var healthBase = 200;
var defenseBase = 30;
var speedBase = 50;
var attackBase = 30;

// Stat change buttons
var healthUp = document.querySelector(".health-up");
var attackUp = document.querySelector(".attack-up");
var speedUp = document.querySelector(".speed-up");
var defenseUp = document.querySelector(".defense-up");
var healthDown = document.querySelector(".health-down");
var attackDown = document.querySelector(".attack-down");
var speedDown = document.querySelector(".speed-down");
var defenseDown = document.querySelector(".defense-down");
var battleButton = document.querySelector("#battle");
var battleAgainButton = document.querySelector("#battleAgain");

// User stats
var healthEl = document.querySelector("#health-points");
var attack = document.querySelector("#attack-points");
var speed = document.querySelector("#speed-points");
var defense = document.querySelector("#defense-points");
var stats = document.querySelector(".stats");
var statPoints = 50;

// Action buttons during battle
var evadeButton = document.querySelector("#evade-button");
var defendButton = document.querySelector("#defendButton");
var strongButton = document.querySelector("#strong-button");
var attackButton = document.querySelector("#attack-button");
var dialogueBox = document.querySelector("#dialogue");

var winCount = 0;
var opponentStrongAttackHit = false;
let opponentStrongAttackChance;
var evadeSuccess = false;
var evadeTimes = 0;

stats.textContent = statPoints;
healthEl.textContent = healthBase;
attack.textContent = attackBase;
speed.textContent = speedBase;
defense.textContent = defenseBase;

var charStats = {
  health: healthBase,

  attack: attackBase,

  speed: speedBase,

  defense: defenseBase,
};

var opponentStats = {};
var currentStats = {};

// Stat change functions

healthUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints -= 5;
    healthBase += 5;
    healthEl.textContent = healthBase;
    stats.textContent = statPoints;
    charStats.health = healthBase;
    document.querySelector("#errors").textContent = "";
  } else {
    document.querySelector("#errors").textContent = "Out of stat points";
  }
});

healthDown.addEventListener("click", function () {
  if (healthBase > 200) {
    statPoints += 5;
    healthBase -= 5;
    healthEl.textContent = healthBase;
    stats.textContent = statPoints;
    charStats.health = healthBase;
    document.querySelector("#errors").textContent = "";
  } else {
    document.querySelector("#errors").textContent =
      "Cannot go below 200 health stat";
  }
});

attackUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints -= 5;
    attackBase += 5;
    attack.textContent = attackBase;
    stats.textContent = statPoints;
    charStats.attack = attackBase;
    document.querySelector("#errors").textContent = "";
  } else {
    document.querySelector("#errors").textContent = "Out of stat points";
  }
});

attackDown.addEventListener("click", function () {
  if (attackBase > 30) {
    statPoints += 5;
    attackBase -= 5;
    attack.textContent = attackBase;
    stats.textContent = statPoints;
    charStats.attack = attackBase;
    document.querySelector("#errors").textContent = "";
  } else {
    document.querySelector("#errors").textContent =
      "Cannot go below 30 attack stat";
  }
});

speedUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints -= 5;
    speedBase += 5;
    speed.textContent = speedBase;
    stats.textContent = statPoints;
    charStats.speed = speedBase;
    document.querySelector("#errors").textContent = "";
  } else {
    document.querySelector("#errors").textContent = "Out of stat points";
  }
});

speedDown.addEventListener("click", function () {
  if (speedBase > 50) {
    statPoints += 5;
    speedBase -= 5;
    speed.textContent = speedBase;
    stats.textContent = statPoints;
    charStats.speed = speedBase;
    document.querySelector("#errors").textContent = "";
  } else {
    document.querySelector("#errors").textContent =
      "Cannot go below 50 speed stat";
  }
});

defenseUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints -= 5;
    defenseBase += 5;
    defense.textContent = defenseBase;
    stats.textContent = statPoints;
    charStats.defense = defenseBase;
    document.querySelector("#errors").textContent = "";
  } else {
    document.querySelector("#errors").textContent = "Out of stat points";
  }
});

defenseDown.addEventListener("click", function () {
  if (defenseBase > 30) {
    statPoints += 5;
    defenseBase -= 5;
    defense.textContent = defenseBase;
    stats.textContent = statPoints;
    charStats.defense = defenseBase;
    document.querySelector("#errors").textContent = "";
  } else {
    document.querySelector("#errors").textContent =
      "Cannot go below 30 defense stat";
  }
});

// Fetch request for fusion pokemon and its stats

function fusionPokemon() {
  fetch("https://keith.api.stdlib.com/pokefusion@0.2.0/")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var poke1 = data.fused.body.toLowerCase();
      var poke2 = data.fused.head.toLowerCase();
      var fusionPokemonImg = data.image_url;
      var fusionPokemonName = data.name;
      document.querySelector("#fusionPokemonImg").src = fusionPokemonImg;
      document.querySelector("#fusionPokemonName").textContent =
        fusionPokemonName;
      fetch("https://pokeapi.co/api/v2/pokemon/" + poke1)
        .then(function (response) {
          console.log(response.status);
          if (response.status !== 200) {
            console.log("fusion failed trying again");
            fusionPokemon();
          }
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var poke1Hp = data.stats[0].base_stat;
          var poke1Attack = data.stats[1].base_stat;
          var poke1Defense = data.stats[2].base_stat;
          var poke1Speed = data.stats[5].base_stat;
          poke1Attack = poke1Attack / 2;
          poke1Hp = poke1Hp + poke1Defense / 2;
          fetch("https://pokeapi.co/api/v2/pokemon/" + poke2)
            .then(function (response) {
              console.log(response.status);
              if (response.status !== 200) {
                console.log("fusion failed trying again");
                fusionPokemon();
              }
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              var poke2Hp = data.stats[0].base_stat;
              var poke2Attack = data.stats[1].base_stat;
              var poke2Defense = data.stats[2].base_stat;
              var poke2Speed = data.stats[5].base_stat;
              poke2Attack = poke2Attack / 2;
              poke2Hp = poke2Hp + poke2Defense / 2;
              var fusionPokemonAttack = (poke1Attack + poke2Attack) / 2;
              var fusionPokemonHp = (poke1Hp + poke2Hp) / 2;
              var fusionPokemonSpeed = (poke1Speed + poke2Speed) / 2;
              var fusionPokemonDefense = (poke1Defense + poke2Defense) / 2;

              if (
                (fusionPokemonAttack ||
                  fusionPokemonHp ||
                  fusionPokemonSpeed ||
                  fusionPokemonDefense) == "NaN"
              ) {
                fusionPokemon();
              }
              opponentStats.health = fusionPokemonHp;
              opponentStats.attack = fusionPokemonAttack;
              opponentStats.speed = fusionPokemonSpeed;
              opponentStats.defense = fusionPokemonDefense;
              document.querySelector(
                "#oppHealth"
              ).textContent = `${fusionPokemonHp}`;
              document.querySelector(
                "#oppAttack"
              ).textContent = `${fusionPokemonAttack}`;
              document.querySelector(
                "#oppSpeed"
              ).textContent = `${fusionPokemonSpeed}`;
              document.querySelector(
                "#oppDefense"
              ).textContent = `${fusionPokemonAttack}`;
            });
        });
    });
}

// Get user Pokemon name and image from previous screen

document.querySelector("#userPokemonName").textContent = JSON.parse(
  localStorage.getItem("name")
);
var userPokeImgSRC = JSON.parse(localStorage.getItem("image"));
userPokeImgSRC = userPokeImgSRC.split("assets");
document.querySelector("#userPokemonImg").src = "./assets" + userPokeImgSRC[1];

// Changing from stat screen to battle screen
function battle() {
  currentStats = JSON.parse(JSON.stringify(charStats));
  window.localStorage.setItem("win-count", JSON.stringify(winCount));
  document.querySelector("#oppPokemon").classList.remove("hide");
  document.querySelector("#oppPokemon").classList.add("large-3");
  document.querySelector("#buttonBlock").style.marginTop = "25vh";
  document.querySelectorAll(".pageButtons").forEach(function (button) {
    button.classList.add("hide");
  });
  document
    .querySelector("#buttonBlock")
    .classList.remove("medium-2", "large-1");
  document.querySelector("#score-box").classList.remove("hide");
  document
    .querySelector("#attackButtons")
    .querySelectorAll(".fight")
    .forEach(function (button) {
      button.classList.remove("hide");
    });
  document.querySelector("#battleInfo").classList.add("hide");
  document.querySelector("#userBattleScene").classList.remove("medium-6");
  document.querySelector("#userBattleScene").classList.add("large-3");
  document
    .querySelector("#userStats")
    .classList.remove("statBorder", "medium-12", "large-5");
  document
    .querySelector("#userStats")
    .classList.add("pokemonStats", "medium-6", "large-3");
  document.querySelector("#userPokemon").classList.remove("setStats");
  document.querySelector("body").classList.add("forest");
  document
    .querySelector("#attackButtons")
    .classList.remove("medium-6", "large-3");
  document
    .querySelector("#attackButtons")
    .classList.add("medium-12", "large-6");

  dialogueBox.textContent = "A wild fusion Pokemon has appeared!";
  fusionPokemon();
}

// separate battle function to use current user health instead of parsing original stats
function battleAgain() {
  enableBattleButtons();
  window.localStorage.setItem("win-count", JSON.stringify(winCount));
  document.querySelector("#battleAgain").classList.add("hide");
  document.querySelector("#dialogue").textContent =
    "A wild fusion Pokemon has appeared!";
  fusionPokemon();
  if (currentStats.health <= charStats.health / 2) {
    currentStats.health = charStats.health / 2;
  }
}

// function after each attack to check if user or opponent hp is 0, then ends battle; plays sound on loss and redirects to game over screen after 5 seconds
function winLossCheck() {
  if (opponentStats.health <= 0) {
    winCount++;
    console.log("win count:", winCount);
    document.querySelector("#win-display").textContent = winCount;

    opponentStats.attack = 0;
    opponentStats.health = 0;
    document.querySelector("#health-points").textContent = currentStats.health;
    document.querySelector("#oppHealth").textContent = opponentStats.health;
    dialogueBox.textContent =
      "You win! Your HP is restored to 50% if you fell under 50%.";
    document.querySelector("#battleAgain").classList.remove("hide");
    console.log("you win! here are your stats:");
    console.log(charStats.health);
    console.log(charStats.health / 2);
    console.log(currentStats.health);
    sfxWin.play();
    disableBattleButtons();
    if (currentStats.health <= charStats.health / 2) {
      console.log("Your health is:");
      currentStats.health = charStats.health / 2; // what is this for?
      console.log(currentStats.health);
    }
  } else if (currentStats.health <= 0) {
    currentStats.attack = 0;
    currentStats.health = 0;
    dialogueBox.textContent = "Your HP is at 0. You died...";
    sfxDeath.play();
    document.querySelector("#health-points").textContent = currentStats.health;
    document.querySelector("#oppHealth").textContent = opponentStats.health;
    console.log("game over");
    disableBattleButtons();
    setTimeout(() => {
      window.location.href = "game-over.html";
    }, "5000");
    console.log("win count:", winCount);
  } else if (currentStats.health == "NaN") {
    battleAgain();
    currentStats = JSON.parse(JSON.stringify(charStats));
  }
}

function hpUpdate() {
  document.querySelector("#health-points").textContent = currentStats.health;
  document.querySelector("#oppHealth").textContent = opponentStats.health;
}

// Functions for actions during battle phase

// normal attack function to deal 75% attack damage
function normalAttack() {
  sfxAttack.play();
  if (currentStats.speed >= opponentStats.speed) {
    dialogueBox.textContent =
      "Your Pokemon attacked first due to its higher speed!";
    opponentStats.health = opponentStats.health - currentStats.attack * 0.75;
    currentStats.health -= opponentStats.attack;
  } else {
    dialogueBox.textContent =
      "The fusion Pokemon attacked first due to its higher speed!";
    currentStats.health -= opponentStats.attack;
    opponentStats.health = opponentStats.health - currentStats.attack * 0.75;
  }

  winLossCheck();
  hpUpdate();
  opponentStrongAttackAfter();
  opponentStrongAttack();
}

// strong attack function for dealing 100% of user attack damage with a 30% chance to miss
function strongAttack() {
  var percentage = 100;
  var hitChance = Math.floor(Math.random() * percentage);
  if (hitChance > 70) {
    sfxDamage.play();
    dialogueBox.textContent = "Your strong attack missed.";
    currentStats.health -= opponentStats.attack;
  } else {
    if (currentStats.speed >= opponentStats.speed) {
      sfxStrongAttack.play();
      dialogueBox.textContent =
        "Your strong attack was successful! Your Pokemon attacked first due to its higher speed!";
      opponentStats.health -= currentStats.attack;
      currentStats.health -= opponentStats.attack;
    } else {
      sfxStrongAttack.play();
      dialogueBox.textContent =
        "Your strong attack was successful! The fusion Pokemon attacked first due to its higher speed!";
      currentStats.health -= opponentStats.attack;
      opponentStats.health -= currentStats.attack;
    }
  }

  winLossCheck();
  hpUpdate();
  opponentStrongAttackAfter();
  opponentStrongAttack();
}

// function for defend action, creating a random number based on currentStats.defense and comparing against opponentStats.attack
function defend() {
  var randomDefense = Math.floor(Math.random() * currentStats.defense);
  if (opponentStats.attack - randomDefense <= 5) {
    currentStats.health = currentStats.health - 5;
    dialogueBox.textContent =
      "You have successfully defended! You only take 5 damage and reflected back the rest of the damage.";
    sfxSuccess.play();
    opponentStats.health -= opponentStats.attack - 5;
  } else if (randomDefense <= 5) {
    randomDefense = 5;
    currentStats.health =
      currentStats.health - (opponentStats.attack - randomDefense);
    dialogueBox.textContent =
      "You have unsuccessfully defended! You only mitigated and reflected 5 damage.";
    sfxDamage.play();
    opponentStats.health -= 5;
  } else {
    currentStats.health =
      currentStats.health - (opponentStats.attack - randomDefense);
    dialogueBox.textContent = `You have defended some of the damage. You took ${
      opponentStats.attack - randomDefense
    } damage, and reflected back ${randomDefense} damage.`;
    sfxPartialDefense.play();
    opponentStats.health -= randomDefense;
  }
  winLossCheck();
  hpUpdate();
  opponentStrongAttackAfter();
  opponentStrongAttack();
}

// function to evade based on speedstat/150, min 33%, max 66%
function evade() {
  if (evadeSuccess === false) {
    let evadeChance = Math.floor((speedBase / 150) * 100);
    let randomChance = Math.floor(Math.random() * 100);
    if (randomChance <= evadeChance) {
      currentStats.health += currentStats.speed;
      evadeSuccess = true;
      evadeTimes++;
      if (currentStats.health <= 250) {
        dialogueBox.textContent =
          "You have successfully evaded the enemy attack. You took 0 damage and boosted your HP based on your speed. Your chance to evade will be lowered if you try to evade again.";
        sfxEvade.play();
      } else {
        currentStats.health = 250;
        dialogueBox.textContent =
          "You have successfully evaded the enemy attack. You took 0 damage, but you cannot heal to more than 250 health. Your chance to evade will be lowered if you try to evade again.";
        sfxEvade.play();
      }
    } else {
      evadeSuccess = false;
      evadeTimes = 0;
      currentStats.health -= opponentStats.attack;
      dialogueBox.textContent =
        "You have failed to evade the enemy attack. You took 100% damage.";
      sfxDamage.play();
    }
  } else {
    let evadeChance = Math.floor((speedBase / 150) * 100);
    let randomChance = Math.floor(Math.random() * (100 + 25 * evadeTimes));
    if (randomChance <= evadeChance) {
      currentStats.health += currentStats.speed;
      evadeSuccess = true;
      evadeTimes++;
      if (currentStats.health <= 250) {
        dialogueBox.textContent =
          "You have successfully evaded the enemy attack. You took 0 damage and boosted your HP based on your speed. Your chance to evade will be lowered if you try to evade again.";
        sfxEvade.play();
      } else {
        currentStats.health = 250;
        dialogueBox.textContent =
          "You have successfully evaded the enemy attack. You took 0 damage, but you cannot heal to more than 250 health. Your chance to evade will be lowered if you try to evade again.";
        sfxEvade.play();
      }
    } else {
      evadeSuccess = false;
      evadeTimes = 0;
      currentStats.health -= opponentStats.attack;
      dialogueBox.textContent =
        "You have failed to evade the enemy attack. You took 100% damage.";
      sfxDamage.play();
    }
  }
  winLossCheck();
  hpUpdate();
  opponentStrongAttackAfter();
  opponentStrongAttack();
}

// updates text content of user hp and opponent hp after changes
function hpUpdate() {
  document.querySelector("#health-points").textContent = currentStats.health;
  document.querySelector("#oppHealth").textContent = opponentStats.health;
}

// event listeners on page load
battleButton.addEventListener("click", battle);
battleAgainButton.addEventListener("click", battleAgain);
strongButton.addEventListener("click", strongAttack);
evadeButton.addEventListener("click", evade);
attackButton.addEventListener("click", normalAttack);
defendButton.addEventListener("click", defend);

// function for opponent to prepare a strong attack dealing 2x damage
function opponentStrongAttack() {
  opponentStrongAttackChance = Math.floor(Math.random() * 100);
  if (
    opponentStrongAttackChance >= 70 &&
    opponentStats.health > 0 &&
    currentStats.health > 0
  ) {
    opponentStrongAttackHit = true;
    dialogueBox.textContent +=
      " Be careful! The enemy is preparing a strong attack.";

    opponentStats.attack = opponentStats.attack * 2;
  } else {
    opponentStrongAttackHit = false;
  }

  return;
}

// function to return the opponent attack to normal after a strong attack
function opponentStrongAttackAfter() {
  if (opponentStrongAttackHit === true && opponentStats.health > 0) {
    opponentStats.attack = opponentStats.attack / 2;
    opponentStrongAttackHit = false;
  } else {
    return;
  }
}

// sound effects upon winning and losing and using different battle actions
var sfxWin = new Audio("assets/sfx/soft-win-sfx.wav");
var sfxDeath = new Audio("assets/sfx/soft-death-sfx.mp3");
var sfxAttack = new Audio("assets/sfx/attack-sfx.mp3");
var sfxStrongAttack = new Audio("assets/sfx/strong-attack-sfx.mp3");
var sfxEvade = new Audio("assets/sfx/evade-sfx.mp3");
var sfxDamage = new Audio("assets/sfx/damage-sfx.mp3");
var sfxSuccess = new Audio("assets/sfx/success-sfx.mp3");
var sfxPartialDefense = new Audio("assets/sfx/partial-defense-sfx.mp3");

sfxWin.volume = 0.5;
sfxDeath.volume = 0.5;
sfxSuccess.volume = 0.3;
sfxDamage.volume = 0.1;
sfxPartialDefense.volume = 0.5;

// enable buttons after battle start
function enableBattleButtons() {
  strongButton.addEventListener("click", strongAttack);
  evadeButton.addEventListener("click", evade);
  attackButton.addEventListener("click", normalAttack);
  defendButton.addEventListener("click", defend);
}

// disable battle buttons so user can't act after game win/loss
function disableBattleButtons() {
  strongButton.removeEventListener("click", strongAttack);
  evadeButton.removeEventListener("click", evade);
  attackButton.removeEventListener("click", normalAttack);
  defendButton.removeEventListener("click", defend);
}
