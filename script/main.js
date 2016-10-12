let GAME, PHYSICSNUMBERS;

$(document).ready(function () {
    initThree();
});

function initThree() {
    let player1name = prompt("Enter player one name.");
    let player2name = prompt("Enter player two name.");
    GAME = new Game(player1name, player2name);
    GAME.createObjects();
    PHYSICSNUMBERS = new PhysicsNumbers();
    $(window).resize(function () {
        resizeWindow();
    });

    // Start the render loop
    GAME.render();
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