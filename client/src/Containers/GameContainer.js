import React, {useState, useEffect} from "react";
import PlayerCard from "../Components/PlayerCard";
import ComputerCard from "../Components/ComputerCard";
import { getDinosaurs } from "../Services/GameService";


const GameContainer = () => {

    const [player,SetPlayer] = useState([]);
    const [cpu,SetCPU] = useState([]);
    const [middle,SetMiddle] = useState([]);

    useEffect(() => {
        getDinosaurs()
        .then((data) => {
            const playerHand = data
            const cpuHand = playerHand.splice(0,15)
            SetPlayer(playerHand)
            SetCPU(cpuHand)
        })

    },[]);


    


    return (
        <>
        <p> Game Container! </p>
        <PlayerCard/>
        <ComputerCard/>
        </>
    )
};

export default GameContainer; 