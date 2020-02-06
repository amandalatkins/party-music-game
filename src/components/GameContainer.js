import React from "react";
import PlayBoard from "./PlayBoard";
import ScoreBar from "./ScoreBar";
import Album from "./Album";
import allAlbums from "../config/albums.json";
import shuffle from "shuffle-array";

class GameContainer extends React.Component {
    state = {
        score: 0,
        highScore: 0,
        albums: []
    }

    componentDidMount() {
        this.randomizeAlbums();
    }

    getAlbums = () => {
        // Pick 16 random albums from album.js to setup our game
        // For now, we'll just get 16 album covers
        var randAlbums = [];
        for (var i = 0; i < 16; i++) {
            randAlbums.push({
                id: i,
                cover: artists[i].albums[i]
            });
        }
        this.setState({ albums: randAlbums });
    }

    randomizeAlbums = () => {
        // Scramble the albums
        this.setState({ albums: shuffle(this.albums) });
    }

    setHighScore = () => {
        if (this.score > this.highScore) {
            this.setState({ highScore: this.score });
        }
    }

    setScore = (isCorrect) => {
        if (isCorrect) {
            this.setState({ score: this.score+1 });
        } else {
            this.setState({ score: 0 });
        }
    }

}

export default GameContainer;