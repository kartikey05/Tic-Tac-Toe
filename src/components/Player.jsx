import { useState } from 'react';  
export default function Player({initialName, symbol,isActive,onChnageName}){
    const [isEditing, setIsEditing]=useState(false);
    const [playerName,setPlayerName]=useState(initialName);

    function handleEditClick(){
        setIsEditing((editing)=>!editing);
        if(isEditing){
            onChnageName(symbol,playerName);
        }
    }
    function handleChange(event){ 
        setPlayerName(event.target.value);
    }
    let editableplayerName=<span className='player-name'>{playerName}</span>;

    if(isEditing){
        editableplayerName=(
        <input type='text' required value={playerName} onChange={handleChange}  />);
    }


    return (
        <li className={isActive?'active':undefined}>
            <span className="player">
                {editableplayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
        <button onClick={handleEditClick}>{isEditing?'save':'Edit'}</button>
        </li>
    )
}