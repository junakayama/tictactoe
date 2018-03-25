var boardStatus = [0,1,2,3,4,5,6,7,8]; 
var round = 0;
var currentPlayer;

function setPosition(position,player){
    if(player == currentPlayer && boardStatus[position] == position){
        boardStatus[position] = currentPlayer
        checkWinner(boardStatus)
    }
}

function checkWinner(boardStatus){
    if ((board[0] == currentPlayer && board[1] == currentPlayer && board[2] == currentPlayer) ||
        (board[3] == currentPlayer && board[4] == currentPlayer && board[5] == currentPlayer) ||
        (board[6] == currentPlayer && board[7] == currentPlayer && board[8] == currentPlayer) ||
        (board[0] == currentPlayer && board[3] == currentPlayer && board[6] == currentPlayer) ||
        (board[1] == currentPlayer && board[4] == currentPlayer && board[7] == currentPlayer) ||
        (board[2] == currentPlayer && board[5] == currentPlayer && board[8] == currentPlayer) ||
        (board[0] == currentPlayer && board[4] == currentPlayer && board[8] == currentPlayer) ||
        (board[2] == currentPlayer && board[4] == currentPlayer && board[6] == currentPlayer)){
        //win
        reset()
    }else if(round>8){
        //empate
        reset()
    }else{
        nextPlayer()    
    }
}

function nextPlayer(){
    if(currentPlayer == "player"){
        currentPlayer = "pc"
    }else{
        currentPlayer = "player"
    }
}

function minmax(){
    //insira logica aqui ;)
}

function reset(){
    boardStatus = [0,1,2,3,4,5,6,7,8]; 
    round = 0;
    currentPlayer = null;
}