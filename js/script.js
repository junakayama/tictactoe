var boardStatus = [0,1,2,3,4,5,6,7,8]; 
var round = 0;
var currentPlayer;
var iaPLayer = "IA"
var humanPlayer = "Human"

var cell = document.getElementsByClassName("cell")
for (let index = 0; index < cell.length; index++) {
    cell[index].addEventListener("click",test,false);
}

function test(){
    console.log("click");
}

function setPosition(position,player){
    if(player == currentPlayer && boardStatus[position] == position){
        boardStatus[position] = currentPlayer;
        checkWinner(boardStatus,currentPlayer);
    }
}

function checkWinner(boardStatus,player){
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
    if(currentPlayer == humanPlayer){
        currentPlayer = iaPLayer;
    }else{
        currentPlayer = humanPlayer;
    }
}

function minmax(board){

    var move = {};

    //insira logica aqui ;)
    if(checkWinner(board,iaPLayer)){
     //VALUE +1   
    }
    if(checkWinner(board,humanPlayer)){
    //VALUE -1   
    }
    if(!checkWinner(board,iaPLayer)&&!checkWinner(board,humanPlayer)){
    // value 0
    }
}

function emptyCells(board){
    return board.filter(cell => cell != humanPlayer && cell != iaPLayer);
}

function reset(){
    boardStatus = [0,1,2,3,4,5,6,7,8]; 
    round = 0;
    currentPlayer = null;
}