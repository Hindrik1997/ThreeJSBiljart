let GAME;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    $(window).resize(function(){resizeWindow(GAME);});

    initSkybox(GAME, "Positive X.jpg", "Negative X.jpg", "Positive Y.jpg", "Negative Y.jpg", "Positive Z.jpg", "Negative Z.jpg");


    GAME.render(GAME);
    new Sun();
}

function getRandomColor()
{
    return Math.floor(Math.random() * 0xffffff);
}


