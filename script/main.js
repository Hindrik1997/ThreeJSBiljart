let GAME, controls, skyBox;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    $(window).resize(function () {
        resizeWindow(GAME);
    });

    //skyBox = new SkyBox(GAME, "posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg","negz.jpg");
    skyBox = new SkyBox(GAME, "Positive X.jpg", "Negative X.jpg", "Positive Y.jpg", "Negative Y.jpg", "Positive Z.jpg", "Negative Z.jpg");

    let axes = new THREE.AxisHelper(10);
    GAME.scene.add(axes);

    GAME.render(GAME);

    new Sun();

    controls = new THREE.OrbitControls(GAME.camera, GAME.renderer.domElement);
    GAME.registerForUpdates(function(controls){
        controls.update();
    }, controls);

    skyBox.registerForUpdate();

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