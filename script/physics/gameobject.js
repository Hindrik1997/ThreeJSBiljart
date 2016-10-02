class GameObject {
    constructor(geometry, material) {
        this.mesh = new THREE.Mesh(geometry, material);
    }

    dispose() {
        this.mesh.dispose();
    }
}