let GAME;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    $(window).resize(function(){resizeWindow(GAME);});

    GAME.render(GAME);
    new Sun();
}

function getRandomColor()
{
    return Math.floor(Math.random() * 0xffffff);
}