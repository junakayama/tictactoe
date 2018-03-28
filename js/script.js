var board = [0,1,2,3,4,5,6,7,8]; 
var round = 0;
var round = 0;
var iter = 0;
var currentPlayer;
var computer = "x"
var humanP = "o"

var cell = document.getElementsByClassName("cell")
for (let index = 0; index < cell.length; index++) {
    cell[index].addEventListener("click",test,false);
}

function test(){
    console.log("click");
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