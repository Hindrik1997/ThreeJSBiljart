let GAME, COLLISIONCONTROLLER, TESTCUBE, TESTSPHERE, controls, skyBox;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    COLLISIONCONTROLLER = new CollisionController();
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

    // Create box and ball for collision testing
    TESTCUBE = new CubeObject(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({color: "green"}));
    TESTSPHERE = new SphereObject(new THREE.SphereGeometry(0.1, 10, 10), new THREE.MeshPhongMaterial({color: "pink"}));
    GAME.scene.add(TESTCUBE.mesh);
    GAME.scene.add(TESTSPHERE.mesh);

    pt = new PoolTable(5,8,GAME);


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