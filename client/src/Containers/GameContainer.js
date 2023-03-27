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
    const [resultMessage,SetResultMessage]= useState('')
    
    
    
    const shuffle = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    };

    //remove index 0 from each hand ---- WORKS
    const changeCards = ()=>{
        const newPlayer =[...player]
        newPlayer.splice(0,1)
        SetPlayer(newPlayer)
        const newCPU =[...cpu]
        newCPU.splice(0,1)
        SetCPU(newCPU)
        return;
    }
    
     // add exisiting index 0 cards to middle deck  ---- WORKS
     const middleDeck =()=>{
        const mid =[...middle]
        mid.push(player[0])
        mid.push(cpu[0])
        SetMiddle(mid)
       

    }
    
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
            SetResultMessage('Player wins!!')
            middleDeck()
            changeCards()
        } else if (result === 'cpu'){
            SetResultMessage('CPU wins!!!')
            middleDeck()
            changeCards()
        } else if(result === 'draw'){
            SetResultMessage('Draw')
            middleDeck()
            changeCards()

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