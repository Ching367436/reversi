"use strict";
const stepScore = [
    [100, 2, 3, 3, 3, 3, 2, 100],
    [2, 0, 4, 4, 4, 4, 0, 2],
    [3, 4, 5, 5, 5, 5, 4, 3],
    [3, 4, 5, 0, 0, 5, 4, 3],
    [3, 4, 5, 0, 0, 5, 4, 3],
    [3, 4, 5, 5, 5, 5, 4, 3],
    [2, 0, 4, 4, 4, 4, 0, 2],
    [100, 2, 3, 3, 3, 3, 2, 100]
];


function evaluate1(player, board) {
    const opponent = getOpponent(player);
    if (checkPass(player, board) && checkPass(opponent, board)) {
        // game is over
        const [numBlackPieces, numWhitePieces] = getNumPieces(board);
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
    for (const i of playerAvailSpots) {
        score += stepScore[i[0]][i[1]];
    }

    const opponentAvailSpots = getAvailibleSpots(opponent, board);
    for (const i of opponentAvailSpots) {
        score -= stepScore[i[0]][i[1]];
    }
    return score;
}


function evaluate2(player, board) {

    const opponent = getOpponent(player);
    if (checkPass(player, board) && checkPass(opponent, board)) {
        // game is over
        const [numBlackPieces, numWhitePieces] = getNumPieces(board);
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

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === player) {
                score += stepScore[i][j];
            } else if (board[i][j] === opponent) {
                score -= stepScore[i][j];
            }
        }
    }
    return score;
}

function evaluate3(player, board) {
    const [numBlackPieces, numWhitePieces] = getNumPieces(board);
    const numPieces = numBlackPieces + numWhitePieces;

    const alpha = getAlpha(numPieces);
    return alpha * evaluate1(player, board) + (1 - alpha) * evaluate2(player, board);
}

function getAlpha(numPieces) {
    const b = 3 / 2, w = -1 / 30;
    const alpha = sigmoid(w * numPieces + b);
    return alpha;
}