import React from "react";

function WinModal(props) {
    return (
        <div className="winOverlay">
            <div className="winModal text-center p-5">
                <h3>Congratulations! You just threw the party of the year!</h3>
                <br/>
                <button className="btn-success btn" onClick={props.closeWinGame}>Throw Another Party!</button>
            </div>
        </div>
    );
}

export default WinModal;