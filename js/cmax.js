"use strict";
let pruned = 0;
function getCmaxStep(availSpots, player, board, depth = 0, evaluate) {
    if (availSpots.length === 1) { return 0; }

    console.time("Ching's Max");
    pruned = 0;
    const opponent = getOpponent(player);
    let bestScore = -99999;
    let bestSpotIndex = 0;
    let
        alpha = -999999,
        beta = 999999;


    for (let i = 0; i < availSpots.length; i++) {
        const newBoard = copyBoard(board);
        aiMove(availSpots[i][0], availSpots[i][1], player, newBoard);
        const currentScore = -cmax(opponent, newBoard, depth, -beta, -alpha, evaluate);
        if (currentScore > bestScore) {
            bestScore = currentScore;
            bestSpotIndex = i;
        }
    }
    console.timeEnd("Ching's Max");
    console.log("score: ", bestScore);
    console.log("pruned: ", pruned);
    return bestSpotIndex;
}
function cmax(player, board, depth = 0, alpha = -999999, beta = 999999, evaluate) {
    if (depth <= 0) {
        return evaluate(player, board);
    }

    const opponent = getOpponent(player);
    if (checkPass(player, board)) {
        if (checkPass(opponent, board)) {
            // game is over
            return evaluate(player, board);
        } else {
            return -cmax(player, board, depth - 1, -beta, -alpha, evaluate);
        }
    }

    const availSpots = getAvailibleSpots(player, board);
    let bestScore = -99999;

    for (const i of availSpots) {
        const newBoard = copyBoard(board);
        aiMove(i[0], i[1], player, newBoard);
        const currentScore = -cmax(opponent, newBoard, depth - 1, -beta, -alpha, evaluate);
        if (currentScore > bestScore) {
            bestScore = currentScore;
            alpha = bestScore;
        }
        if (alpha >= beta) {
            ++pruned;
            break;
        }
    }

    return bestScore;

}
