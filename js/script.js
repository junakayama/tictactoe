var board = [0,1,2,3,4,5,6,7,8]; 
var round = 0;
var round = 0;
var iter = 0;
var currentPlayer;
var computer = "x"
var humanP = "o"



const cells = document.querySelectorAll('.cell');
startGame();

function startGame () {
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    };
}

function turnClick(square) {
    console.log(square.target.id);
}

function setPosition(position,player){
    if(player == currentPlayer && board[position] == position){
        board[position] = currentPlayer;
        checkWinner(board,currentPlayer);
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
        //lose
        return false;
    }
}

function nextPlayer(){
    if(currentPlayer == human){
        currentPlayer = computer;
    }else{
        currentPlayer = human;
    }
}

function minmax(board){

    var move = {};

    //insira logica aqui ;)
    if(checkWinner(board,computer)){
     //VALUE +1   
    }
    if(checkWinner(board,humanP)){
    //VALUE -1   
    }
    if(!checkWinner(board,computer)&&!checkWinner(board,human)){
    // value 0
    }
}

function emptyCells(board){
    return board.filter(cell => cell != human && cell != computer);
}

function reset(){
    board = [0,1,2,3,4,5,6,7,8]; 
    round = 0;
    currentPlayer = null;
}