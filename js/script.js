var board = [0,1,2,3,4,5,6,7,8]; 
var computer = "x"
var human = "o"
var currentPlayer = human;


const cells = document.querySelectorAll('.cell');
const replay = document.getElementById('replay');
startGame();

function startGame() {
    reset();
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].addEventListener("click",turnClick,false);
    }
    replay.addEventListener("click",startGame,false);
}

function turnClick(cell) {
    turn(cell.target.id,currentPlayer)
    console.log(board)
    if(!checkTie()) turn(minimax(board, currentPlayer).index, currentPlayer)
}

function turn(position,player){
    if(player==currentPlayer && board[position]==position){
        board[position] = player;
        cells[position].innerHTML = player
        if (checkWinner(board, player)) gameOver();
        nextPlayer();
    }
}

function checkWinner(board,player){
    if ((board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)) {
        return true;
    }
    return false;
}

function nextPlayer(){
    if(currentPlayer == human){
        console.log("computer turn");
        currentPlayer = computer;
    }else{
        console.log("human turn");
        currentPlayer = human;
    }
}

function minimax(newBoard, player) {
    var availableCells = emptyCells(newBoard);

    if (checkWinner(newBoard, human)) {
        return {score:-1};
    } else if (checkWinner(newBoard, computer)) {
        return {score:1};
    } else if (availableCells.length === 0) {
        return {score: 0};
    }

    var moves = possibleMoves(newBoard, availableCells, player);

    var bestMove = getBestMove (moves, player);

    return moves[bestMove];
}

function possibleMoves(newBoard, availableCells, player) {
    var moves = [];
    for (var i = 0; i < availableCells.length; i++) {
        var move = {}
        move.index = newBoard[availableCells[i]];
        newBoard[availableCells[i]] = player;

        if (player == computer) {
            var result = minimax(newBoard,human);
            move.score = result.score;
        } else {
            var result = minimax(newBoard,computer);
            move.score = result.score;
        }

        newBoard[availableCells[i]] = move.index;
        moves.push(move);
    }

    return moves;
}


function getBestMove(moves, player) {
    var bestMove;
    if (player == computer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function emptyCells(board){
    return board.filter(cell => cell != human && cell != computer);
}

function reset(){
    board = [0,1,2,3,4,5,6,7,8]; 
    currentPlayer = human;
}

function checkTie() {
    if (emptyCells(board).length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie game!")
        return true;
    } 
    return false;
}

function declareWinner(who) {
    console.log(who);
}

function gameOver(tie) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(currentPlayer == human ? "You win!" : "You lose.")
}