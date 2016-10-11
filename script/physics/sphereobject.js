class SphereObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        super(geometry, material, isMovable);
    }

    get maxMovementPerFrame() {
        return super.maxMovementPerFrame * this.mesh.geometry.boundingSphere.radius;
    }

    get distanceToGround() {
        return this.mesh.geometry.boundingSphere.radius;
    }

    isCollidingWith(otherObject) {
        if (otherObject instanceof SphereObject) {
            // collision if distance between the center points of both spheres is less than the combined radius
            let distance = this.mesh.position.distanceTo(otherObject.mesh.position);
            return distance <= this.mesh.geometry.boundingSphere.radius + otherObject.mesh.geometry.boundingSphere.radius;

        }
        else if (otherObject instanceof CubeObject) {
            otherObject.isCollidingWith(this);
        }
        else throw Error("Other object is invalid.");
    }
}