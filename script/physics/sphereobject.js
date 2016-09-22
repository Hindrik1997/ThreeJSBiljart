class SphereObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        let mesh = new THREE.Mesh(geometry, material);
        super(mesh, isMovable);
    }

    get maxMovementPerFrame() {
<<<<<<< HEAD
        return this.mesh.geometry.boundingSphere.radius;
=======
        return super.maxMovementPerFrame * this.mesh.geometry.boundingSphere.radius;
>>>>>>> 25d9e0265193f1aacbe0d4ea1fdc99127f4a6a4b
    }

    get distanceToGround() {
        return this.mesh.geometry.boundingSphere.radius;
    }

    isCollidingWith(otherObject) {
        if (otherObject instanceof SphereObject) {
            // collision if distance between the center points of both spheres is less than the combined radius
            let distance = this.mesh.position.distanceTo(otherObject.mesh.position);
            if (distance > this.mesh.geometry.boundingSphere.radius + otherObject.mesh.geometry.boundingSphere.radius) return false;
            return this.mesh.position.sub(otherObject.mesh.position).normalize();
        }
        else if (otherObject instanceof CubeObject) {
            // TODO: move this calculation to a location separate from the cube and sphere objects
            otherObject.isCollidingWith(this);
        }
        else throw Error("Other object is invalid.");
    }
}