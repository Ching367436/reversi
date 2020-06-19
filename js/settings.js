let aiConfig = {
    black: "none",
    white: "none",
    delay: 800
};
loadSettings();

window.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        applySettings();
    }
});

function loadSettings() {
    if (localStorage.getItem("aiConfig") !== null) {
        aiConfig = JSON.parse(localStorage.getItem("aiConfig"));
    }
    document.querySelector("#blackAi").value = aiConfig.black;
    document.querySelector("#whiteAi").value = aiConfig.white;
    document.querySelector("#delay").value = aiConfig.delay / 1000;
}

document.querySelector('#ok')
    .addEventListener("click", applySettings);

function applySettings() {
    aiConfig.black = document.querySelector("#blackAi").value;
    aiConfig.white = document.querySelector("#whiteAi").value;
    aiConfig.delay = parseFloat(document.querySelector("#delay").value) * 1000;
    document.querySelector("#configBoard").style.display = "none";
    ai();
    localStorage.setItem("aiConfig", JSON.stringify(aiConfig));
}

document.querySelector('#settings')
    .addEventListener("click", () => {
        // pause ai
        clearTimeout(timmer);
        document.querySelector("#configBoard").style.display = "block";
    });
document.querySelector('#newGame')
    .addEventListener("click", () => {
        location.reload();
    })