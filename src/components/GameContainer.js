import React from "react";
import ScoreBar from "./ScoreBar";
import Album from "./Album";
import allAlbums from "../config/albums.json";
import shuffle from "shuffle-array";
import WinModal from "./WinModal";
import confetti from "canvas-confetti";

class GameContainer extends React.Component {
    state = {
        score: 0,
        highScore: 0,
        albums: [],
        gameActive: true,
        currentMessage: "Click a record to start the party!",
        winGame: false,
        confettiInterval: ""
    }

    componentDidMount() {
        this.getAlbums();
    }

    getAlbums = () => {
        // Pick 16 random albums from albums.json to setup our game
        var randAlbums = [];
        var chosen = [];
        for (var i = 0; i < 16; i++) {

            var randNum = () => Math.floor(Math.random() * allAlbums.length);
            var rand = randNum();

            while(chosen.indexOf(allAlbums[rand].artist) > -1) {
                rand = randNum();
            }

            chosen.push(allAlbums[rand].artist);

            var randIndex = Math.floor(Math.random() * allAlbums[rand].albums.length);

            randAlbums.push({
                id: i,
                artist: allAlbums[rand].artist,
                cover: allAlbums[rand].albums[randIndex]
            });
        }
        this.setState({ albums: randAlbums });
    }

    endGame = () => {
        var reset = {
            score: 0,
            gameActive: false,
            currentMessage: "You already played that. Buzz kill."
        };

        if (this.state.score > this.state.highScore) {
            reset.highScore = this.state.score;
        }
        this.setState(reset);
        this.getAlbums();
    }

    startConfetti = () => {
        var end = Date.now() + (15 * 1000);

        var interval = setInterval(function() {
            if (Date.now() > end) {
                return clearInterval(interval);
            }

            confetti({
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                shapes: ['square'],
                origin: {
                    x: Math.random(),
                    y: Math.random() - 0.2
                }
            });
        }, 200);

        this.setState({ confettiInterval: interval });
    }

    winGame = () => {

        var reset = {
            score: 0,
            gameActive: true,
            currentMessage: "Killer party! Throw another one!",
            winGame: true
        };
        if (this.state.score+1 > this.state.highScore) {
            reset.highScore = this.state.score+1;
        }
        this.setState(reset);
        this.startConfetti();
    }

    closeWinGame = () => {
        clearInterval(this.state.confettiInterval);
        this.getAlbums();
        this.setState({ winGame: false, confettiInterval: "" });
    }

    setScore = (id, isClicked, message) => {
        console.log("setting score");
        if (!isClicked) {
            var updateAlbums = this.state.albums;
            var updateIndex = updateAlbums.findIndex(album => album.id === id);
            updateAlbums[updateIndex].isClicked = true;
            
            if (parseInt(this.state.score)+1 === 16) {
                this.winGame();
            } else {
                this.setState({ score: parseInt(this.state.score)+1, currentMessage: message, albums: shuffle(updateAlbums), gameActive: true, winGame: false});
            }        
        } else {
            this.endGame();
        }
    }

    render() {
            return (
                <div>
                    {this.state.winGame ? <WinModal closeHandler={this.closeWinGame} /> : ""}
                    <div className="jumbotron">
                        <div className="container">
                            <h1 className="display-4">Party Music Pandemoneum!</h1>
                            <p className="lead">You're hosting a party and spinning your favorite records! Click on an album to play it, but be careful to only play it once during the party lest you kill the mood!</p>
                            <br/>
                            <p><strong>Highest Music Rating: </strong>{this.state.highScore}</p>
                        </div>
                    </div>
                    <ScoreBar score={this.state.score} currentMessage={this.state.currentMessage} gameActive={this.state.gameActive}/>
                    <div className="container game">
                        <div className="row">
                            {this.state.albums.map(album => (
                                <div className="col-3 mb-4" key={album.id}>
                                    <Album 
                                        cover={album.cover}
                                        artist={album.artist}
                                        id={album.id}
                                        isClicked={album.isClicked}
                                        setScore={this.setScore}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <br/><br/><br/>
                </div>
            );
    }

}

export default GameContainer;