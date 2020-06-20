const stepScore = [
    [9999, 2, 3, 3, 3, 3, 2, 999],
    [2, -999, 4, 4, 4, 4, -999, 2],
    [3, 4, 5, 5, 5, 5, 4, 3],
    [3, 4, 5, 0, 0, 5, 4, 3],
    [3, 4, 5, 0, 0, 5, 4, 3],
    [3, 4, 5, 5, 5, 5, 4, 3],
    [2, -999, 4, 4, 4, 4, -999, 2],
    [999, 2, 3, 3, 3, 3, 2, 999]
];


function evaluate1(player, board) {
    const opponent = getOpponent(player);
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


function evaluate2(player, board) {

    const opponent = getOpponent(player);
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