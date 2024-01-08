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
    const winningSets = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const setX = [];
    const setO = [];
    
    const setBoard = (function () {
        for(let i=0;i<9;i++) {
            let tile=document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add('empty');
            tile.innerText = tiles[i];
            tile.id = '' + (i);
            boardDiv.appendChild(tile);
        }
    })();
    const tileClick = (function () 
    {
        const tileList = document.querySelectorAll('.tile');
        for(let i=0;i<tileList.length;i++) {
            tileList[i].addEventListener('click', (e) => {
                if(tileList[i].classList.contains('empty'))
                {
                    tileList[i].classList.remove('empty');
                    if(user.getMarker()) 
                    {
                        tiles[parseInt(tileList[i].id)] = 'X';
                        updateBoard();
                        addToSet(setX,parseInt(tileList[i].id));
                        checkWin(setX);
                    }
                    else 
                    {
                        tiles[parseInt(tileList[i].id)] = 'O';
                        updateBoard();
                        addToSet(setO,parseInt(tileList[i].id));
                        checkWin(setO);
                    }
                    if(!vsAI) user.swapMarker();
                    //console.log(e.target);
                    //console.log(vsAI);
                    if(vsAI)
                    {
                        let arr = getEmptyTiles();
                        let index = arr[Math.floor(Math.random()*(arr.length-1))];
                        switch(user.getMarker())
                        {
                            case true: 
                                tiles[index] = 'O';
                                updateBoard();
                                addToSet(setO,index);
                                checkWin(setO);
                                break;
                            case false: 
                                tiles[index] = 'X';
                                updateBoard();
                                addToSet(setX,index);
                                checkWin(setX);
                                break;
                        }
                        tileList[index].classList.remove('empty');
                        //console.log(tiles,arr);
                        //console.log(index);
                    }
                    //console.log(setX,setO);
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
                const tileList = document.querySelectorAll('.tile.empty');
                for(let i=0;i<tileList.length;i++) 
                {
                    tileList[i].classList.remove('empty');
                }
                endGame();
            }
        }
    }
    function getEmptyTiles() 
    {
        let arr = [];
        for(let i=0; i<tiles.length;i++) 
            if(tiles[i]=='') arr.push(i);
        return arr;
    }
    function updateBoard() 
    {
        const tileList = document.querySelectorAll('.tile');
        for(let i=0;i<tileList.length;i++)
        {
            tileList[i].innerText = tiles[i];
        }
    }
    function addToSet(arr,val)
    {
        arr.push(val);
        arr.sort((a,b) => (a-b));
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

function addBoard() 
{
    const board = document.createElement('div');
    board.classList.add('board');
    board.id='board';

    const container = document.querySelector('.container');
    container.appendChild(board);
}

function endGame() 
{
    const container = document.querySelector('.container');
    const modal = document.createElement('dialog');
    modal.classList.add('modal');

    const mHeader = document.createElement('h3');
    mHeader.innerText = 'Game Over!';
    modal.appendChild(mHeader);

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-container');

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Return to Menu';
    resetButton.addEventListener('click', () => {
        const container = document.querySelector('.container');
        const delModal = document.querySelector('.modal');
        container.removeChild(delModal);
        const nodes = container.childNodes;
        console.log(nodes);
        for(let i=0;i<nodes.length;i++)
        {
            console.log(i);
            container.removeChild(nodes[i]);
        }
        startMenu();
    });
    modalDiv.appendChild(resetButton);

    const contButton = document.createElement('button');
    contButton.innerText = 'Continue Playing';
    contButton.addEventListener('click', () => {

    });
    modalDiv.appendChild(contButton);

    modal.appendChild(modalDiv);
    container.appendChild(modal);
    modal.showModal();
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

function startMenu() {
    const container = document.querySelector('.container');
    const menu = document.createElement('div');
    menu.classList.add('selection');

    const menuHeader = document.createElement('h3');
    menuHeader.innerText = 'Select your opponent';
    menu.appendChild(menuHeader);

    const selectButton = document.createElement('button');
    selectButton.classList.add("select");
    selectButton.id = 'player';
    selectButton.innerText = 'Player';
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
    menu.appendChild(selectButton);

    const startButton = document.createElement('button');
    startButton.classList.add('start');
    startButton.innerText = 'Start Game!';
    startButton.addEventListener('click', () => {
        clearStart();
        if(selectButton.id == 'computer') 
        {
            vsAI = 1;
        }
        else
        {
            vsAI = 0;
        }
        addBoard();
        reset();
    });
    menu.appendChild(startButton);  
    container.appendChild(menu);
};
startMenu();
const user = createPlayer('john');
var vsAI = 0;