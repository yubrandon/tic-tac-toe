function createPlayer(name) {
    let playerName = name;
    let score = 0;
    let marker = true;
    const getName = () => playerName;
    const getScore = () => score;
    const raiseScore = () => score++;
    const resetScore = () => score=0;
    const getMarker = () => marker;
    const swapMarker = () => marker = !marker;

    return {getName,getScore,raiseScore,resetScore,getMarker,swapMarker};
};

const board = (function () {
    const boardDiv = document.querySelector('.board');
    const tiles = ['','','','','','','','',''];
    const winningSets = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    const setX = [];
    const setO = [];
    
    const setBoard = (function () {
        for(let i=0;i<9;i++) {
            let tile=document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add('empty');
            tile.innerText = tiles[i];
            tile.id = '' + (i+1);
            boardDiv.appendChild(tile);
        }
    })();
    const tileClick = (function () 
    {
        const tiles = document.querySelectorAll('.tile');
        for(let i=0;i<tiles.length;i++) {
            tiles[i].addEventListener('click', (e) => {
                if(tiles[i].classList.contains('empty'))
                {
                    tiles[i].classList.remove('empty');
                    if(user.getMarker()) 
                    {
                        tiles[i].innerText = 'X';
                        setX.push(parseInt(tiles[i].id));
                        setX.sort((a,b) => (a-b));
                        checkWin(setX);
                        user.swapMarker();
                    }
                    else 
                    {
                        tiles[i].innerText = 'O';
                        setO.push(parseInt(tiles[i].id));
                        setO.sort((a,b) => (a-b));
                        checkWin(setO);
                        user.swapMarker();
                    }
                    //console.log(e.target);
                }
            })
        }
    })();

    function checkWin (arr) 
    {
        for(let i=0;i<winningSets.length;i++)
        {
            let win = true;
            for(let j=0;j<winningSets[i].length;j++) {
                if(!arr.includes(winningSets[i][j])) win = false;
            }
            if(win == true)
            {
                console.log('win');
                const tiles = document.querySelectorAll('.tile.empty');
                for(let i=0;i<tiles.length;i++) 
                {
                    tiles[i].classList.remove('empty');
                }
                reset();
                return;
            }
        }
    }
})

function reset() {
    const items = document.querySelector('.board');
    if(items.hasChildNodes())
    {
        let del = document.querySelectorAll('.board > div');
        for(let i=0;i<del.length;i++)
        {
            items.removeChild(del[i]);
        }
    }
    board();
}

function addBoard() {
    const board = document.createElement('div');
    board.classList.add('board');
    board.id='board';

    const container = document.querySelector('.container');
    container.appendChild(board);
}

function clearStart() 
{
    const container = document.querySelector('.container');
    const items = document.querySelectorAll('.container > div');
    if(container.hasChildNodes())
    {
        for(let i=0;i<items.length;i++)
        {
            container.removeChild(items[i]);
        }
    }
}

(function startMenu() {
    const selectButton = document.querySelector('.select');
    selectButton.addEventListener('click',() => {
        if(selectButton.id == 'player')
        {
            selectButton.id = 'computer';
            selectButton.innerText = 'Computer';
            selectButton.style.backgroundColor = 'lightcoral';
        }
        else 
        {
            selectButton.id = 'player';
            selectButton.innerText = 'Player';
            selectButton.style.backgroundColor = 'lightgreen';
        }
    });
    const startButton = document.querySelector('.start');
    startButton.addEventListener('click', () => {
        clearStart();
        if(selectButton.id == 'computer') 
        {
            vsAI = 1;
        }
        else
        {
            
        }
        addBoard();
        reset();
    });
})();

const user = createPlayer('john');
var vsAI = 0;