class Game {
    constructor() {
        // Setup Three.js base
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 7;
        this.camera.position.y = 5;

        let body = $("body");
        body.css("background-color", "black");
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setSize(body.width(), body.height());
        body.append(this.renderer.domElement);

        // Initialize update array
        this.updateList = [];

        this.collisionController = new CollisionController();

        this.orbitControls = new THREE.OrbitControls(this.camera, document, this.renderer.domElement);
        this.registerForUpdates(function (controls) {
            controls.update();
        }, this.orbitControls);

        // Setup frametime clock
        this.clock = new THREE.Clock(true);
        this.frameTime = 0;
        this.registerForUpdates(this.updateFrametime, this);

        window.addEventListener('keydown', function (data) {
            if(data.keyCode == 70)
            {
                    let m = GAME.useCueCam;
                    GAME.useCueCam = !m;
            }
        }, false);

    }

    //noinspection JSMethodCanBeStatic
    updateFrametime(that) {
        that.frameTime = that.clock.getDelta();
    }

    render() {
        this.collisionController.checkCollisions();
        TWEEN.update();
        GAME.updateList.forEach(function (element) {
            element.function(element.that);
        });

        requestAnimationFrame(function () {
            GAME.render()
        });
        if (GAME.useCueCam) GAME.renderer.render(GAME.scene, GAME.cuecam);
        else GAME.renderer.render(GAME.scene, GAME.camera);
    }

    // Registers a function and the object it belongs to, this makes it run every frame
    registerForUpdates(func, that) {
        this.updateList.push({function: func, that: that});
    }

    areAllBallsStationary() {
        for (let i = 0; i < this.balls.length; ++i) {
            if (this.balls[i].isMoving) return false;
        }
        return true;
    }

    createObjects() {
        this.poolTable = new PoolTable(5, 8);
        this.scene.add(this.poolTable.group);

        this.skyBox = new SkyBox("Positive X.jpg", "Negative X.jpg", "Positive Y.jpg", "Negative Y.jpg", "Positive Z.jpg", "Negative Z.jpg");
        this.scene.add(this.skyBox.mesh);

        // Light
        this.sun = new Sun();
        this.scene.add(this.sun);
        this.ambientLight = new THREE.AmbientLight(0x404040);
        GAME.scene.add(this.ambientLight);

        this.grass = this.createGrass();
        GAME.scene.add(this.grass);

        this.addPockets();

        this.addBalls();

        this.cue = new Cue();
        GAME.scene.add(this.cue.pivotPoint);
    }

    //noinspection JSMethodCanBeStatic
    createGrass() {
        let tcl = new THREE.TextureLoader();

        let grassTex = tcl.load("imgs/grass.jpg");

        grassTex.wrapT = grassTex.wrapS = THREE.RepeatWrapping;
        grassTex.repeat.set(50, 50);

        let planeGeom = new THREE.PlaneGeometry(1000, 1000);
        planeGeom.rotateX(-Math.PI / 2);
        let planeMat = new THREE.MeshPhysicalMaterial({
            reflectivity: 0,
            roughness: 0.70,
            map: grassTex
        });
        return new THREE.Mesh(planeGeom, planeMat);
    }

    addPockets() {
        this.pockets = [];

        let pocketLeftMiddle = new Pocket(2.5,0);
        let pocketRightMiddle = new Pocket(-2.5,0);

        let pocketLeftBottom = new Pocket(2.5,-4);
        let pocketRightBottom = new Pocket(-2.5,-4);

        let pocketLeftTop = new Pocket(2.5,4);
        let pocketRightTop = new Pocket(-2.5,4);



        this.scene.add(pocketLeftMiddle.mesh);
        this.scene.add(pocketLeftMiddle.blackHoleMesh);
        this.pockets.push(pocketLeftMiddle);

        this.scene.add(pocketRightMiddle.mesh);
        this.scene.add(pocketRightMiddle.blackHoleMesh);
        this.pockets.push(pocketRightMiddle);

        this.scene.add(pocketRightBottom.mesh);
        this.scene.add(pocketRightBottom.blackHoleMesh);
        this.pockets.push(pocketRightBottom);

        this.scene.add(pocketRightTop.mesh);
        this.scene.add(pocketRightTop.blackHoleMesh);
        this.pockets.push(pocketRightTop);

        this.scene.add(pocketLeftBottom.mesh);
        this.scene.add(pocketLeftBottom.blackHoleMesh);
        this.pockets.push(pocketLeftBottom);

        this.scene.add(pocketLeftTop.mesh);
        this.scene.add(pocketLeftTop.blackHoleMesh);
        this.pockets.push(pocketLeftTop);
    }

    addBalls() {
        this.balls = [];

        this.whiteBall = new BallObject(0, new THREE.SphereGeometry(0.1, 30, 30), new THREE.MeshPhysicalMaterial({
            color: "white",
            metalness: 0.05
        }), true);

        for(let i = 1; i < 16; ++i)
        {
            if(i == 8)
                continue;

            let ball = new BallObject(i, new THREE.SphereGeometry(0.1, 30  , 30), new THREE.MeshPhysicalMaterial({
                color: Math.random() * 0xffffff,
                metalness: 0.05
            }), true);

            ball.mesh.translateY(this.poolTable.plateY + ball.distanceToGround);
            ball.mesh.translateZ(Math.random() * 2.5);
            ball.mesh.translateZ(Math.random() * -5);
            ball.mesh.translateX(Math.random() * -3);

            this.scene.add(ball.mesh);
            this.scene.add(ball);
            this.balls.push(ball);
        }

        this.whiteBall.mesh.translateY(this.poolTable.plateY + this.whiteBall.distanceToGround);
        this.scene.add(this.whiteBall.mesh);
        this.balls.push(this.whiteBall);

        let blackBall = new BallObject(8, new THREE.SphereGeometry(0.1, 30, 30), new THREE.MeshPhysicalMaterial({
            color: "black",
            metalness: 0.05
        }), true);
        blackBall.mesh.translateY(this.poolTable.plateY + blackBall.distanceToGround);
        blackBall.mesh.translateZ(2);
        blackBall.mesh.translateX(0.05);
        this.scene.add(blackBall.mesh);
        this.balls.push(blackBall);
    }
}
