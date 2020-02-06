import React from "react";

function Album(props) {
    return (
        <img 
            className="album"
            // className={props.isClicked ? "clicked album" : "album"}
            src={props.cover}
            onClick={() => props.setScore(props.id, props.isClicked, props.artist+"! Good choice.")}
            alt={`Album by ${props.artist}`}
        />
    );
}

export default Album;