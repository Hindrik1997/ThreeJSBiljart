let GAME;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    $(window).resize(function () {
        resizeWindow(GAME);
    });

<<<<<<< HEAD
    initSkybox(GAME, "Positive X.jpg", "Negative X.jpg", "Positive Y.jpg", "Negative Y.jpg", "Positive Z.jpg", "Negative Z.jpg");


    GAME.render(GAME);
=======
>>>>>>> 9f2e84634c071b1454277ea636f3541a244fb69e
    new Sun();



    GAME.render(GAME);
}

function getRandomColor() {
    return Math.floor(Math.random() * 0xffffff);
}

<<<<<<< HEAD

=======
function resizeWindow(gameObject) {
    let body = $("body");
    let h = body.height();
    let w = body.width();

    gameObject.renderer.setSize(w, h);
    gameObject.camera.aspect = (w / h);
    gameObject.camera.updateProjectionMatrix();
}
>>>>>>> 9f2e84634c071b1454277ea636f3541a244fb69e
