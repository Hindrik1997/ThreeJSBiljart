class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;

        $("body").css("background-color", "#" + getRandomColor().toString(16));
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        $("body").append(this.renderer.domElement);
        this.framesTillReset = 120;
    }

    render(that) {
        if (--that.framesTillReset <= 0) {
            that.scene.remove(BALLS);
            addBalls(4);
            that.framesTillReset = 120;
        }

        requestAnimationFrame(function () {
            that.render(that)
        });
        that.renderer.render(that.scene, that.camera);
    }
}