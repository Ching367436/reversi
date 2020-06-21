let pruned = 0;
function getCmaxStep(availSpots, player, board, depth = 0, eval) {
    if (availSpots.length === 1) { return 0; }

    pruned = 0;
    const opponent = getOpponent(player);
    let bestScore = -99999;
    let bestSpotIndex = 0;
    let
        alpha = -999999,
        beta = 999999;

    // sortAvailSpots(availSpots);

    for (let i = 0; i < availSpots.length; i++) {
        const newBoard = copyBoard(board);
        aiMove(availSpots[i][0], availSpots[i][1], player, newBoard);
        const currentScore = -cmax(opponent, newBoard, depth, -beta, -alpha, eval);
        if (currentScore > bestScore) {
            bestScore = currentScore;
            bestSpotIndex = i;
        }
    }
    console.log("score: ", bestScore);
    console.log("pruned: ", pruned);
    return bestSpotIndex;
}
function cmax(player, board, depth = 0, alpha = -999999, beta = 999999, eval) {
    if (depth <= 0) {
        return eval(player, board);
    }

    const opponent = getOpponent(player);
    if (checkPass(player, board)) {
        if (checkPass(opponent, board)) {
            // game is over
            return eval(player, board);
        } else {
            return -cmax(player, board, depth - 1, -beta, -alpha, eval);
        }
    }

    const availSpots = getAvailibleSpots(player, board);
    let bestScore = -99999;

    for (i of availSpots) {
        const newBoard = copyBoard(board);
        aiMove(i[0], i[1], player, newBoard);
        const currentScore = -cmax(opponent, newBoard, depth - 1, -beta, -alpha, eval);
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

function sortAvailSpots(availSpots, player, board, eval) {
    availSpots.sort((a, b) => {
        let newBoard = copyBoard(board);
        aiMove(a[0], a[1], player, newBoard);
        const ea = eval(player, newBoard)
        newBoard = copyBoard(board);
        aiMove(b[0], b[1], player, newBoard);
        const eb = eval(player, newBoard);

        return ea - eb;
    })

}