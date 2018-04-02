var board = [0,1,2,3,4,5,6,7,8]; 
var computer = "x"
var human = "o"
var currentPlayer = human;
var iter = 0;


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
    var validMove = turn(cell.target.id,currentPlayer);
    if(!checkTie() && validMove) turn(alphaBetaPruning(board, currentPlayer, -Infinity, +Infinity).index, currentPlayer);
    console.log(board);
    console.log("número de iterações:"+iter);
}

function turn(position,player){
    if(player==currentPlayer && board[position]==position){
        board[position] = player;
        cells[position].innerHTML = player
        if (checkWinner(board, player)){
            gameOver();
        } else {
            nextPlayer();
        }
        return true;
    }
    return false;
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

function alphaBetaPruning(newBoard, player, alpha, beta) {
    iter++;
    var availableCells = emptyCells(newBoard);

    if (checkWinner(newBoard, human)) {
        return {score:-1, alpha:-1, beta:-1};
    } else if (checkWinner(newBoard, computer)) {
        return {score:1, alpha:1, beta:1};
    } else if (availableCells.length === 0) {
        return {score: 0, alpha:0, beta:0};
    }

    var moves = [];
    for (var i = 0; i < availableCells.length; i++) {
        var move = {}
        move.index = newBoard[availableCells[i]];
        newBoard[availableCells[i]] = player;

        if (player == computer) {
            var result = alphaBetaPruning(newBoard, human, alpha, beta);
            move.score = result.score;
            if(move.score > alpha) {
                alpha = move.score;
            }
            if (alpha >= beta) break;
        } else {
            var result = alphaBetaPruning(newBoard, computer, alpha, beta);
            move.score = result.score;
            if(move.score > beta) {
                beta = move.score;
            }
            if (alpha >= beta) break;
        }

        newBoard[availableCells[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player == computer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

function emptyCells(board){
    return board.filter(cell => cell != human && cell != computer);
}

function reset(){
    iter = 0;
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

function declareWinner(who) {
    console.log(who);
    openModal();
}

function gameOver(tie) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(currentPlayer == human ? "You win!" : "You lose.")
}

var modal = document.getElementById('myModal');
var textModal = document.getElementById('textModal');
var span = document.getElementsByClassName("close")[0];

function declareWinner(who) {
    console.log(who);
    textModal.innerText = who;
    openModal();
}

function openModal() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}