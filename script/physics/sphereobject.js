class SphereObject extends PhysicsObject {
    constructor(mesh, geometry, material, isMovable) {
        super(mesh, geometry, material, isMovable, geometry.getBoundingSphere());
    }
}