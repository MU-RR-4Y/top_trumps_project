import React from "react";
import "./Cards.css";

const ComputerCard = ({ cpu }) => {
    const mapArray = cpu.map((item) => { return item });

    return (
        <>
            <div className="card-border">
                <div className="card-front">
                    <div className="card-image">
                        <img src={require("../images/" + mapArray[0].image)} alt=""
                            height="200" width="325" style={{ objectFit: "contain" }} />
                    </div>
                    <p className="dino-name">
                        {mapArray[0].name}{mapArray[0].diet == "Herbivore" ? " 🥬" : " 🥩"}
                    </p>
                    <div className="dino-info">
                        <p>{mapArray[0].description}</p>
                    </div>
                    <div className="dino-stats">
                        <p className="dino-weight">Weight:  {mapArray[0].weight.toLocaleString()} lbs</p>
                        <p className="dino-height">Height:  {mapArray[0].height} ft</p>
                        <p className="dino-length">Length:  {mapArray[0].length} ft</p>
                        <p className="dino-age">Age:  {mapArray[0].age} million years</p>
                        <p className="dino-intelligence">Intelligence:  {mapArray[0].intelligence}/10</p>
                        <p className="dino-danger">Danger rating:  {mapArray[0].danger_rating}/10</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComputerCard;