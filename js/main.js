const $chessboard = document.getElementById('chess-board');
const $messageBar = document.getElementById('message');
const $pass = document.querySelector('#pass');

// 1. black     2. white
const
    black = 1,
    white = 2;
let delay = 500;
let turn = 1;
let board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

let timmer;


windowResize();
createChessBoard();
function windowResize() {
    const h = window.innerHeight * 0.92,
        w = window.innerWidth * 0.92;
    if (h > w) {
        $chessboard.style.width = w + 'px';
        $chessboard.style.height = w + 'px';
    } else {
        $chessboard.style.width = h + 'px';
        $chessboard.style.height = h + 'px';
    }
}
function createChessBoard() {
    const boardPartWidth = Math.floor(($chessboard.offsetWidth / 8) * 0.952) + 'px';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const boardPart = document.createElement('div');
            boardPart.id = "" + i + j;
            $chessboard.className = 'boardPart';
            boardPart.style.height = boardPartWidth;
            $chessboard.appendChild(boardPart);
            boardPart.addEventListener('click', play);
        }
    }
    createPiece(3, 4);
    createPiece(4, 3);
    turn = 2;
    createPiece(3, 3);
    createPiece(4, 4);
    turn = 1;
    hint();
}
function createPiece(x, y) {
    board[x][y] = turn;
    const chess = document.createElement('div'),
        b = document.createElement('div'),
        w = document.createElement('div');

    b.className = 'b';
    w.className = 'w';
    chess.className = 'chess';

    chess.appendChild(b);
    chess.appendChild(w);

    document.getElementById("" + x + y).appendChild(chess);

    if (turn === 2) {
        chess.classList.add('change');
    }
}

function play() {
    if (turn === black) {
        if (aiConfig.black !== "none") {
            return false;
        }
    }
    if (turn === white) {
        if (aiConfig.white !== "none") {
            return false;
        }
    }


    let target = this.id;

    // 玩家點擊的位置
    const x = parseInt(target.charAt(0));
    const y = parseInt(target.charAt(1));

    // 防止玩家點擊已翻過的棋子
    if (board[x][y] !== 0) { return; }

    move(x, y);
}

function move(x, y) {
    if (moveUtil(x, y)) {
        changeTurn();
        hint();
        timmer = setTimeout(ai, aiConfig.delay);
    }
}

// return true if any pieces are flanked
function moveUtil(x, y, player = turn) {

    let opponent = getOpponent(player);
    let flag = false;
    // top left
    let dx = -1, dy = -1;

    // treverse throught all dirrections
    while (dx <= 1) {
        dy = -1;
        while (dy <= 1) {
            if (dx === 0 && dy === 0) {
                dy++;
                continue;
            }

            let i = x, j = y;
            i += dx;
            j += dy;
            if (isOutOfChessboard(i, j)) { dy++; continue; }
            if (board[i][j] === opponent) {
                i += dx;
                j += dy;
                if (isOutOfChessboard(i, j)) { dy++; continue; }

                while (board[i][j] === opponent) {
                    i += dx;
                    j += dy;
                    if (isOutOfChessboard(i, j)) { break; }
                }

                if (!isOutOfChessboard(i, j)) {
                    if (board[i][j] === player) {
                        if (!flag) {
                            flag = true;
                        }
                        let i = x, j = y;

                        if (board[i][j] == 0) {
                            createPiece(i, j);
                        }

                        i += dx;
                        j += dy;
                        while (board[i][j] === opponent) {
                            board[i][j] = player;
                            flipPiece(i, j);
                            i += dx;
                            j += dy;
                        }
                    }
                }
            }
            dy++;
        }
        dx++;
    }
    return flag;
}

function checkSpotAvailible(x, y, player = turn, board = board) {
    // check if is empty
    if (board[x][y]) {
        return false;
    }

    let opponent = getOpponent(player);

    // top left
    let dx = -1, dy = -1;

    // treverse throught all dirrections
    while (dx <= 1) {
        dy = -1;
        while (dy <= 1) {
            if (dx === 0 && dy === 0) {
                dy++;
                continue;
            }

            let i = x, j = y;
            i += dx;
            j += dy;
            if (isOutOfChessboard(i, j)) { dy++; continue; }
            if (board[i][j] === opponent) {
                i += dx;
                j += dy;

                if (isOutOfChessboard(i, j)) { dy++; continue; }
                while (board[i][j] === opponent) {
                    i += dx;
                    j += dy;
                    if (isOutOfChessboard(i, j)) { break; }
                }

                if (!isOutOfChessboard(i, j)) {
                    if (board[i][j] === player) {
                        return true;
                    }
                }
            }
            dy++;
        }
        dx++;
    }
    return false;
}

function getOpponent(player) {
    return 3 - player;
}

function isOutOfChessboard(x, y) {
    if (x < 0 || y < 0 || x > 7 || y > 7) {
        return true;
    }
    return false;
}

function flipPiece(x, y) {
    board[x][y] = turn;
    document.getElementById("" + x + y).firstChild.classList.toggle('change');
}


function hint() {
    let a = document.querySelectorAll('.active');
    for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('active');
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === 0 && checkSpotAvailible(i, j, turn, board)) {
                document.getElementById('' + i + j).classList.add('active');
            }
        }
    }
}

function changeTurn() {
    let opponent = getOpponent(turn);
    if (checkPass(opponent, board)) {
        if (checkPass(turn, board)) {
            endGame();
        } else {
            $pass.style.display = "block";
            setTimeout(() => { $pass.style.display = "none"; }, 1000)
            console.log("pass: ", turn)
        }
    } else {
        turn = opponent;
        if (turn === 1) {
            $messageBar.innerHTML = "Black's Move";
        } else {
            $messageBar.innerHTML = "White's Move";
        }

    }
}

function checkPass(player, board) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (checkSpotAvailible(i, j, player, board)) {
                return false;
            }
        }
    }
    return true;
}

function getNumPieces(board) {
    let
        b = 0,
        w = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] == 1) {
                b++;
            } else if (board[i][j] == 2) {
                w++
            }
        }
    }
    return [b, w]
}

function endGame() {
    let msg = "";
    const [numBlackPieces, numWhitePieces] = getNumPieces(board);
    if (numBlackPieces > numWhitePieces) {
        msg = "Black Wins<br>";
    } else if (numBlackPieces < numWhitePieces) {
        msg = "White Wins<br>";
    } else {
        msg = "Tie<br>";
    }
    msg += `Black: ${numBlackPieces}    White: ${numWhitePieces}`;
    $messageBar.innerHTML = msg;
}