class SphereObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        let mesh = new THREE.Mesh(geometry, material);
        geometry.computeBoundingSphere();
        super(mesh, geometry, material, isMovable);
    }


    isCollidingWith(otherObject) {
        this.mesh.geometry.computeBoundingSphere();
        return super.isCollidingWith(otherObject);
    }
}