const stepScore = [
    [999, -50, -3, 2, 1, -3, -50, 999],
    [-50, -100, 7, 5, 5, 7, -100, -50],
    [3, 7, 52, 50, 30, 47, 7, 3],
    [3, 9, 50, 0, 0, 50, 8, 3],
    [3, 8, 50, 0, 0, 50, 9, 3],
    [3, 7, 40, 50, 30, 52, 7, 3],
    [-50, -100, 7, 5, 5, 7, -100, -50],
    [999, -50, -4, 3, 2, -3, -50, 999]
];

function getAvailibleSpots(player, board) {
    let availSpots = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (checkSpotAvailible(i, j, player, board)) {
                availSpots.push([i, j]);
            }
        }
    }
    return availSpots;
}

function getRandomSpot(availSpots) {
    const len = availSpots.length;
    let spot = getRandomNumber(0, len);
    return spot;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function getMaxScoreSpot(avalSpots) {
    let maxSpot = 0;
    let x = avalSpots[0][0];
    let y = avalSpots[0][1];
    let maxScore = stepScore[x][y];
    for (let i = 1; i < avalSpots.length; i++) {
        let x = avalSpots[i][0];
        let y = avalSpots[i][1];
        let score = stepScore[x][y];
        if (maxScore < score) {
            maxScore = score;
            maxSpot = i;
        }
    }
    return maxSpot;
}