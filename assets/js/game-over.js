let winNumber = JSON.parse(window.localStorage.getItem("win-count"));
document.querySelector("#win-number").textContent = `Number of Fusion Pokemon Beaten: ${winNumber}`;