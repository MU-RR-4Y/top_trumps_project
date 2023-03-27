import React, {useState, useEffect} from "react";
import PlayerCard from "../Components/PlayerCard";
import ComputerCard from "../Components/ComputerCard";
import { getDinosaurs } from "../Services/GameService";
import "./GameContainer.css";
import "./AudioControl.css";


const GameContainer = () => {
    
    const [player,SetPlayer] = useState([]);
    const [cpu,SetCPU] = useState([]);
    const [middle,SetMiddle] = useState([]);
    const [result,SetResult]= useState(null);
    const [resultMessage,SetResultMessage]= useState('')
    
    
    
    const shuffle = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    };

        
    // add exisiting index 0 cards to middle deck  
     const middleDeck =()=>{
        const mid =[...middle]
        mid.push(player[0])
        mid.push(cpu[0])
        SetMiddle(mid)
    }
    
    //Comparison function
    const compareAttribute =(attribute)=>{
        middleDeck()
        const key = (attribute)
        if (player[0][key] > cpu[0][key]){
            SetResult('player')
        } else if(cpu[0][key] > player[0][key]){
            SetResult('cpu')
        } else{
            SetResult('draw')
        }
    };

    const playerWin =()=>{
        const newPlayer = [...player]
        const playerWin = newPlayer.concat(middle)
        playerWin.shift()  // remove index [0] of playerhand
        const newCPU = [...cpu]
        newCPU.shift() // remove index [0] of cpuhand
        SetPlayer(playerWin)
        SetCPU(newCPU)
        SetMiddle([])

    }

    const cpuWin =()=>{
        const newCPU = [...cpu]
        const cpuWin = newCPU.concat(middle)
        cpuWin.shift() // remove index [0] of cpuhand
        const newPlayer= [...player]
        newPlayer.shift() // remove index [0] of playerhand
        SetPlayer(cpuWin)
        SetCPU(newPlayer)
        SetMiddle([])
    }
    
    
    //resolve game
    const resolveGame = (result)=>{
        if(result === 'player'){
            SetResultMessage('Player wins!!')
            playerWin()
        } else if (result === 'cpu'){
            SetResultMessage('CPU wins!!!')
            cpuWin()
        } else if(result === 'draw'){
            SetResultMessage('Draw')
        }
        SetResult('')
    }
    
    
    useEffect(() => {
        getDinosaurs()
        .then((data) => {
            const playerHand = data
            shuffle(playerHand)
            const cpuHand = playerHand.splice(0,15)
            SetPlayer(playerHand)
            SetCPU(cpuHand)
        })
    },[]);

    useEffect(()=>{
        resolveGame(result)
    },[result])
    
    
    if (!player.length || !cpu.length) return null;



    return (
        <>
            <audio id="theme-audio"  controls controlsList="nodownload noplaybackrate">
                <source src={require("../Audio/Jurassic_Park_Theme_Song.mp3")} type="audio/mpeg"></source>
            </audio>

            
            
            <div className="cards-display">
                <PlayerCard player={player} compareAttribute={compareAttribute}/>
                <ComputerCard cpu={cpu}/>
            </div>
        </>
    );
     
};


export default GameContainer; 