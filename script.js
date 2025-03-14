document.querySelector("#btn-start").onclick = () => console.log('test');

const gameEngine = (function () {
    // create players
    const playersArray = [];
    playersArray.push(createPlayer('Joey', 'X'));
    playersArray.push(createPlayer('Maitlyn', 'O'));

    
    
    // gameplay loop
    const playGame = function () {

    }
    gameBoard.resetBoard();


})();

const gameBoard = (function () {
    const tilesArray = [];
    for (let i=0; i<9; i++){
        tilesArray.push(createTile());
    }

    const createTile = function () {
        let currentMarker = "";
        const getCurrentMarker = () => currentMarker;
        const setCurrentMarker = (newMarker) => currentMarker = newMarker;
        
        return { getPosition, getCurrentMarker, setCurrentMarker};
    }

    const isValidMove = (position) => {
        return tilesArray[0].getCurrentMarker == '' ? true : false;
    }

    const resetBoard = () => {
        for (const tile in tilesArray){
            tile.setCurrentMarker('');
        }
    }

    const checkForWin = function () {
        // check rows
        if (tilesArray[0].getCurrentMarker()!==''&&tilesArray[0].getCurrentMarker()===tilesArray[1].getCurrentMarker()&&tilesArray[1].getCurrentMarker()===tilesArray[2].getCurrentMarker()){
            return tilesArray[0].getCurrentMarker();
        }
        if (tilesArray[3].getCurrentMarker()!==''&&tilesArray[3].getCurrentMarker()===tilesArray[4].getCurrentMarker()&&tilesArray[4].getCurrentMarker()===tilesArray[5].getCurrentMarker()){
            return tilesArray[3].getCurrentMarker();
        }
        if (tilesArray[6].getCurrentMarker()!==''&&tilesArray[6].getCurrentMarker()===tilesArray[7].getCurrentMarker()&&tilesArray[7].getCurrentMarker()===tilesArray[8].getCurrentMarker()){
            return tilesArray[6].getCurrentMarker();
        }

        // check columns
        if (tilesArray[0].getCurrentMarker()!==''&&tilesArray[0].getCurrentMarker()===tilesArray[3].getCurrentMarker()&&tilesArray[3].getCurrentMarker()===tilesArray[6].getCurrentMarker()){
            return tilesArray[0].getCurrentMarker();
        }
        if (tilesArray[1].getCurrentMarker()!==''&&tilesArray[1].getCurrentMarker()===tilesArray[4].getCurrentMarker()&&tilesArray[4].getCurrentMarker()===tilesArray[7].getCurrentMarker()){
            return tilesArray[1].getCurrentMarker();
        }
        if (tilesArray[2].getCurrentMarker()!==''&&tilesArray[2].getCurrentMarker()===tilesArray[5].getCurrentMarker()&&tilesArray[5].getCurrentMarker()===tilesArray[8].getCurrentMarker()){
            return tilesArray[2].getCurrentMarker();
        }

        // check diagonals
        if (tilesArray[0].getCurrentMarker()!==''&&tilesArray[0].getCurrentMarker()===tilesArray[4].getCurrentMarker()&&tilesArray[4].getCurrentMarker()===tilesArray[8].getCurrentMarker()){
            return tilesArray[0].getCurrentMarker();
        }
        if (tilesArray[2].getCurrentMarker()!==''&&tilesArray[2].getCurrentMarker()===tilesArray[4].getCurrentMarker()&&tilesArray[4].getCurrentMarker()===tilesArray[6].getCurrentMarker()){
            return tilesArray[2].getCurrentMarker();
        }

    }
})();

function createPlayer(name = "", piece) {
    let score = 0;
    let piece = piece;

    const getPiece = () => piece;
    const incrementScore = () => score++;
    const getScore = () => score;
    return { name, getScore, incrementScore, getPiece};
}

