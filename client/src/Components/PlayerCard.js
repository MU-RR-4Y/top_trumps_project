import React from "react";

const PlayerCard = ({player}) => {

    const selectedCard =player[0]
    const length = player.length

    console.log(player[0]);
    
    return ( 
        <>
        {length>1 ?
        <>
            <h1>player card</h1>
            <p> Name: {selectedCard.name} </p>
            <p> Diet: {selectedCard.diet} </p>
        </>   
            
            
            :
            <>
            null
          </>  
        }
        </>
    );
}
 
export default PlayerCard;