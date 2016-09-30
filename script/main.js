let GAME, PHYSICSNUMBERS;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    GAME.createObjects();
    PHYSICSNUMBERS = new PhysicsNumbers();
    $(window).resize(function () {
        resizeWindow(GAME);
    });

    // Start the render loop
    GAME.render(GAME);
}

function getRandomColor() {
    return Math.floor(Math.random() * 0xffffff);
}

function resizeWindow(gameObject) {
    let body = $("body");
    let h = body.height();
    let w = body.width();

    gameObject.renderer.setSize(w, h);
    gameObject.camera.aspect = (w / h);
    gameObject.camera.updateProjectionMatrix();
}