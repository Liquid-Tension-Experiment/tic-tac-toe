document.querySelector("#btn-start").onclick = () => console.log('test');

const gameBoard = (function () {
    const tilesArray = [];
    for (let i=0; i<9; i++){
        tilesArray.push(createTile());
    }


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

    return {getTile, checkForWin, resetBoard, isValidMove, printBoard}
})();

const gameEngine = (function () {
    // create players
    const playersArray = [];
    let turn = 0;
    let turnsPlayed = 0;
    let gameState = 'play';
    playersArray.push(createPlayer('Joey', 'X'));
    playersArray.push(createPlayer('Maitlyn', 'O'));

    
    // reset game
    const resetGame = function () {
        turnsPlayed = 0;
        turn = 0;
        gameBoard.resetBoard();
        gamestate = 'play';
    }

    function makeMove(pos){
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

        gameBoard.getTile(pos).setCurrentMarker(currentPlayer.getPiece());
        turnsPlayed++;
        let result = gameBoard.checkForWin();
        gameBoard.printBoard();

        if(result != null){
            winner(currentPlayer);
            gameState = 'over';
        }

        if(turnsPlayed == 9){
            console.log("It's a tie!");
            gameState = 'over';
        }

    }
    function winner(player){
        console.log(`${player.name} is the winner!`)
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

