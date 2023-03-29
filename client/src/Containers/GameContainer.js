import React, { useState, useEffect, useRef } from "react";
import PlayerCard from "../Components/PlayerCard";
import ComputerCard from "../Components/ComputerCard";
import { getDinosaurs } from "../Services/GameService";
import sound from "../Audio/Jurassic_Park_Theme_Song.mp3";
import "./GameContainer.css";
import "./AudioControl.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GameContainer = ({ playerName }) => {

    const [player, setPlayer] = useState([]);
    const [cpu, setCPU] = useState([]);
    const [middle, setMiddle] = useState([]);
    const [result, setResult] = useState(null);
    const [gameUpdate, setGameUpdate] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [flipActive, setFlipActive] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [audioOn, setaudioOn] = useState(true);
    const [playerGameWin, setPlayerGameWin] = useState(false);
    const [cpuGameWin, setCPUGameWin] = useState(false);

    const shuffle = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    };

    const audioElement = useRef(new Audio(sound))



    useEffect(() => {
        audioElement.current.volume = "0.1"
        audioElement.current.loop = "true"
        audioOn ? audioElement.current.play() : audioElement.current.pause()

    }, [audioOn, []]);

    const togglePlay = () => {
        setaudioOn(!audioOn)
    }

    //Check score for win condition
    const checkScore=()=>{
       if(player.length >19){
        setPlayerGameWin(true)
       } 
       if(cpu.length>19) {setCPUGameWin(true)}
    }
       
    //handleCardFlip

    const handleCardFlip = () => {
        setFlipActive(!flipActive);

    }

    // add exisiting index 0 cards to middle deck  
    const middleDeck = () => {
        console.log(middle.len)
        const mid = [...middle];
        console.log(mid.len)
        mid.push(player[0]);
        mid.push(cpu[0]);
        console.log(mid.len)
        setMiddle(mid);
    };

    const playerWin = () => {
        handleCardFlip()
        setTimeout(() => {
            const newPlayer = [...player];
            const playerWin = newPlayer.concat(middle);
            playerWin.shift();  // remove index [0] of playerhand
            const newCPU = [...cpu];
            newCPU.shift(); // remove index [0] of cpuhand
            setPlayer(playerWin);
            setCPU(newCPU);
            setClicked(false);
        }, 800);
        setMiddle([]);
    };

    const cpuWin = () => {
        handleCardFlip()
        setTimeout(() => {
            const newCPU = [...cpu];
            const cpuWin = newCPU.concat(middle);
            cpuWin.shift(); // remove index [0] of cpuhand
            const newPlayer = [...player];
            newPlayer.shift(); // remove index [0] of playerhand
            setCPU(cpuWin);
            setPlayer(newPlayer);
            setClicked(false);
        }, 800);
        setMiddle([]);
    };

    const draw = () => {
        handleCardFlip()
        setTimeout(() => {
            const newCPU = [...cpu];
            newCPU.shift();
            setCPU(newCPU);
            const newPlayer = [...player];
            newPlayer.shift();
            setPlayer(newPlayer);
        }, 800);
        setClicked(false);
    }

    //resolve game function
    const resolveGame = (result) => {
        if (result === 'player') {
            setResultMessage('Player wins!!');
            testToastify(`${playerName} wins the hand`);
            playerWin();
        } else if (result === 'cpu') {
            setResultMessage('CPU wins!!!');
            testToastify('CPU wins the hand');
            cpuWin();
        } else if (result === 'draw') {
            setResultMessage('Draw');
            testToastify("It's a draw");
            draw();
        }
        setResult('')
     }

    //Comparison function
    const compareAttribute = (attribute) => {
        middleDeck();
        const key = (attribute);
        if (player[0][key] > cpu[0][key]) {
            setResult('player')
            setGameUpdate(!gameUpdate)
        } else if (cpu[0][key] > player[0][key]) {
            setResult('cpu')
            setGameUpdate(!gameUpdate)
        } else {
            setResult('draw')
            setGameUpdate(!gameUpdate)
        }
    };

    const testToastify = (message) => {
        toast.success(message, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    //reset game function

    const resetGame =()=>{
        getDinosaurs()
        .then((data) => {
            const playerHand = data;
            shuffle(playerHand);
            const cpuHand = playerHand.splice(0, 15);
            setPlayer(playerHand);
            setCPU(cpuHand);
        });
        setMiddle([]);
        setResult(null);
        setGameUpdate(false);
        setResultMessage('');
        setFlipActive(false);
        setClicked(false);
        setaudioOn(true);
        setPlayerGameWin(false);
        setCPUGameWin(false);
        }

   

    //initial fectch request
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

    // execute game functionality once result and game update have been set in compare function 
    useEffect(() => {
        resolveGame(result);
    }, [gameUpdate]);

    useEffect(()=>{
        checkScore()
    },player)

   
  
    if (!player.length || !cpu.length) {return null;}
    else if (playerGameWin){
        return(
            <div className='winMessage'>
                <div>
                <h1>{`${playerName} wins the game!!`}</h1>
                <button onClick={resetGame}>Play Again</button>
                </div>
            </div>
        )
    }
    else if (cpuGameWin){
        return(
            <div className='winMessage'>
                <div>
                <h1>CPU wins the game!!</h1>
                <button onClick={resetGame}>Play Again</button>
                </div>
            </div>
        )
    }


    else{

    return (
        <>
            <div className="cards-display">
                <div className="player-card">
                    <div className="player-name">
                        <p>{playerName}</p>
                    </div>
                    <PlayerCard player={player} compareAttribute={compareAttribute} handleCardFlip={handleCardFlip} clicked={clicked} setClicked={setClicked} />
                    <div className="cards-remaining">
                        <p>{player.length} cards remaining</p>
                    </div>
                </div>
                <div className="middle-panel">
                    <div className="testAudio">
                        {audioOn ?
                            <button onClick={togglePlay}>▐▐</button>
                            :
                            <button onClick={togglePlay}>▶</button>
                        }
                    </div>
                    <div className="draw-pile">
                        <p>DRAW PILE: {middle.length}</p>
                    </div>
                </div>
                <div className="cpu-card">
                    <div className="player-name">
                        <p>Computer</p>
                    </div>
                    <ComputerCard cpu={cpu} flipActive={flipActive} />
                    <div className="cards-remaining">
                        <p>{cpu.length} cards remaining</p>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}




};



export default GameContainer; 