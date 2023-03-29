import React from "react";
import "./Cards.css";
import ReactAudioPlayer from "react-audio-player";

const ComputerCard = ({ cpu, flipActive }) => {
    const mapArray = cpu.map((item) => { return item });

    return (
        <>
        <div className="flip-card">
                <div className= {`flip-card-inner ${flipActive? 'is-flipped' : null }`}>
                    <div className={'flip-card-front'}>
                           <img src={require('../Images/_Logo.jpg')} height="680" width="400" className="styled-flip" alt="" style={{ objectFit: "contain" }}/>
                    </div>
                        <div className="flip-card-back">
                            <div className="card-border">
                                <div className="card-front">
                                    <div className="card-image">
                                        <img src={require("../Images/" + mapArray[0].image)} alt=""
                                            height="200" width="380" style={{ objectFit: "contain" }} />
                                    </div>
                                    <p className="dino-name">
                                        {mapArray[0].name}{mapArray[0].diet == "Herbivore" ? " 🥬" : " 🥩"}
                                    </p>
                                    <div className="dino-info" align="center">
                                        <p>{mapArray[0].description}</p>
                                    </div>
                                    <div className="dino-stats">
                                        <p className="dino-weight">Weight:  {mapArray[0].weight.toLocaleString()} lbs</p>
                                        <p className="dino-height">Height:  {mapArray[0].height} ft</p>
                                        <p className="dino-length">Length:  {mapArray[0].length} ft</p>
                                        <p className="dino-age">Age:  {mapArray[0].age} million years</p>
                                        <p className="dino-intelligence">Intelligence:  {mapArray[0].intelligence}</p>
                                        <p className="dino-danger">Danger rating:  {mapArray[0].danger_rating}</p>
                                        <div className="playerAudio">
                                        <ReactAudioPlayer src={require("../Audio/" + mapArray[0].sound)} controls volume={0.4} controlsList="nodownload noplaybackrate" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
      
        </>
    );
};

export default ComputerCard;