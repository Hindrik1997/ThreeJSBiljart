let GAME, COLLISIONCONTROLLER, TESTCUBE, TESTCUBE2, TESTSPHERE, controls, skyBox;

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
    TESTCUBE = new CubeObject(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({color: "green"}), true);
    TESTCUBE2 = new CubeObject(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshPhongMaterial({color: "yellow"}), true);
    TESTSPHERE = new SphereObject(new THREE.SphereGeometry(0.1, 10, 10), new THREE.MeshPhongMaterial({color: "pink"}), true);
    TESTSPHERE.mesh.translateX(0.7);
    GAME.scene.add(TESTCUBE.mesh);
    GAME.scene.add(TESTCUBE2.mesh);
    GAME.scene.add(TESTSPHERE.mesh);



    let tcl = new THREE.TextureLoader();

    let grassTex = tcl.load("imgs/grass.jpg");

    grassTex.wrapT = grassTex.wrapS =  THREE.RepeatWrapping;
    grassTex.repeat.set(50,50);

    let planeGeom = new THREE.PlaneGeometry(1000,1000);
    planeGeom.rotateX(-Math.PI / 2);
    let planeMat = new THREE.MeshLambertMaterial({
        map : grassTex
    });
    let grassObj = new THREE.Mesh(planeGeom, planeMat);
    GAME.scene.add(grassObj);
    let pt = new PoolTable(5,8,GAME);


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