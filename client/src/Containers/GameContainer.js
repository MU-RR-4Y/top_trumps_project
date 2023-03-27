import React, {useState, useEffect} from "react";
import PlayerCard from "../Components/PlayerCard";
import ComputerCard from "../Components/ComputerCard";
import { getDinosaurs } from "../Services/GameService";
import "./GameContainer.css";


const GameContainer = () => {
    
    const [player,SetPlayer] = useState([]);
    const [cpu,SetCPU] = useState([]);
    const [middle,SetMiddle] = useState([]);
    const [result,SetResult]= useState(null);
    
    
    
    const shuffle = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    };

    
    
    
    //Comparison function
    const compareAttribute =(attribute)=>{
        const key = (attribute)
        if (player[0][key] > cpu[0][key]){
            SetResult('player')
            
        } else if(cpu[0][key] > player[0][key]){
            SetResult('cpu')
        } else{
            SetResult('draw')
        }
    };
    
    //resolve game
    const resolveGame = (result)=>{
        if(result === 'player'){
            console.log('player wins')
        } else if (result === 'cpu'){
            console.log('cpu wins')
        } else if(result === 'draw'){
            console.log('draw')
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
            <p> Game Container! </p>
            <div className="cards-display">
                <PlayerCard player={player} compareAttribute={compareAttribute}/>
                <ComputerCard cpu={cpu}/>
            </div>
        </>
    );
     
};

export default GameContainer; 