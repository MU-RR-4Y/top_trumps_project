import React, {useState, useEffect} from "react";
import PlayerCard from "../Components/PlayerCard";
import ComputerCard from "../Components/ComputerCard";


const GameContainer = () => {


    return (
        <>
        <p> Game Container! </p>
        <PlayerCard/>
        <ComputerCard/>
        </>
    )
};

export default GameContainer; 