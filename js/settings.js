let aiConfig = {
    black: "none",
    white: "none",
    delay: 800
};
document.querySelector('#ok')
    .addEventListener("click", () => {
        aiConfig.black = document.querySelector("#blackAi").value;
        aiConfig.white = document.querySelector("#whiteAi").value;
        aiConfig.delay = parseFloat(document.querySelector("#delay").value) * 1000;
        document.querySelector("#configBoard").style.display = "none";
        ai();
    });

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