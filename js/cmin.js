function getCminStep(availSpots, player, board, depth = 0, eval) {
    if (availSpots.length === 1) { return 0; }

    pruned = 0;
    const opponent = getOpponent(player);
    let minScore = 99999;
    let minSpotIndex = 0;
    let
        alpha = 999999,
        beta = -999999;

    for (let i = 0; i < availSpots.length; i++) {
        const newBoard = copyBoard(board);
        aiMove(availSpots[i][0], availSpots[i][1], player, newBoard);
        const currentScore = -cmin(opponent, newBoard, depth, -beta, -alpha, eval);
        if (currentScore < minScore) {
            minScore = currentScore;
            minSpotIndex = i;
        }
    }
    console.log("score: ", minScore);
    console.log("pruned: ", pruned);
    return minSpotIndex;
}
function cmin(player, board, depth = 0, alpha = -999999, beta = 999999, eval) {
    if (depth <= 0) {
        return eval(player, board);
    }

    const opponent = getOpponent(player);
    if (checkPass(player, board)) {
        if (checkPass(opponent, board)) {
            // game is over
            return eval(player, board);
        } else {
            return -cmin(player, board, depth - 1, -beta, -alpha, eval);
        }
    }

    const availSpots = getAvailibleSpots(player, board);
    let minScore = 99999;

    for (i of availSpots) {
        const newBoard = copyBoard(board);
        aiMove(i[0], i[1], player, newBoard);
        const currentScore = -cmax(opponent, newBoard, depth - 1, -beta, -alpha, eval);
        if (currentScore < minScore) {
            minScore = currentScore;
            alpha = minScore;
        }
        if (alpha <= beta) {
            ++pruned;
            break;
        }
    }

    return minScore;

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
