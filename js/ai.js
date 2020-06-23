"use strict";
const depth = 5;
function ai() {
    let aiMode;
    if (turn === black && aiConfig.black !== "none") {
        aiMode = aiConfig.black;
    } else if (turn === white && aiConfig.white !== "none") {
        aiMode = aiConfig.white;
    } else {
        return false;
    }

    let spot;
    const availSpots = getAvailibleSpots(turn, board);
    if (availSpots.length === 0) { return false; }

    switch (aiMode) {
        case "random":
            spot = getRandomSpot(availSpots);
            break;
        case "maxScoreSpot":
            spot = getMaxScoreSpot(availSpots);
            break;
        case "cmax_ev1":
            spot = getCmaxStep(availSpots, turn, board, depth, evaluate1);
            break;
        case "cmax_ev2":
            spot = getCmaxStep(availSpots, turn, board, depth, evaluate2);
            break;
        case "cmax_ev3":
            spot = getCmaxStep(availSpots, turn, board, depth, evaluate3);
            break;
        case "cmin_ev3":
            spot = getCminStep(availSpots, turn, board, depth, evaluate3);
            break;
        default:
            console.error("Can't find ", aiMode);
    }
    move(availSpots[spot][0], availSpots[spot][1]);
}