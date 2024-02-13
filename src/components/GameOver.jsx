export default function GameOver({winner,onRestart}){
return <div id="game-over">
    <h2>Game Over!</h2>
    {winner && <p>{winner} WON</p>}
    {!winner && <p> it&apos;s a drwa!</p>}
    <p>
        <button onClick={onRestart}>Rematch!</button>
    </p>
</div>
}