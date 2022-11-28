// Stat allocator for user character

var healthBase = 500;
var defenseBase = 60;
var speedBase = 500;
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
var battleButton = document.querySelector(".battle");

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

stats.textContent = statPoints;
healthEl.textContent = healthBase;
attack.textContent = attackBase;
speed.textContent = speedBase;
defense.textContent = defenseBase;

// Stat change functions

healthUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints -= 5;
    healthBase += 5;
    healthEl.textContent = healthBase;
    stats.textContent = statPoints;
    charStats.health = healthBase;
    console.log(charStats);
  } else {
    console.log("out of stat points");
  }
});

healthDown.addEventListener("click", function () {
  if (healthBase > 50) {
    statPoints += 5;
    healthBase -= 5;
    healthEl.textContent = healthBase;
    stats.textContent = statPoints;
    charStats.health = healthBase;
    console.log(charStats);
  } else {
    console.log("cannot go below 50 health stat");
  }
});

attackUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints -= 5;
    attackBase += 5;
    attack.textContent = attackBase;
    stats.textContent = statPoints;
    charStats.attack = attackBase;
  } else {
    console.log("out of stat points");
  }
});

attackDown.addEventListener("click", function () {
  if (attackBase > 50) {
    statPoints += 5;
    attackBase -= 5;
    attack.textContent = attackBase;
    stats.textContent = statPoints;
    charStats.attack = attackBase;
    console.log(charStats);
  } else {
    console.log("cannot go below 50 attack stat");
  }
});

speedUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints -= 5;
    speedBase += 5;
    speed.textContent = speedBase;
    stats.textContent = statPoints;
    charStats.speed = speedBase;
  } else {
    console.log("out of stat points");
  }
});

speedDown.addEventListener("click", function () {
  if (speedBase > 50) {
    statPoints += 5;
    speedBase -= 5;
    speed.textContent = speedBase;
    stats.textContent = statPoints;
    charStats.speed = speedBase;
    console.log(charStats);
  } else {
    console.log("cannot go below 50 speed stat");
  }
});

defenseUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints -= 5;
    defenseBase += 5;
    defense.textContent = defenseBase;
    stats.textContent = statPoints;
    charStats.defense = defenseBase;
  } else {
    console.log("out of stat points");
  }
});

defenseDown.addEventListener("click", function () {
  if (defenseBase > 50) {
    statPoints += 5;
    defenseBase -= 5;
    defense.textContent = defenseBase;
    stats.textContent = statPoints;
    charStats.defense = defenseBase;
    console.log(charStats);
  } else {
    console.log("cannot go below 50 defense stat");
  }
});

var charStats = {
  health: healthBase,

  attack: attackBase,

  speed: speedBase,

  defense: defenseBase,
};

