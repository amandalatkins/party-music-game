import React from "react";
// import PlayBoard from "./PlayBoard";
import ScoreBar from "./ScoreBar";
import Album from "./Album";
import allAlbums from "../config/albums.json";
import shuffle from "shuffle-array";

class GameContainer extends React.Component {
    state = {
        score: 0,
        highScore: 0,
        albums: [],
        gameActive: true,
        currentMessage: "Click a record to start the party!"
    }

    componentDidMount() {
        this.getAlbums();
    }

    getAlbums = (cb) => {
        // Pick 16 random albums from album.js to setup our game
        // For now, we'll just get 16 album covers
        var randAlbums = [];
        for (var i = 0; i < 16; i++) {
            randAlbums.push({
                id: i,
                artist: allAlbums[i].artist,
                cover: allAlbums[i].albums[0]
            });
        }
        this.setState({ albums: randAlbums });
    }

    // randomizeAlbums = (albums) => {
    //     // Scramble the albums
    //     return shuffle(albums);
    // }

    endGame = () => {
        var reset = {
            score: 0,
            gameActive: false,
            currentMessage: "You already played that. Buzz kill."
        };
        if (this.score > this.highScore) {
            reset.highScore = this.state.score;
        }
        this.setState(reset);
    }

    setScore = (id, isClicked, message) => {
        console.log("setting score");
        if (!isClicked) {
            var updateAlbums = this.state.albums;
            updateAlbums[id].isClicked = true;
            this.setState({ score: this.state.score+1, currentMessage: message, albums: shuffle(updateAlbums), gameActive: true});
        } else {
            this.endGame();
        }
    }

    render() {
            return (
                <div>
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

                </div>
            );
    }

}

export default GameContainer;