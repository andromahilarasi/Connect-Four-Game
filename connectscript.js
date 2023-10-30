var playerGreen = "G";
var playerCoral = "C";
var currPlayer = playerGreen;
var gameOver = false;
var box;
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function(){
        setGame();
}
 function setGame() {
    box =[];
    currColumns = [5,5,5,5,5,5,5];
    for (let r=0; r<rows; r++){
        let row=[];
        for(let c=0; c<columns; c++){
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        box.push(row);
    }
 }

function setPiece(){
    if(gameOver){
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if(r<0){
        return;
    }

    box[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() +"-" +c.toString());
    if(currPlayer == playerGreen)
    {
        tile.classList.add("green-piece");
        currPlayer = playerCoral;
    }
    else{
        tile.classList.add("coral-piece");
        currPlayer = playerGreen;
    }

    r -= 1;
    currColumns[c] = r;

    checkWinner();
 }

function checkWinner()
{
    //horizontally
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns-3; c++)
        {
            if (box[r][c]!=' ')
            {
                if (box[r][c] == box[r][c+1] && box[r][c+1] == box[r][c+2] && box[r][c+2] == box[r][c+3])
                {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }


    for(let c=0; c <columns; c++){
        for(let r=0; r <rows-3; r++){
            if(box[r][c]!=' '){
                if(box[r][c] == box[r+1][c] && box[r+1][c] == box[r+2][c] && box[r+2][c] == box[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }


    for(let r=0; r<rows - 3; r++){
        for(let c=0; c<columns - 3; c++){
            if(box[r][c]!=' '){
                if(box[r][c] == box[r+1][c+1] && box[r+1][c+1] == box[r+2][c+2] && box[r+2][c+2] == box[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    for(let r=3; r<rows; r++){
        for(let c=0; c<columns - 3; c++){
            if(box[r][c]!=' '){
                if(box[r][c] == box[r-1][c+1] && box[r-1][c+1] == box[r-2][c+2] && box[r-2][c+2] == box[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function setWinner(r,c){
    let winner = document.getElementById("winner");
    if(box[r][c] = playerGreen) {
        winner.innerText = "Green Wins";
    }
    else{
        winner.innerText = "Coral Wins"
    }
    gameOver = true;
}
