import React from "react";

function ScoreBar(props) {
    return (
        <div className="container game">
            <div className="row">
                <div className="col-7">
                    <p className={props.gameActive ? "gameMessage bg-success" : "gameMessage bg-danger"}>
                        {props.currentMessage}
                    </p>
                </div>
                <div className="col-5 text-right">
                    <p className="gameScore">
                        <strong>Music Rating: {props.score}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ScoreBar;