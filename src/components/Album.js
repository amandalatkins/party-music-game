import React from "react";

function Album(props) {
    return (
        <div className="album" style={{backgroundImage: `url(${props.cover})`}}
            onClick={() => props.setScore(props.id, props.isClicked, props.artist+"! Good choice.")}
        ></div>
    );
}

export default Album;