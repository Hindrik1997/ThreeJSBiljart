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

        // Setup frametime clock
        this.clock = new THREE.Clock(true);
        this.frameTime = 0;
        this.registerForUpdates(this.updateFrametime, this);

    }

    //noinspection JSMethodCanBeStatic
    updateFrametime(that) {
        that.frameTime = that.clock.getDelta();
    }

    render(that) {
        COLLISIONCONTROLLER.checkCollisions();
        that.updateList.forEach(function (element) {
            element.function(element.that);
        });

        requestAnimationFrame(function () {
            that.render(that)
        });
        that.renderer.render(that.scene, that.camera);
    }

    // Registers a function and the object it belongs to, this makes it run every frame
    registerForUpdates(func, that) {
        this.updateList.push({function: func, that: that});
    }
}