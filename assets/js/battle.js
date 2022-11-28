// Stat allocator for user character

var healthBase = 50;
var defenseBase = 60;
var speedBase = 50;
var attackBase = 30;
var healthUp = document.querySelector(".health-up");
var attackUp = document.querySelector(".attack-up");
var speedUp = document.querySelector(".speed-up");
var defenseUp = document.querySelector(".defense-up");
var healthDown = document.querySelector(".health-down");
var attackDown = document.querySelector(".attack-down");
var speedDown = document.querySelector(".speed-down");
var defenseDown = document.querySelector(".defense-down");

var healthEl = document.querySelector("#health-points");
var attack = document.querySelector("#attack-points");
var speed = document.querySelector("#speed-points");
var defense = document.querySelector("#defense-points");
var stats = document.querySelector(".stats");
var statPoints = 50;
var defendButton = document.querySelector("#defendButton");
var strongButton = document.querySelector("#strong-button");

stats.textContent = statPoints;
healthEl.textContent = healthBase;
attack.textContent = attackBase;
speed.textContent = speedBase;
defense.textContent = defenseBase;

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
// console.log(charStats);

var opponentStats = {};

// fetch request for fusion pokemon

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
          // console.log(data);
          var poke1Hp = data.stats[0].base_stat;
          var poke1Attack = data.stats[1].base_stat;
          var poke1Defense = data.stats[2].base_stat;
          var poke1Speed = data.stats[5].base_stat;
          poke1Attack = poke1Attack / 2;
          poke1Hp = poke1Hp + poke1Defense / 2;
          // console.log(poke1Attack);
          // console.log(poke1Hp);
          // console.log(poke1Speed);
          fetch("https://pokeapi.co/api/v2/pokemon/" + poke2)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              // console.log(data);
              var poke2Hp = data.stats[0].base_stat;
              var poke2Attack = data.stats[1].base_stat;
              var poke2Defense = data.stats[2].base_stat;
              var poke2Speed = data.stats[5].base_stat;
              poke2Attack = poke2Attack / 2;
              poke2Hp = poke2Hp + poke2Defense / 2;
              // console.log(poke2Attack);
              // console.log(poke2Hp);
              // console.log(poke2Speed);
              var fusionPokemonAttack = (poke1Attack + poke2Attack) / 2;
              var fusionPokemonHp = (poke1Hp + poke2Hp) / 2;
              var fusionPokemonSpeed = (poke1Speed + poke2Speed) / 2;
              var fusionPokemonDefense = (poke1Defense + poke2Defense) / 2;
              // console.log(fusionPokemonAttack);
              // console.log(fusionPokemonHp);
              // console.log(fusionPokemonSpeed);

              opponentStats.health = fusionPokemonHp;
              opponentStats.attack = fusionPokemonAttack;
              opponentStats.speed = fusionPokemonSpeed;
              opponentStats.defense = 0;
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

// function fusionStats() {
//   console.log("opponent test");
//   console.log(opponentStats);
//   console.log(opponentStats.health);
// }

document.querySelector("#userPokemonName").textContent = JSON.parse(
  localStorage.getItem("name")
);
var userPokeImgSRC = JSON.parse(localStorage.getItem("image"));
userPokeImgSRC = userPokeImgSRC.split("assets");
document.querySelector("#userPokemonImg").src = "./assets" + userPokeImgSRC[1];
fusionPokemon();
console.log(opponentStats);
var currentStats = charStats;
console.log(currentStats.health);

var battlebtn = document.querySelector(".battle");

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

function attackChoice() {
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

defendButton.addEventListener("click", defend);

console.log(JSON.parse(localStorage.getItem("nameArray")));

function defend() {
  var randomDefense = Math.floor(Math.random(currentStats.defense));
  console.log(currentStats.defense);
  console.log(randomDefense);
  console.log(opponentStats);
  if (fusionPokemonAttack - randomDefense <= 5) {
    fusionPokemonAttack = 5;
    currentStats.health = currentStats.health - fusionPokemonAttack;
    document.querySelector("#dialogue").textContent =
      "You have successfully defended! You only take 5 damage.";
    document.querySelector("#health-points").textContent = currentStats.health;
  } else if (randomDefense <= 5) {
    randomDefense = 5;
    currentStats.health =
      currentStats.health - (fusionPokemonAttack - randomDefense);
    document.querySelector("#health-points").textContent = currentStats.health;
    document.querySelector("#dialogue").textContent =
      "You have unsuccessfully defended! You only mitigated 5 damage.";
  } else {
    currentStats.health =
      currentStats.health - (fusionPokemonAttack - randomDefense);
    document.querySelector(
      "#dialogue"
    ).textContent = `You have defended some of the damage. You took ${randomDefense} reduced damage.`;
    document.querySelector("#health-points").textContent = currentStats.health;
  }
}

function winCheck() {
  if (opponentStats.health <= 0) {
    opponentStats.health = 0;
    document.querySelector("#health-points").textContent = currentStats.health;
    document.querySelector("#oppHealth").textContent = opponentStats.health;
    // document.querySelector("#dialogue").textContent = "You win";
    console.log("you win!");
    return;
  }
}

function loseCheck() {
  if (currentStats.health <= 0) {
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
// strongAttackChoice();
// function evadeHit() {
//   var evadeHit = false;
//   var percentage = 100;
//   var evadeChance = speedBase / 150;
//   var evadeRng = Math.floor(Math.random() * percentage);
//   if (evadeRng <= evadeChance) {
//     evadeHit = true;
//     console.log("attack evaded");
//   }
// }

battlebtn.addEventListener("click", battle);

strongButton.addEventListener("click", strongAttack);
