class GameObject {
    constructor(mesh, geometry, material) {
        this.mesh = mesh;
    }

    dispose() {
        this.mesh.dispose();
    }
}