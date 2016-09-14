let GAME;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    GAME.render(GAME);
    new Sun();
}

function getRandomColor() {
    return Math.floor(Math.random() * 0xffffff);
}