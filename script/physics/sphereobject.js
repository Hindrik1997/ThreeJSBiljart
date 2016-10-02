class SphereObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        super(geometry, material, isMovable);
        this.normalAH = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0, 4, 0), 1, 0xffff00);
        GAME.scene.add(this.normalAH);
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
            // TODO: move this calculation to a location separate from the cube and sphere objects
            otherObject.isCollidingWith(this);
        }
        else throw Error("Other object is invalid.");
    }
}