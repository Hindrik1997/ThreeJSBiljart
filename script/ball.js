class Ball extends THREE.Mesh {
    constructor(size, color) {
        let geometry = new THREE.SphereGeometry(size, 32, 32),
            material = new THREE.MeshPhongMaterial({color: color});
        super(geometry, material);

        GAME.registerForUpdates(this.update, this);
    }

    update(that) {
        // Proof of update functionality, code in the registered function runs every frame
    }

    randomizePos() {
        this.position.x += this.calcPosOffset();
        this.position.y += this.calcPosOffset();
        this.position.z += this.calcPosOffset();
    }

    calcPosOffset() {
        return Math.random() * 10 - 5;
    }
}