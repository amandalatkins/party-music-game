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
        currentMessage: "Click a record to start the party!"
    }

    componentDidMount() {
        this.getAlbums();
    }

    getAlbums = (cb) => {
        // Pick 16 random albums from album.js to setup our game
        // For now, we'll just get 16 album covers
        var randAlbums = [];
        console.log(allAlbums);
        for (var i = 0; i < 16; i++) {
            randAlbums.push({
                id: i,
                cover: allAlbums[i].albums[0]
            });
        }
        this.setState({ albums: randAlbums });
    }

    randomizeAlbums = () => {
        // Scramble the albums
        return shuffle(this.albums);
    }

    endGame = () => {
        var reset = {
            score: 0,
            currentMessage: "You already played that. Buzz kill."
        };
        if (this.score > this.highScore) {
            reset.highScore = this.score;
        }
        this.setState(reset);
    }

    setScore = (id, isClicked) => {
        if (!isClicked) {
            var updateAlbums = this.albums[id].isClicked = true;
            this.setState({ score: this.score+1, currentMessage: "Righteous! Good choice.", albums: this.randomizeAlbums(updateAlbums)});
        } else {
            this.endGame();
        }
    }

    render() {
            return (
                <div>
                    <ScoreBar score={this.score} highScore={this.highScore} currentMessage={this.currentMessage}/>
                    <div className="jumbotron">
                        <h1 className="display-4">Party Music Pandemoneum!</h1>
                        <p className="lead">You're hosting a party and spinning your favorite records! Click on an album to play it, but be careful to only play it once during the party lest you kill the mood!</p>
                    </div>
                    <div className="container">
                        <div className="row">
                            {this.albums ? this.albums.map(album => (
                                <div className="col-4 mb-3">
                                    <Album 
                                        cover={album.cover} 
                                        id={album.id}
                                        key={album.id} 
                                        isClicked={album.isClicked}
                                    />
                                </div>
                            )) : ""}
                        </div>
                    </div>

                </div>
            );
    }

}

export default GameContainer;