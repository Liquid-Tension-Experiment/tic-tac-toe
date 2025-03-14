
const guiHandler = (function () {
    let tilesData = [];
    let players = [];

    const tilesImages = document.querySelectorAll(".tile");
    const winnerText = document.querySelector(".winner-text");

    function populateTilesData(arr){
       tilesData = arr;
    }
    function populatePlayers(arr){
        players = arr;
    }
    function winnerTextOn(name, status){
        if (status == 'win'){
            winnerText.textContent = `${name} wins!`;
        }else {
            winnerText.textContent = "It's a draw!";
        }
    }
    function winnerTextOff(){
        winnerText.textContent = '';
    }
    function playOn(){
        winnerText.textContent = 'Make your move';
    }
    function updateDisplay(){
        for (let i=0; i<9; i++){
            tilesImages[i].textContent = tilesData[i].getCurrentMarker();

            if(tilesImages[i].textContent == '_'){
                tilesImages[i].textContent = ' ';
            } 
        }
    }

    return {playOn, populatePlayers, populateTilesData, updateDisplay, winnerTextOn, winnerTextOff}
})();

const gameBoard = (function () {    
    const tilesArray = [];
    for (let i=0; i<9; i++){
        tilesArray.push(createTile());
    }
    guiHandler.populateTilesData(tilesArray);
    
    function createTile () {
        let currentMarker = "_";
        const getCurrentMarker = () => currentMarker;
        const setCurrentMarker = (newMarker) => (currentMarker = newMarker);
        
        return { getCurrentMarker, setCurrentMarker};
    }

    const isValidMove = (position) => {
        return tilesArray[position].getCurrentMarker() == '_' ? true : false;
    }

    const resetBoard = () => {
        for (const tile of tilesArray){
            tile.setCurrentMarker('_');
        }
        guiHandler.updateDisplay();
    }

    const printBoard = () => {
        for(let i=0; i<3; i++){
            let temp=i.toString()+"| ";
            for(let j=0; j<3; j++){
                temp += tilesArray[i*3+j].getCurrentMarker().toString()+" ";
            }
            temp += "\n";
            console.log(temp);
        }
    }

    const getTile = (pos) => tilesArray[pos];

    const checkForWin = function () {
        // check rows
        if (tilesArray[0].getCurrentMarker()!=='_'&&tilesArray[0].getCurrentMarker()===tilesArray[1].getCurrentMarker()&&tilesArray[1].getCurrentMarker()===tilesArray[2].getCurrentMarker()){
            return tilesArray[0].getCurrentMarker();
        }
        if (tilesArray[3].getCurrentMarker()!=='_'&&tilesArray[3].getCurrentMarker()===tilesArray[4].getCurrentMarker()&&tilesArray[4].getCurrentMarker()===tilesArray[5].getCurrentMarker()){
            return tilesArray[3].getCurrentMarker();
        }
        if (tilesArray[6].getCurrentMarker()!=='_'&&tilesArray[6].getCurrentMarker()===tilesArray[7].getCurrentMarker()&&tilesArray[7].getCurrentMarker()===tilesArray[8].getCurrentMarker()){
            return tilesArray[6].getCurrentMarker();
        }

        // check columns
        if (tilesArray[0].getCurrentMarker()!=='_'&&tilesArray[0].getCurrentMarker()===tilesArray[3].getCurrentMarker()&&tilesArray[3].getCurrentMarker()===tilesArray[6].getCurrentMarker()){
            return tilesArray[0].getCurrentMarker();
        }
        if (tilesArray[1].getCurrentMarker()!=='_'&&tilesArray[1].getCurrentMarker()===tilesArray[4].getCurrentMarker()&&tilesArray[4].getCurrentMarker()===tilesArray[7].getCurrentMarker()){
            return tilesArray[1].getCurrentMarker();
        }
        if (tilesArray[2].getCurrentMarker()!=='_'&&tilesArray[2].getCurrentMarker()===tilesArray[5].getCurrentMarker()&&tilesArray[5].getCurrentMarker()===tilesArray[8].getCurrentMarker()){
            return tilesArray[2].getCurrentMarker();
        }

        // check diagonals
        if (tilesArray[0].getCurrentMarker()!=='_'&&tilesArray[0].getCurrentMarker()===tilesArray[4].getCurrentMarker()&&tilesArray[4].getCurrentMarker()===tilesArray[8].getCurrentMarker()){
            return tilesArray[0].getCurrentMarker();
        }
        if (tilesArray[2].getCurrentMarker()!=='_'&&tilesArray[2].getCurrentMarker()===tilesArray[4].getCurrentMarker()&&tilesArray[4].getCurrentMarker()===tilesArray[6].getCurrentMarker()){
            return tilesArray[2].getCurrentMarker();
        }
    }
    return { getTile, checkForWin, resetBoard, isValidMove, printBoard}
})();

const gameEngine = (function () {
    document.querySelector(".board").addEventListener("click", boardClick);
    // create players
    const playersArray = [];
    let turn = 0;
    let turnsPlayed = 0;
    let gameState = 'over';
    
    document.querySelector("#btn-reset").onclick = resetGame;

    document.querySelector("#btn-start").addEventListener("click", startGame);
    function startGame(){
        if (gameState == 'play'){
            return;
        }
        guiHandler.playOn();
        gameBoard.resetBoard();
        gameState = 'play';
        if (playersArray.length == 0){
            let nameInputOne = document.querySelector("#player-one-name").value;
            let nameInputTwo = document.querySelector('#player-two-name').value;
            nameInputOne = nameInputOne == '' ? 'Player One' : nameInputOne;
            nameInputTwo = nameInputTwo == '' ? 'Player Two' : nameInputTwo;

            playersArray.push(createPlayer(nameInputOne, 'X'));
            playersArray.push(createPlayer(nameInputTwo, 'O'));
        }

        turnsPlayed = 0;
        turn = 0;
    }
    // reset game
    function resetGame() {
        guiHandler.winnerTextOff();
        turnsPlayed = 0;
        turn = 0;
        gameBoard.resetBoard();
        gamestate = 'over';
        playersArray.length = 0;
        document.querySelector('#player-one-name').value = '';
        document.querySelector('#player-two-name').value = '';
    }

    function boardClick(e) {
        let index = parseInt(e.target.id.split('-')[1]);
        makeMove(index);      
    }

    function makeMove(pos){
        if (gameState != 'play'){
            return;
        }
        if(!gameBoard.isValidMove(pos)){
            console.log('Invalid move');
            return;
        }

        if (turn==0){
            currentPlayer = playersArray[0];
        }else {
            currentPlayer = playersArray[1];
        }
        turn = (turn + 1)%2;
        turnsPlayed++;

        gameBoard.getTile(pos).setCurrentMarker(currentPlayer.getPiece());
        guiHandler.updateDisplay();

        let result = gameBoard.checkForWin();
        if(result != null){
            guiHandler.winnerTextOn(currentPlayer.name, 'win');
            gameState = 'over';
        }

        if(turnsPlayed == 9){
            guiHandler.winnerTextOn('nobody', 'draw');
            gameState = 'over';
        }

    }

    return {playersArray, resetGame, makeMove}
})();

function createPlayer(name = "", piece) {
    let score = 0;
    const getPiece = () => piece;
    const incrementScore = () => score++;
    const getScore = () => score;
    return { name, getScore, incrementScore, getPiece};
}

