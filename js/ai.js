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
        case "cmax":
            spot = getCmaxStep(availSpots, turn, board, depth = 3);
            break;
        default:
            console.error("Can't find ", aiMode);
    }
    move(availSpots[spot][0], availSpots[spot][1]);
}