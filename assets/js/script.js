var healthBase = 50;
var defenseBase = 50;
var speedBase = 50;
var attackBase = 50;
var healthUp = document.querySelector(".health-up");
var attackUp = document.querySelector(".attack-up");
var speedUp = document.querySelector(".speed-up");
var defenseUp = document.querySelector(".defense-up");
var health = document.querySelector("#health-points");
var attack = document.querySelector("#attack-points");
var speed = document.querySelector("#speed-points");
var defense = document.querySelector("#defense-points");
var stats = document.querySelector(".stats");
var statPoints = 50;

stats.textContent = statPoints;
health.textContent = healthBase;
attack.textContent = attackBase;
speed.textContent = speedBase;
defense.textContent = defenseBase;

healthUp.addEventListener("click", function () {
  if (statPoints > 0) {
    statPoints--;
    healthBase++;
    health.textContent = healthBase;
    stats.textContent = statPoints;
    charStats.health = healthBase;
    console.log(charStats);
  } else {
    console.log("out of stat points");
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

var charStats = {
  health: healthBase,

  attack: attackBase,

  speed: speedBase,

  defense: defenseBase,
};
console.log(charStats);
