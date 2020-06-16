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
    avalSpots = getAvailibleSpots(turn, board);
    if (avalSpots.length === 0) { return false; }

    switch (aiMode) {
        case "random":
            spot = getRandomSpot(avalSpots);
            break;
        case "maxScoreSpot":
            spot = getMaxScoreSpot(avalSpots);
            break;
        default:
            console.error("Can't find ", aiMode);
    }
    move(avalSpots[spot][0], avalSpots[spot][1]);
}