var opponentStats = {};

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
          return response.json();
        })
        .then(function (data) {
          var poke1Hp = data.stats[0].base_stat;
          var poke1Attack = data.stats[1].base_stat;
          var poke1Defense = data.stats[2].base_stat;
          var poke1Speed = data.stats[5].base_stat;
          poke1Attack = poke1Attack / 2;
          poke1Hp = poke1Hp + poke1Defense / 2;
          fetch("https://pokeapi.co/api/v2/pokemon/" + poke2)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
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

              opponentStats.health = fusionPokemonHp;
              opponentStats.attack = fusionPokemonAttack;
              opponentStats.speed = fusionPokemonSpeed;
              opponentStats.defense = fusionPokemonDefense;
              console.log("opponent");
              console.log(opponentStats);
              console.log(opponentStats.health);
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
fusionPokemon();
// console.log(opponentStats);
var currentStats = charStats;
// console.log(currentStats.health);

// Changing from stat screen to battle screen
function battle() {
  document.querySelector("#oppPokemon").setAttribute("class", "");
  document.querySelectorAll(".pageButtons").forEach(function (button) {
    button.setAttribute("class", "hide");
  });
  document.querySelector("#userStats").setAttribute("class", "pokemonStats");
  document.querySelector("#userPokemon").setAttribute("class", "userPokemon");
  document.querySelector("body").setAttribute("class", "forest");
  document.querySelector("#dialogue").textContent =
    "A wild fusion Pokemon has appeared!";
  document.querySelector("#attackButtons").setAttribute("class", "");
}

// Functions for actions during battle phase

function normalAttack() {
  console.log("attack");
  if (currentStats.speed >= opponentStats.speed) {
    document.querySelector("#dialogue").textContent =
      "Your Pokemon attacked first due to its higher speed!";
    opponentStats.health -= currentStats.attack * 0.75;
    winCheck();
    hpUpdate();
    document.querySelector("#dialogue").textContent =
      "The fusion Pokemon attacked first due to its higher speed!";
    currentStats.health -= opponentStats.attack;
    loseCheck();
    hpUpdate();
    console.log("opponent hp", opponentStats.health);
    console.log("your hp", currentStats.health);
  } else {
    currentStats.health -= opponentStats.attack;
    loseCheck();
    hpUpdate();
    opponentStats.health -= currentStats.attack * 0.75;
    winCheck();
    hpUpdate();
  }
}

function strongAttack() {
  loseCheck();
  var percentage = 100;
  var hitChance = Math.floor(Math.random() * percentage);
  console.log("strong attack chance");
  if (hitChance > 70) {
    console.log("Your strong attack missed");
    currentStats.health -= opponentStats.attack;
    loseCheck();
    hpUpdate();
    console.log("opponent hp", opponentStats.health);
    console.log("your hp", currentStats.health);
  } else {
    if (currentStats.speed >= opponentStats.speed) {
      document.querySelector("#dialogue").textContent =
        "Your Pokemon attacked first due to its higher speed!";
      opponentStats.health -= currentStats.attack;
      winCheck();
      hpUpdate();
      document.querySelector("#dialogue").textContent =
        "The fusion Pokemon attacked first due to its higher speed!";
      currentStats.health -= opponentStats.attack;
      loseCheck();
      hpUpdate();
      console.log("opponent hp", opponentStats.health);
      console.log("your hp", currentStats.health);
    } else {
      currentStats.health -= opponentStats.attack;
      loseCheck();
      hpUpdate();
      opponentStats.health -= currentStats.attack;
      winCheck();
      hpUpdate();
    }
  }
}

function defend() {
  var randomDefense = Math.floor(Math.random() * currentStats.defense);
  console.log(currentStats.defense);
  console.log(randomDefense);
  console.log(opponentStats);
  if (opponentStats.attack - randomDefense <= 5) {
    currentStats.health = currentStats.health - 5;
    document.querySelector("#dialogue").textContent =
      "You have successfully defended! You only take 5 damage.";
    loseCheck();
    hpUpdate();
  } else if (randomDefense <= 5) {
    randomDefense = 5;
    currentStats.health =
      currentStats.health - (opponentStats.attack - randomDefense);
    document.querySelector("#dialogue").textContent =
      "You have unsuccessfully defended! You only mitigated 5 damage.";
    loseCheck();
    hpUpdate();
  } else {
    currentStats.health =
      currentStats.health - (opponentStats.attack - randomDefense);
    document.querySelector(
      "#dialogue"
    ).textContent = `You have defended some of the damage. You took ${randomDefense} reduced damage.`;
    loseCheck();
    hpUpdate();
  }
}

function winCheck() {
  if (opponentStats.health <= 0) {
    opponentStats.attack = 0;
    opponentStats.health = 0;
    document.querySelector("#health-points").textContent = currentStats.health;
    document.querySelector("#oppHealth").textContent = opponentStats.health;
    document.querySelector("#dialogue").textContent = "You win";
    console.log("you win!");
    return;
  }
}

function loseCheck() {
  if (currentStats.health <= 0) {
    currentStats.attack = 0;
    currentStats.health = 0;
    document.querySelector("#health-points").textContent = currentStats.health;
    document.querySelector("#oppHealth").textContent = opponentStats.health;
    console.log("game over");
    return;
  }
}

function hpUpdate() {
  document.querySelector("#health-points").textContent = currentStats.health;
  document.querySelector("#oppHealth").textContent = opponentStats.health;
}

function evade() {
  let evadeChance = Math.floor((speedBase / 150) * 100);
  console.log("evade chance:");
  console.log(evadeChance);
  let randomChance = Math.floor(Math.random() * 100);
  console.log("random chance:");
  console.log(randomChance);

  console.log("opponent's attack:");
  console.log(opponentStats.attack);

  if (randomChance <= evadeChance) {
    console.log("evade success");
    document.querySelector("#dialogue").textContent =
      "You have successfully evaded the enemy attack. You took 0 damage.";
    hpUpdate();
  } else {
    console.log("evade failed");
    currentStats.health -= opponentStats.attack;
    document.querySelector("#dialogue").textContent =
      "You have failed to evade the enemy attack. You took 100% damage.";
    loseCheck();
    hpUpdate();
  }

  console.log("hp after evade:");
  console.log(currentStats.health);
}

strongButton.addEventListener("click", strongAttack);
battleButton.addEventListener("click", battle);
attackButton.addEventListener("click", normalAttack);
defendButton.addEventListener("click", defend);
evadeButton.addEventListener("click", evade);
