function getCmaxStep(availSpots, player, board, depth = 0) {
    const opponent = getOpponent(player);
    let bestScore = -99999;
    let bestSpotIndex = 0;
    let
        alpha = -999999,
        beta = 999999;

    let debScore = [];
    for (let i = 0; i < availSpots.length; i++) {
        const newBoard = copyBoard(board);
        aiMove(availSpots[i][0], availSpots[i][1], player, newBoard);
        const currentScore = -cmax(opponent, newBoard, depth, -beta, -alpha);
        if (currentScore > bestScore) {
            bestScore = currentScore;
            bestSpotIndex = i;
        }
        debScore.push(currentScore);
    }
    console.countReset("pruned");
    console.log(availSpots);
    console.log(debScore);
    return bestSpotIndex;
}
function cmax(player, board, depth = 0, alpha = -999999, beta = 999999) {
    if (depth <= 0) {
        return evaluate2(player, board);
    }

    const opponent = getOpponent(player);
    if (checkPass(player, board)) {
        if (checkPass(opponent, board)) {
            // game is over
            return evaluate2(player, board);
        } else {
            return -cmax(player, board, depth - 1, -beta, -alpha);
        }
    }

    const availSpots = getAvailibleSpots(player, board);
    let bestScore = -99999;

    for (i of availSpots) {
        const newBoard = copyBoard(board);
        aiMove(i[0], i[1], player, newBoard);
        const currentScore = -cmax(opponent, newBoard, depth - 1, -beta, -alpha);
        if (currentScore > bestScore) {
            bestScore = currentScore;
            alpha = bestScore;
        }
        if (alpha >= beta) {
            console.count("pruned");
            break;
        }
    }

    return bestScore;

}
