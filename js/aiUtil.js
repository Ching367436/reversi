const stepScore = [
    [17, 2, 3, 3, 3, 3, 2, 17],
    [2, 1, 4, 4, 4, 4, 1, 2],
    [3, 4, 5, 5, 5, 5, 4, 3],
    [3, 4, 5, 0, 0, 5, 4, 3],
    [3, 4, 5, 0, 0, 5, 4, 3],
    [3, 4, 5, 5, 5, 5, 4, 3],
    [2, 1, 4, 4, 4, 4, 1, 2],
    [17, 2, 3, 3, 3, 3, 2, 17]
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

function evaluate(player, board) {
    let opponent = getOpponent(player);
    if (checkPass(player, board) && checkPass(opponent, board)) {
        // game is over
        const [numBlackPieces, numWhitePieces] = getNumChess(board);
        if (numBlackPieces > numWhitePieces) {
            if (player === black) {
                return 99999;
            } else {
                return -99999;
            }
        } else if (numBlackPieces < numWhitePieces) {
            if (player === black) {
                return -99999;
            } else {
                return 99999;
            }
        } else {
            return 0;
        }

    }

    let score = 0;
    const playerAvailSpots = getAvailibleSpots(player, board);
    for (i of playerAvailSpots) {
        score += stepScore[i[0]][i[1]];
    }

    const opponentAvailSpots = getAvailibleSpots(opponent, board);
    for (i of opponentAvailSpots) {
        score -= stepScore[i[0]][i[1]];
    }
    return score;
}