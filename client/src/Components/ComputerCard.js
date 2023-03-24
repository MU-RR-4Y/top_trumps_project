import React from "react";
import "./Cards.css";

const ComputerCard = ({ cpu }) => {
    const mapArray = cpu.map((item) => { return item });

    console.log(mapArray);

    return (
        <>
            <div className="card-border">
                <div className="card-front">
                    <div className="card-image">
                        <img src={require("../images/" + mapArray[0].image)} alt=""
                            height="175" width="225" style={{ objectFit: "contain" }} />
                    </div>
                    <p className="dino-name">
                        {mapArray[0].name}{mapArray[0].diet == "Herbivore" ? " 🥬" : " 🥩"}
                    </p>
                    <p className="dino-info">{mapArray[0].description}</p>
                    <div className="dino-stats">
                        <p className="dino-weight">Weight:  {mapArray[0].weight} lbs</p>
                        <p className="dino-age">Age:  {mapArray[0].age} million years</p>
                        <p className="dino-danger">Danger rating:  {mapArray[0].danger_rating}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComputerCard;