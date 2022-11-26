// Stat allocator for user character

var healthBase = 50;
var defenseBase = 50;
var speedBase = 50;
var attackBase = 50;
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

stats.textContent = statPoints;
healthEl.textContent = healthBase;
attack.textContent = attackBase;
speed.textContent = speedBase;
defense.textContent = defenseBase;

healthUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints--;
    healthBase++;
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
    statPoints++;
    healthBase--;
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
    statPoints--;
    attackBase++;
    attack.textContent = attackBase;
    stats.textContent = statPoints;
    charStats.attack = attackBase;
  } else {
    console.log("out of stat points");
  }
});

attackDown.addEventListener("click", function () {
  if (attackBase > 50) {
    statPoints++;
    attackBase--;
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
    statPoints--;
    speedBase++;
    speed.textContent = speedBase;
    stats.textContent = statPoints;
    charStats.speed = speedBase;
  } else {
    console.log("out of stat points");
  }
});

speedDown.addEventListener("click", function () {
  if (speedBase > 50) {
    statPoints++;
    speedBase--;
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
    statPoints--;
    defenseBase++;
    defense.textContent = defenseBase;
    stats.textContent = statPoints;
    charStats.defense = defenseBase;
  } else {
    console.log("out of stat points");
  }
});

defenseDown.addEventListener("click", function () {
  if (defenseBase > 50) {
    statPoints++;
    defenseBase--;
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
      // console.log(data);
      var poke1 = data.fused.body.toLowerCase();
      var poke2 = data.fused.head.toLowerCase();
      var fusionPokemonImg = data.image_url;
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
            });
        });
    });
}

// function fusionStats() {
//   console.log("opponent test");
//   console.log(opponentStats);
//   console.log(opponentStats.health);
// }

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
  document.querySelector("body").setAttribute("class", "forest");
  if (currentStats.speed >= opponentStats.speed) {
    opponentStats.health -= currentStats.attack;
    if (opponentStats.health <= 0) {
      opponentStats.health = 0;
      console.log("you win");
      console.log("opponent hp", opponentStats.health);
      console.log("your hp", currentStats.health);
      return;
    } else {
      currentStats.health -= opponentStats.attack;
      console.log("opponent hp", opponentStats.health);
      console.log("your hp", currentStats.health);
    }
  } else {
    currentStats.health -= opponentStats.attack;
    if (currentStats.health <= 0) {
      currentStats.health = 0;
      console.log("game over");
      return;
    } else {
      opponentStats.health -= currentStats.attack;
      if (opponentStats.health <= 0) {
        opponentStats.health = 0;
        console.log("you win");
        console.log("opponent hp", opponentStats.health);
        console.log("your hp", currentStats.health);
        return;
      } else {
        console.log("opponent hp", opponentStats.health);
        console.log("your hp", currentStats.health);
      }
    }
  }
}

battlebtn.addEventListener("click", battle);
