import React, { useState, useEffect, useRef } from "react";
import "./Cards.css";

const PlayerCard = ({ player, compareAttribute,handleCardFlip, clicked , setClicked}) => {

    const [playerEffectOn, setplayerEffectOn] = useState(false);

    const selectedCard = player[0];
    const length = player.length;

    const playerAudioElement = useRef(null)

    const handleClick = (e) => {
        setClicked(true)
        handleCardFlip()
        setTimeout(()=>(compareAttribute(e.target.id)),6000)
    };

    useEffect (()=>{
        playerAudioElement.current.volume="0.4"
        playerAudioElement ? playerAudioElement.current.play() : playerAudioElement.current.pause()
        
    },[playerEffectOn]);

    const togglePlayDinoPlayer = () => {
        setplayerEffectOn(!playerEffectOn)
    }

    return (
        <>
            {length > 0 ?
                <div className="card-border">
                    <div className="card-front">
                        <div className="card-image">
                            <img src={require("../Images/" + selectedCard.image)} alt=""
                                height="200" width="380" style={{ objectFit: "contain" }} />
                        </div>
                        <p className="dino-name">
                            {selectedCard.name}{selectedCard.diet == "Herbivore" ? " 🥬" : " 🥩"}
                        </p>
                        <p className="dino-info" align="center">{selectedCard.description}</p>
                        {clicked?
                        <p className="dino-weight" id="weight" >Weight:  {selectedCard.weight.toLocaleString()} lbs</p>
                        :
                        <p className="dino-weight player-selection" id="weight" onClick={handleClick}>Weight:  {selectedCard.weight.toLocaleString()} lbs</p>
                        }
                        {clicked?
                        <p className="dino-height" id="height" >Height:  {selectedCard.height} ft</p>
                        :
                        <p className="dino-height player-selection" id="height" onClick={handleClick}>Height:  {selectedCard.height} ft</p>
                        }
                        {clicked?
                        <p className="dino-length" id="length" >Length:  {selectedCard.length} ft</p>
                        :
                        <p className="dino-length player-selection" id="length" onClick={handleClick}>Length:  {selectedCard.length} ft</p>
                        }
                        {clicked?
                        <p className="dino-age" id="age" >Age:  {selectedCard.age} million years</p>
                        :
                        <p className="dino-age player-selection" id="age" onClick={handleClick}>Age:  {selectedCard.age} million years</p>
                        }
                        {clicked?
                        <p className="dino-intelligence" id="intelligence" >Intelligence:  {selectedCard.intelligence}</p>
                        :
                        <p className="dino-intelligence player-selection" id="intelligence" onClick={handleClick}>Intelligence:  {selectedCard.intelligence}</p>
                        }
                        {clicked?
                        <p className="dino-danger" id="danger_rating" >Danger rating:  {selectedCard.danger_rating}</p>
                        :
                        <p className="dino-danger player-selection" id="danger_rating" onClick={handleClick}>Danger rating:  {selectedCard.danger_rating}</p>
                        }

                        <div className="playersoundbutton">
                            <button
                            onClick={togglePlayDinoPlayer}>
                                 🦖
                                <audio src={require("../Audio/" + selectedCard.sound)} ref={playerAudioElement}></audio>
                            </button>
                        </div>

                    </div>

                </div>
                :
                <>
                    null
                </>
            }
        </>
    );
};

export default PlayerCard;
