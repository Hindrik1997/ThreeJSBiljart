let GAME, PHYSICSNUMBERS;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    GAME.createObjects();
    PHYSICSNUMBERS = new PhysicsNumbers();
    $(window).resize(function () {
        resizeWindow();
    });

    // Start the render loop
    GAME.render();
}

function getRandomColor() {
    return Math.floor(Math.random() * 0xffffff);
}

function resizeWindow() {
    let body = $("body");
    let h = body.height();
    let w = body.width();

    GAME.renderer.setSize(w, h);
    GAME.camera.aspect = (w / h);
    GAME.camera.updateProjectionMatrix();

    GAME.cuecam.aspect = (w / h);
    GAME.cuecam.updateProjectionMatrix();
}