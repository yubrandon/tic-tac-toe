function createPlayer() {
    let score = 0;
    let marker = 'X';
    const getScore = () => score;
    const raiseScore = () => score++;
    const resetScore = () => score=0;
    const getMarker = () => marker;
    const swapMarker = () => 
    {
        if(marker=='X') marker='O';
        else marker = 'X';
    }

    return {getScore,raiseScore,resetScore,getMarker,swapMarker};
};
//Instantiate Player
const user = createPlayer();

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
                    tiles[i].innerText = user.getMarker();
                    if(user.getMarker() == 'X') 
                    {
                        setX.push(parseInt(tiles[i].id));
                        setX.sort((a,b) => (a-b));
                        checkWin(setX);
                        user.swapMarker();
                    }
                    else 
                    {
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

reset();