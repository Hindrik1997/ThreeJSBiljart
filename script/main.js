let GAME, COLLISIONCONTROLLER, PHYSICSNUMBERS, TESTSPHERE, POOLTABLE, CONTROLS, SKYBOX, CUE;

$(document).ready(function () {
    initThree();
});

function initThree() {
    GAME = new Game();
    PHYSICSNUMBERS = new PhysicsNumbers();
    COLLISIONCONTROLLER = new CollisionController();
    $(window).resize(function () {
        resizeWindow(GAME);
    });

    SKYBOX = new SkyBox("Positive X.jpg", "Negative X.jpg", "Positive Y.jpg", "Negative Y.jpg", "Positive Z.jpg", "Negative Z.jpg");

    // let axes = new THREE.AxisHelper(10);
    // GAME.scene.add(axes);

    GAME.render(GAME);

    new Sun();

    CONTROLS = new THREE.OrbitControls(GAME.camera, document, GAME.renderer.domElement);
    GAME.registerForUpdates(function(controls){
        controls.update();
    }, CONTROLS);

    var AmbientLight = new THREE.AmbientLight(0x404040);
    GAME.scene.add(AmbientLight);

    SKYBOX.registerForUpdate();



    let tcl = new THREE.TextureLoader();

    let grassTex = tcl.load("imgs/grass.jpg");

    grassTex.wrapT = grassTex.wrapS =  THREE.RepeatWrapping;
    grassTex.repeat.set(50,50);

    let planeGeom = new THREE.PlaneGeometry(1000,1000);
    planeGeom.rotateX(-Math.PI / 2);
    let planeMat = new THREE.MeshPhysicalMaterial({
        reflectivity : 0,
        roughness : 0.70,
        map : grassTex
    });
    let grassObj = new THREE.Mesh(planeGeom, planeMat);
    GAME.scene.add(grassObj);
    POOLTABLE = new PoolTable(5,8);

    TESTSPHERE = new SphereObject(new THREE.SphereGeometry(0.1, 10, 10), new THREE.MeshPhongMaterial({color: "pink"}), true);
    TESTSPHERE.mesh.translateY(POOLTABLE.basePlate.mesh.position.y + POOLTABLE.basePlate.mesh.geometry.parameters.height / 2 + TESTSPHERE.distanceToGround);
    TESTSPHERE.movement.x = (Math.random() * 4) - 2;
    TESTSPHERE.movement.z = (Math.random() * 4) - 2;
    TESTSPHERE.movement.setLength(8);
    GAME.scene.add(TESTSPHERE.mesh);

    CUE = new Cue();
    GAME.scene.add(CUE.group);


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