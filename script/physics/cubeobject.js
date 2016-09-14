class CubeObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        let mesh = new THREE.Mesh(geometry, material);
        geometry.computeBoundingBox();
        super(mesh, geometry, material, isMovable);
    }
}