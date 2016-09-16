class SphereObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        let mesh = new THREE.Mesh(geometry, material);
        super(mesh, geometry, material, isMovable);
    }


    isCollidingWith(otherObject) {
        if (otherObject instanceof SphereObject) {
            // collision if distance between the center points of both spheres is less than the combined radius
            let distance = this.mesh.position.distanceTo(otherObject.mesh.position);
            if (distance > this.mesh.radius + otherObject.mesh.radius) return false;
            return this.mesh.position.sub(otherObject.mesh.position).normalize();
        }
        else if (otherObject instanceof CubeObject) {
            let p = otherObject.boundingBox.box.closestPointToPoint;
        }
        else throw Error("Other object is invalid.");
    }
}