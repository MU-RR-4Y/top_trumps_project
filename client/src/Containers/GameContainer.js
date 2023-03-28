import React, { useState, useEffect } from "react";
import PlayerCard from "../Components/PlayerCard";
import ComputerCard from "../Components/ComputerCard";
import { getDinosaurs } from "../Services/GameService";
import "./GameContainer.css";
import "./AudioControl.css";

const GameContainer = () => {

    const [player, setPlayer] = useState([]);
    const [cpu, setCPU] = useState([]);
    const [middle, setMiddle] = useState([]);
    const [result, setResult] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [cpuCardVisible, setCpuCardVisible] = useState(false);

    const shuffle = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    };

    // add exisiting index 0 cards to middle deck  
    const middleDeck = () => {
        const mid = [...middle];
        mid.push(player[0]);
        mid.push(cpu[0]);
        setMiddle(mid);
    };

    //Comparison function
    const compareAttribute = (attribute) => {
        middleDeck();
        const key = (attribute);
        if (player[0][key] > cpu[0][key]) {
            setResult('player')
        } else if (cpu[0][key] > player[0][key]) {
            setResult('cpu')
        } else {
            setResult('draw')
        }
        setCpuCardVisible(true);
    };

    const playerWin = () => {
        const newPlayer = [...player];
        const playerWin = newPlayer.concat(middle);
        playerWin.shift();  // remove index [0] of playerhand
        const newCPU = [...cpu];
        newCPU.shift(); // remove index [0] of cpuhand
        setPlayer(playerWin);
        setCPU(newCPU);
        setMiddle([]);
    };

    const cpuWin = () => {
        const newCPU = [...cpu];
        const cpuWin = newCPU.concat(middle);
        cpuWin.shift(); // remove index [0] of cpuhand
        const newPlayer = [...player];
        newPlayer.shift(); // remove index [0] of playerhand
        setCPU(cpuWin);
        setPlayer(newPlayer);
        setMiddle([]);
    };

    //resolve game
    const resolveGame = (result) => {
        if (result === 'player') {
            setResultMessage('Player wins!!');
            playerWin();
        } else if (result === 'cpu') {
            setResultMessage('CPU wins!!!');
            cpuWin();
        } else if (result === 'draw') {
            setResultMessage('Draw');
        }
        setResult('')
    }

    useEffect(() => {
        getDinosaurs()
            .then((data) => {
                const playerHand = data;
                shuffle(playerHand);
                const cpuHand = playerHand.splice(0, 15);
                setPlayer(playerHand);
                setCPU(cpuHand);
            });
    }, []);

    useEffect(() => {
        resolveGame(result);
    }, [result]);

    if (!player.length || !cpu.length) return null;

    

    // // limits audio volume to 20%
    // // works if page loaded then code applied - breaks app if refreshed

    // const audio = document.getElementById("theme-audio")
    // function setVolume(){
    //     audio.volume = 0.2
    //     }
    // setVolume()
 
   


    return (
        <>
            <audio id="theme-audio" controls controlsList="nodownload noplaybackrate">
                <source src={require("../Audio/Jurassic_Park_Theme_Song.mp3")} type="audio/mpeg"></source>
               
            </audio>


            <div className="cards-display">
                <div className="player-card">
                    <div className="player-name">
                        <p>Player</p>
                    </div>
                    <PlayerCard player={player} compareAttribute={compareAttribute} />
                    <div className="cards-remaining">
                        <p>{player.length} cards remaining</p>
                    </div>
                </div>
                <div className="draw-pile">
                    <p>Draw pile has {middle.length}</p>
                </div>
                <div className="cpu-card">
                    <div className="player-name">
                        <p>Computer</p>
                    </div>
                    <ComputerCard cpu={cpu} />
                    <div className="cards-remaining">
                        <p>{cpu.length} cards remaining</p>
                    </div>
                </div>
            </div>
        </>
    );




};



export default GameContainer; 