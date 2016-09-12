class Game {
    constructor() {
        // Setup Three.js base
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;

        $("body").css("background-color", "#" + getRandomColor().toString(16));
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        $("body").append(this.renderer.domElement);


        // Frames between balls moving
        this.framesTillReset = 120;

        // Initialize update array
        this.updateList = [];
    }

    render(that) {
        if (--that.framesTillReset <= 0) {
            that.scene.remove(BALLS);
            addBalls(4);
            that.framesTillReset = 120;
        }

        that.updateList.forEach(function(element){
            element.function(element.that);
        });

        requestAnimationFrame(function () {
            that.render(that)
        });
        that.renderer.render(that.scene, that.camera);
    }

    // Registers a function and the object it belongs to, this makes it run every frame
    registerForUpdates(func, that)
    {
        this.updateList.push({function: func, that: that});
    }
}