class GameObject {
    constructor(mesh, geometry, material) {
        this.mesh = mesh;
        this.geometry = geometry;
        this.material = material;
    }

    dispose() {
        this.mesh.dispose();
        this.geometry.dispose();
        this.material.dispose();
    }
}