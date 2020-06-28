"use strict";
function getCminStep(availSpots, player, board, depth = 0, evaluate) {
    if (availSpots.length === 1) { return 0; }

    const opponent = getOpponent(player);
    let minScore = 99999;
    let minSpotIndex = 0;
    let
        alpha = 999999,
        beta = -999999;

    for (let i = 0; i < availSpots.length; i++) {
        const newBoard = copyBoard(board);
        virtualMove(availSpots[i][0], availSpots[i][1], player, newBoard);
        const currentScore = -cmin(opponent, newBoard, depth, -beta, -alpha, evaluate);
        if (currentScore < minScore) {
            minScore = currentScore;
            minSpotIndex = i;
        }
    }
    return minSpotIndex;
}
function cmin(player, board, depth = 0, alpha = -999999, beta = 999999, evaluate) {
    if (depth <= 0) {
        return evaluate(player, board);
    }

    const opponent = getOpponent(player);
    if (checkPass(player, board)) {
        if (checkPass(opponent, board)) {
            // game is over
            return evaluate(player, board);
        } else {
            return -cmin(player, board, depth - 1, -beta, -alpha, evaluate);
        }
    }

    const availSpots = getAvailibleSpots(player, board);
    let minScore = 99999;

    for (const i of availSpots) {
        const newBoard = copyBoard(board);
        aiMove(i[0], i[1], player, newBoard);
        const currentScore = -cmax(opponent, newBoard, depth - 1, -beta, -alpha, evaluate);
        if (currentScore < minScore) {
            minScore = currentScore;
            alpha = minScore;
        }
        if (alpha <= beta) {
            break;
        }
    }

    return minScore;

}
