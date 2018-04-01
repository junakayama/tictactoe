var board = [0,1,2,3,4,5,6,7,8]; 
var round = 0;
var iter = 0;
var computer = "x"
var humanP = "o"
var currentPlayer = humanP;


var cell = document.getElementsByClassName("cell")
for (let index = 0; index < cell.length; index++) {
    cell[index].addEventListener("click",function(){
        event.preventDefault();
        setPosition(cell[index].id,currentPlayer)
        console.log(board)
    },false);
}

function setPosition(position,player){
    if(player == currentPlayer && board[position] == position){
        board[position] = player;
        cell[position].innerHTML = player
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
        (board[2] == player && board[4] == player && board[6] == player)){
        //win
        return true;
    }else{
        return false;
    }
}

function nextPlayer(){
    if(currentPlayer == humanP){
        currentPlayer = computer;
    }else{
        currentPlayer = humanP;
    }
}

function minmax(board,player){
    iter++;

    var availableCells = emptyCells(board);

    if(checkWinner(board,computer)){
        return 1;   
    }
    if(checkWinner(board,humanP)){
        return -1;
    }
    if(!checkWinner(board,computer)&&!checkWinner(board,humanP)){
        return 0;
    }

    moves = possibleMoves(board,availableCells,player);

}


function possibleMoves(newBoard,availableCells,player){
    var moves = []
    for (let index = 0; index < availableCells.length; index++){
        var move = {
            index: null,
            score: null
        };

        move.index = newBoard[availableCells[index]];
        newBoard[availableCells[index]] = player;

        if(player == computer){
            var score = minmax(newBoard,humanP)
            move.score = score;
        }else{
            var score = minmax(newBoard,computer)
            move.score = score;
        }

        newBoard[availableCells[index]] = move.index;
        moves.push(move);
    }
    return moves;
}

function getBestMove(moves){
    var bestMove;
    searchBestMove(moves,computer);
    searchBestMove(moves,humanP);
}

function searchBestMove(moves,player){
    var bestScore = (player == computer) ? -10000 : 10000;
    for (var i = 0; i < moves.length; i++) {
        var condition = (player == computer) ? (moves[i].score > bestScore) : (moves[i].score < bestScore)
        if (condition) {
            bestScore = moves[i].score;
            bestMove = i;
        }
    }
    return bestMove;
}

function emptyCells(board){
    return board.filter(cell => cell != humanP && cell != computer);
}

function reset(){
    board = [0,1,2,3,4,5,6,7,8]; 
    round = 0;
    currentPlayer = null;
}