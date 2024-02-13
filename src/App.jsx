import {useState} from 'react'

import GameBoard from './components/GameBoard.jsx';
import Player from './components/Player.jsx';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';

const inititalGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]];

function deriveActivePlayer(gameTurns){
  let currentplayer='X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){currentplayer="O";}
return currentplayer;
}

function App() {

  const [player,setPlayer]=useState({
    X:'Player 1',
    O: 'Player 2',
  });
  const [gameTurns,setGameTurns]=useState([ ])
  //const [activePlayer,setActivePlayer]=useState('X');
  let gameBoard= [...inititalGameBoard.map(array=>[...array])];
    for(const turn of gameTurns){
        const { square,player}=turn;
        const {row,col}=square;

        gameBoard[row][col]=player;
    }
let winner=null;
    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
      const doublSquareSymbol=gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]
      if(firstSquareSymbol && 
        firstSquareSymbol===doublSquareSymbol &&
        firstSquareSymbol===thirdSquareSymbol ){
          winner=player[firstSquareSymbol];
        }
    }
    const hasdraw =gameTurns.length===9 && !winner;

  const activePlayer=deriveActivePlayer(gameTurns);
  function handleSelectSquare(rowIndex,colIndex){
    //setActivePlayer((currActivePlayer)=>currActivePlayer==='X'?'O':'X');
    setGameTurns(prevTurns=>{
      const currentplayer=deriveActivePlayer(prevTurns);  
      
      const updatedTurns=[{square:{row:rowIndex,col:colIndex
      },player:currentplayer},...prevTurns];
      return updatedTurns;
    });
  }
  
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayer(prevPlayer=>{
      return {
        ...prevPlayer,
        [symbol]:newName};
      });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'} onChnageName={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O"isActive={activePlayer==='O'}onChnageName={handlePlayerNameChange}/>

        </ol>
        {(winner || hasdraw )&& <GameOver winner={winner} onRestart={handleRestart}/> }
       <GameBoard onSelectSquare={handleSelectSquare} 
       board={gameBoard}
       />
      </div>
      <Log turns={gameTurns}/>
      
    </main>
  );
}

export default App
