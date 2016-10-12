class PlayerManager {
    constructor(playername1, playername2) {
        this.currentlyPlaying = false;
        this.players = [];

        this.playerNewTurn = false;
        this.players.push(new Player(playername1));
        this.players.push(new Player(playername2));
        this.currentPlayer = this.players[0];
    }

    doTurn() {
        this.currentlyPlaying = true;
        GAME.cue.play();
    }

    endTurn() {
        this.currentlyPlaying = false;
        if(!this.playerNewTurn)
            this.swapPlayers();
    }

    swapPlayers() {
        if (this.currentPlayer == null)
            return;

        if (this.currentPlayer == this.players[0]) {
            this.currentPlayer = this.players[1];
        }
        else {
            this.currentPlayer = this.players[0];
        }
    }


    win() {
        this.swapPlayers();

        alert("You won the game!" + this.currentPlayer.name + " has lost the game!");
        this.swapPlayers();
    }

    lose() {
        this.swapPlayers();
        alert(this.currentPlayer.name + " has won the game! You lost!");
        this.swapPlayers();
    }

}