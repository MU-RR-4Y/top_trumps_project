import React from "react";

const ComputerCard = ({cpu}) => {
    const mapArray = cpu.map((item)=>{return item})

    console.log(mapArray)

    return ( 
    <> 
    <h1>Computer Card</h1> 
    <p> {mapArray[0].name} </p>

    </>
    );
}
 
export default ComputerCard;