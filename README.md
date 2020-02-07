# Party Music Pandemoneum!

This client-side React app challenges you to play all your records at a party without replaying a single one. Click on a record to play it but be careful -- the records get shuffled around each time so be sure to remember which ones you've already played!

*[Click here to play the game!](https://amandalatkins.github.io/party-music-game/)*

![Screen Shot](public/assets/screenshot.png)

## Technologies Used
* [ReactJS](https://reactjs.org/)
    * Setup using [Create React App](https://create-react-app.dev/)
* [NodeJS](https://nodejs.org)
* [Bootstrap](https://getbootstrap.com)
* [NPM Packages](https://npmjs.com):
    * [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
    * [shuffle-array](https://www.npmjs.com/package/shuffle-array)

## Code Snippets

This snippet shows the `render()` function for the game:

```html
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
            <ScoreBar 
                score={this.state.score} 
                currentMessage={this.state.currentMessage} 
                gameActive={this.state.gameActive}
            />
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
```

This snippet shows function that handles a click on any album:

```JSX
setScore = (id, isClicked, message) => {
    if (!isClicked) {
        var updateAlbums = this.state.albums;
        var updateIndex = updateAlbums.findIndex(album => album.id === id);
        updateAlbums[updateIndex].isClicked = true;
        
        if (parseInt(this.state.score)+1 === 16) {
            this.winGame();
        } else {
            this.setState({ 
                score: parseInt(this.state.score)+1, 
                currentMessage: message, 
                albums: shuffle(updateAlbums), 
                gameActive: true, 
                winGame: false
            });
        }        
    } else {
        this.endGame();
    }
}
```

## Acknowledgements

Thanks to:
* [favicon.cc](https://favicon.cc) for the music note favicon. 
* [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) for the starter code to use their effects.
* [Unsplash](https://unsplash.com/photos/XAqTc-LLm6A) for the use of the header photo, taken by [Dan Deaner](https://unsplash.com/@danedeaner).
* [Node Spotify API](https://www.npmjs.com/package/node-spotify-api) for easily letting me loop through a list of artists and randomly pull albums from each to create `albums.json` for powering this game. (That code is not included in this repo but available upon request.)