class CubeObject extends PhysicsObject {
    constructor(geometry, material, isMovable) {
        super(geometry, material, isMovable);
        this.boundingBoxHelper = new THREE.BoundingBoxHelper(this.mesh, 0x00ff00);
        this.boundingBoxHelper.update();
        if (isMovable) GAME.registerForUpdates(this.updateBoundingBox, this);
        // GAME.scene.add(this.boundingBoxHelper);
    }

    get maxMovementPerFrame() {
        let parameters = this.mesh.geometry.parameters;
        return super.maxMovementPerFrame * Math.min(parameters.width, parameters.depth, parameters.height)
    }


    get distanceToGround() {
        return this.mesh.geometry.parameters.height / 2;
    }

    isCollidingWith(otherObject) {
        if (otherObject instanceof SphereObject) {
            let dist = this.boundingBoxHelper.box.distanceToPoint(otherObject.mesh.position);
            let radius = otherObject.mesh.geometry.boundingSphere.radius;
            return dist < radius;
        }
    }

    //noinspection JSMethodCanBeStatic
    updateBoundingBox(that) {
        that.boundingBoxHelper.update();
    }

    translate(x, y, z) {
        this.mesh.translateX(x);
        this.mesh.translateY(y);
        this.mesh.translateZ(z);
        this.boundingBoxHelper.update();
    }
}